import { stack, callVK } from "./stack"

const likes = {
  user: {},
  name: {},
}

likes.get = async (id, groupID) => {
  const res = await callVK('likes.getList', {type: 'post', owner_id: groupID, item_id: id, extended: 1})
  const arr = res.data.response.items
  for (let key in arr) {
    let id = arr[key].id
    let data = likes.user[id]
    likes.user[id] = data ? data += 1 : 1
    likes.name[id] = {fname: arr[key].first_name, lname: arr[key].last_name}
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