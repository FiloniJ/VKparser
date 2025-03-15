import { stack, callVK, delay } from "./stack"

const likes = {
  user: {},
  name: {},
}

likes.get = async (id, groupID) => {
  const res = await callVK('likes.getList', {type: 'post', owner_id: groupID, item_id: id, extended: 1})
  if (res.data.response) {
    const arr = res.data.response.items
    for (let key in arr) {
      let id = arr[key].id
      likes.user[id] = (likes.user[id] || 0) + 1
      if (!likes.name[id]) {
        likes.name[id] = {fname: arr[key].first_name, lname: arr[key].last_name}
      }
    }
  } else {
    await delay(500)
    await likes.get(id, groupID)
  }
}

export const getLikes = async (data) => {
  likes.user = {}
  likes.name = {}
  const t = data.data.response.items
  for (let key in t) {
    stack.add(() => likes.get(t[key].id, t[key].owner_id))
  }
  stack.onFinish = () => {
    let data = []
    for (let key in likes.user) {
      data.push({id: key, like: likes.user[key], fname: likes.name[key].fname, lname: likes.name[key].lname})
    }
    stack.resolve(data)
  }
  
  return new Promise(resolve => {
    stack.resolve = resolve
  })
}