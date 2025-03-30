import axios from 'axios';
import { getLikes } from './likes';
import { getWallpostCommentatorsUsers } from './comments';
import { dataType } from '../App';

const token: string| undefined = process.env.REACT_APP_token
const API_VERSION: string | undefined = process.env.REACT_APP_API_VERSION
// Коллбэки
const callbacks: Record<string, Function> = { getLikes, getWallpostCommentatorsUsers }

// Очередь стэка для запросов к API
type stackType = {
  func: (() => void)[],
  id: number,
  running: boolean,
  call: () => void,
  add: (func: () => void) => void,
  clear: () => void,
  onFinish: () => void,
  resolve?: (data: dataType[]) => void
}

export const stack: stackType = {
  func: [],
  id: -1,
  running: false,
  async call () {
    if (this.running) return
    this.running = true
    while (this.func.length > (this.id + 1)) {
      this.id ++
      await this.func[this.id]()
      await delay(200)
    }
    this.clear()
  },
  add(newFunc) {
    this.func.push(newFunc)
    if (!this.running) this.call()
  },
  clear () {
    this.func = []
    this.id = -1
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
// Прочее
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

window.addEventListener('unhandledrejection', e => {
  console.log(e)
  alert('Ошибка - подробности в консоли')
})