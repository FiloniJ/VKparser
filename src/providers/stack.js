import axios from 'axios';
import { getLikes } from './likes';
import { getWallpostCommentatorsUsers } from './comments';

const token = 'vk1.a.x4gCW04bymH4aRuKX2pLn9aXodxWmuShUDI-f-FuIjp_5Nd8wvNcD-sVlg8DmhBwfMKcvTnHquing55ZIQeuYMny8TjEjbzbid9y3kV83QhhIWhXXNk7gKS583Pq5yc2UEvyuk_SS8SFNG9Yg7ofjG8FkvVg-57svyLRF-TzLxScKBRtUnsvvzMI-1Roj-tYN3vO6IJ06KS9BKOGWXiCPA'
// Коллбэки
const callbacks = { getLikes, getWallpostCommentatorsUsers }

// Очередь стэка для запросов к API
export const stack = {
  func: [],
  call: async () => {
    while (true) {
      if (stack.func.length > (stack.id + 1)) {
        stack.id += 1
        await stack.func[stack.id]()
      } else {
        stack.clear()
        break
      }
    }
  },
  add: newFunc => {
    stack.func.push(newFunc)
    if (stack.id === -1) {
      stack.call()
    }
  },
  clear: () => {
    stack.func = []
    stack.onFinish()
    stack.onFinish = () => {}
    stack.id = -1
  },
  onFinish: () => {},
  id: -1
}
// Вызов API VK
export const callVK = async (method, args, callbackName) => {
  let str = ''
  for (let key in args) {
    str += `&${key}=${args[key]}`
  }
  if (!callbackName) {
    return axios.get(`
      https://api.vk.com/method/${method}?v=5.199&access_token=${token}${str}
    `)
  }

  const data = await axios.get(`
    https://api.vk.com/method/${method}?v=5.199&access_token=${token}${str}
  `)
  const callbackData = await callbacks[callbackName](data)
  return callbackData
}