import axios from 'axios';

const token = 'vk1.a.x4gCW04bymH4aRuKX2pLn9aXodxWmuShUDI-f-FuIjp_5Nd8wvNcD-sVlg8DmhBwfMKcvTnHquing55ZIQeuYMny8TjEjbzbid9y3kV83QhhIWhXXNk7gKS583Pq5yc2UEvyuk_SS8SFNG9Yg7ofjG8FkvVg-57svyLRF-TzLxScKBRtUnsvvzMI-1Roj-tYN3vO6IJ06KS9BKOGWXiCPA'
const callbacks = {}

// Очередь стэка для запросов к API
export const stack = {
  data: [],
  use: () => {
    const id = stack.data.length
    if (id > 0) {
      stack.data[id - 1]()
      stack.data.pop()
    } else {
      clearInterval(stack.timer)
      stack.timer = false
      stack.onFinish()
      stack.onFinish = () => {}
    }
  },
  call: func => {
    stack.data.push(func)
    if (!stack.timer) {
      stack.use()
      stack.timer = setInterval(stack.use, stack.delay)
    }
  },
  onFinish: () => {},
  timer: false,
  delay: 500
}
// Вызов API VK
const callVK = async (method, args, callbackName) => {
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
  const likes = await callbacks[callbackName](data)
  return likes
}

// Сбор лайков под постами
const likes = {
  user: {},
  name: {},
}

likes.get = (id, groupID) => {
  callVK('likes.getList', {type: 'post', owner_id: groupID, item_id: id, extended: 1})
    .then(res => {
      const arr = res.data.response.items
      for (let key in arr) {
        let id = arr[key].id
        let data = likes.user[id]
        likes.user[id] = data ? data += 1 : data = 1
        likes.name[id] = {fname: arr[key].first_name, lname: arr[key].last_name}
      }
    })
}

callbacks.getLikes = async (data) => {
  likes.user = {}
  likes.name = {}
  const t = data.data.response.items
  for (let key in t) {
    stack.call(() => likes.get(t[key].id, t[key].owner_id))
  }
  stack.onFinish = () => {
    let data = []
    for (let key in likes.user) {
      data.push({id: key, value: likes.user[key], fname: likes.name[key].fname, lname: likes.name[key].lname})
    }
    data.sort((a, b) => {
      if (a.value > b.value) return -1;
      if (a.value < b.value) return 1;
      return 0
    })
    stack.resolve(data)
  }
  return new Promise(resolve => {
    stack.resolve = resolve
  })
}
// Сбор комментариев
callbacks.getCommentsUsers = async(data) => {

}
export { callVK }; 