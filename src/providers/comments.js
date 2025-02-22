import { stack, callVK } from "./stack"

const comments = {
    user: {},
    name: {},
}
  
comments.get = async (id, groupID) => {
    const res = await callVK('wall.getComments', {
        type: 'post',
        owner_id: groupID,
        post_id: id,
        extended: 1,
        count: 100,
        sort: 'desc',
        preview_length: '5',
    })
    const arr = res.data.response.items
    const profiles = res.data.response.profiles
    for (let key in arr) {
        let id = arr[key].from_id
        let data = comments.user[id]
        comments.user[id] = data ? data += 1 : 1
        if (!comments.name[id]) {
            const user = profiles.find(user => user.id === id)
            comments.name[id] = {fname: user.first_name, lname: user.last_name}
        }
    }
}

export const getWallpostCommentatorsUsers = async (data) => {
    comments.user = {}
    comments.name = {}
    const t = data.data.response.items
    for (let key in t) {
        stack.add(() => comments.get(t[key].id, t[key].owner_id))
    }
    stack.onFinish = () => {
        let data = []
        for (let key in comments.user) {
            data.push({id: key, comment: comments.user[key], fname: comments.name[key].fname, lname: comments.name[key].lname})
        }
        stack.resolve(data)
    }

    return new Promise(resolve => {
        stack.resolve = resolve
    })
}