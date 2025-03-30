import { dataType } from "../App"
import { stack, callVK, delay } from "./stack"

type Comments = {
    user: Record<number, number>,
    name: Record<number, {fname: string, lname: string}>,
    get(id: number, groupID: number): Promise<void>
}

interface ApiResponse {
    data: {
      response: {
        items: {id: number, owner_id: number, from_id: number}[],
        profiles: {id: number, first_name: string, last_name: string}[]
      }
    }
}
  
const comments: Comments = {
    user: {},
    name: {},
    get: async (id, groupID) => {
        const res: ApiResponse = await callVK('wall.getComments', {
            type: 'post',
            owner_id: groupID,
            post_id: id,
            extended: 1,
            count: 100,
            sort: 'desc',
            preview_length: '5',
        })
        if (res.data?.response) {
            const { items, profiles } = res.data.response
            for (let key in items) {
                let id = items[key].from_id
                let data = comments.user[id]
                comments.user[id] = data ? data += 1 : 1
                if (!comments.name[id]) {
                    const user = profiles.find(user => user.id === id)
                    if (user) {
                        comments.name[id] = {fname: user.first_name, lname: user.last_name}
                    }
                }
            }
        } else {
            await delay(500)
            await comments.get(id, groupID)
        }
    }
}

export const getWallpostCommentatorsUsers = async (data: ApiResponse) => {
    comments.user = {}
    comments.name = {}
    const t = data.data.response.items
    for (let key in t) {
        stack.add(() => comments.get(t[key].id, t[key].owner_id))
    }
    stack.onFinish = () => {
        let data: dataType[] = []
        for (let key in comments.user) {
            if (comments.name[key]) {
                data.push({id: key, comment: comments.user[key], fname: comments.name[key].fname, lname: comments.name[key].lname})
            }
        }
        stack.resolve?.(data)
    }

    return new Promise(resolve => {
        stack.resolve = resolve
    })
}