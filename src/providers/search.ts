import { dataType } from '../App'
import { callVK } from './queue'
import { settingProps } from '../components/Settings'
import { Dispatch, SetStateAction } from 'react'

const amoutLimit = (value: number) => Math.max(1, Math.min(100, value))

type SearchProps = Omit<settingProps, 'setGroup'> & {
    setLoading: Dispatch<SetStateAction<boolean>>,
    setVKData: Dispatch<SetStateAction<dataType[]>>
}

interface apiGroupID {
    data: {
        response: {
            object_id: number
        }
    }
}

export const startSearch = async ({ group, likeRef, commentRef, setLoading, setVKData, setAmount, amount }: SearchProps)  => {
    setAmount((prev: number) => amoutLimit(prev))
    if (!commentRef.current?.checked && !likeRef.current?.checked) {
        return alert('Выберите минимум 1 фильтр для поиска')
    }
    setVKData([])
    setLoading(true)
    try {
        let groupID: number | string = 0
        if (group.indexOf('vk.com/public') === -1) {
            const groupName: string = group.replace('https://vk.com/', '')
            if (!groupName) {
                return alert('Укажите адрес группы ВК!')
            }
            const data: apiGroupID = await callVK('utils.resolveScreenName',{screen_name: groupName})
            groupID = data.data.response.object_id
        } else {
            groupID = group.replace('https://vk.com/public', '')
        }
        if (groupID && groupID !== 0) {
            let [likes, comments]: [dataType[], dataType[]] = [[], []]
            if (likeRef.current?.checked) {
                likes = await callVK('wall.get',{owner_id: -groupID, count: amount}, 'getLikes')
            }
            if (commentRef.current?.checked) {
                comments = await callVK('wall.get',{owner_id: -groupID, count: amount}, 'getWallpostCommentatorsUsers')
            }
            const likesMap = new Map(likes.map(l => [l.id, l]))
            const commentsMap = new Map(comments.map(c => [c.id, c]))
            const allIds = new Set([...likesMap.keys(), ...commentsMap.keys()])
            const data: dataType[] = [...allIds].map(id => ({...likesMap.get(id), ...commentsMap.get(id)})) as dataType[]
            data.sort((a,b) => ((b.like || 0) + (b.comment || 0)) - ((a.like || 0) + (a.comment || 0)))
            setVKData(data)
        } else {
            alert('Введите правильный адрес группы ВК!')
        }
    } catch(e) {
        console.error(e)
    } finally {
        setLoading(false)
    }
}