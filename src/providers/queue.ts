import axios from 'axios';
import { getLikes } from './likes';
import { getWallpostCommentatorsUsers } from './comments';
import { dataType } from '../App';
import { delay } from './utils';

const token: string| undefined = process.env.REACT_APP_token
const API_VERSION: string | undefined = process.env.REACT_APP_API_VERSION
const callbacks: Record<string, Function> = { getLikes, getWallpostCommentatorsUsers }
const bufferLimit: number = 1000

// Очередь для запросов к API
type queueType = {
  func: Array<(() => void) | undefined>,
  running: boolean,
  call: () => void,
  add: (func: () => void) => void,
  clear: () => void,
  onFinish: () => void,
  resolve?: (data: dataType[]) => void,
  size: number,
  head: number,
  tail: number,
}

export const queue: queueType = {
  func: new Array(bufferLimit),
  running: false,
  size: 0,
  head: 0,
  tail: 0,
  async call () {
    if (this.running) return
    this.running = true
    while (this.size > 0) {
      await this.func[this.head]?.()
      this.func[this.head] = undefined
      this.size --
      this.head = (this.head + 1) % bufferLimit
      await delay(50)
    }
    this.clear()
  },
  add(newFunc) {
    if (this.size >= bufferLimit) {
      this.clear()
      this.size = 0
      this.head = 0
      this.tail = 0
      this.func = new Array(bufferLimit)
      throw new Error(`Переполнение очереди необработанных запросов. Текущий лимит: ${bufferLimit}`)
    }
    this.size ++
    this.func[this.tail] = newFunc
    this.tail = (this.tail + 1) % bufferLimit
    if (!this.running) this.call()
  },
  clear () {
    this.running = false
    this.onFinish()
    this.onFinish = () => {}
  },
  onFinish () {},
}
// Вызов API VK
export const callVK = async (method: string, args: any, callbackName?: string) => {
  const params = new URLSearchParams({v: API_VERSION, access_token: token, ...args}).toString()
  const url = `/method/${method}?${params}`
  try {
    const data = await axios.get(url)
    return callbackName ? await callbacks[callbackName]?.(data) : data
  } catch(error) {
    console.error('VK API error: ', error)
    throw error
  }
}
