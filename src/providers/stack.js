import axios from 'axios';
import { getLikes } from './likes';
import { getWallpostCommentatorsUsers } from './comments';

const token = 'vk1.a.x4gCW04bymH4aRuKX2pLn9aXodxWmuShUDI-f-FuIjp_5Nd8wvNcD-sVlg8DmhBwfMKcvTnHquing55ZIQeuYMny8TjEjbzbid9y3kV83QhhIWhXXNk7gKS583Pq5yc2UEvyuk_SS8SFNG9Yg7ofjG8FkvVg-57svyLRF-TzLxScKBRtUnsvvzMI-1Roj-tYN3vO6IJ06KS9BKOGWXiCPA'
const API_VERSION = '5.199'
// Коллбэки
const callbacks = { getLikes, getWallpostCommentatorsUsers }

// Очередь стэка для запросов к API
export const stack = {
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
  onFinish () {}
}
// Вызов API VK
export const callVK = async (method, args, callbackName) => {
  const params = new URLSearchParams({v: API_VERSION, access_token: token, ...args}).toString()
  const url = `https://api.vk.com/method/${method}?${params}`
  try {
    const data = await axios.get(url)
    return callbackName ? await callbacks[callbackName]?.(data) : data
  } catch(error) {
    console.error('VK API error: ', error)
    throw error
  }
}
// Прочее
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

window.addEventListener('unhandledrejection', e => {
  console.log(e)
  alert('Ошибка - подробности в консоли')
})