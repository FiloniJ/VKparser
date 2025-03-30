import { dataType } from "../App"
import { stack, callVK, delay } from "./stack"

type Likes = {
  user: number[],
  name: {fname: string, lname: string}[],
  get(id: number, groupID: number): Promise<void>
}

type ApiResponse = {
  data: {
    response: {
      items: {id: number, owner_id: number, first_name:string, last_name: string}[]
    }
  }
}

const likes: Likes = {
  user: [],
  name: [],
  get: async (id, groupID) => {
    const res: ApiResponse = await callVK('likes.getList', {type: 'post', owner_id: groupID, item_id: id, extended: 1})
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
}

export const getLikes = async (data: ApiResponse) => {
  likes.user = []
  likes.name = []
  const t = data.data.response.items
  for (let key in t) {
    stack.add(() => likes.get(t[key].id, t[key].owner_id))
  }
  stack.onFinish = () => {
    let data: dataType[] = []
    for (let key in likes.user) {
      data.push({id: key, like: likes.user[key], fname: likes.name[key].fname, lname: likes.name[key].lname})
    }
    stack.resolve?.(data)
  }
  
  return new Promise(resolve => {
    stack.resolve = resolve
  })
}