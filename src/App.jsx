import { useState } from 'react';
import "./App.css";
import Button from "./common/Button/Button";
import Header from "./common/Header/Header";
import Result from './components/Result/Result';
import SearchFilter from "./components/SearchFilter/SearchFilter";
import { callVK } from './providers/stack'

function App() {
  const [amount, setAmount] = useState(1)
  const [group, setGroup] = useState('https://vk.com/')
  const [isLoading, setLoading] = useState(false)
  const [VKData, setVKData] = useState(false)

  const startSearch = async ()  => {
    if (amount > 100) setAmount(100)
    if (amount < 1) setAmount(1)
    let isZero = true
    filterChecked.forEach(bool => {
      if (bool) isZero = false
    })
    if (isZero) {
      // alert('Выберите минимум 1 фильтр для поиска')
      // return
    }
    setVKData(false)
    try {
      let groupID = 0
      setLoading(true)
      if (group.indexOf('vk.com/public') === -1) {
        const data = await callVK('utils.resolveScreenName',{screen_name: group.replace('https://vk.com/', '')})
        groupID = data.data.response.object_id
      } else {
        groupID = group.replace('https://vk.com/public', '')
      }
      if (groupID !== 0) {
        const likes = await callVK('wall.get',{owner_id: -groupID, count: amount}, 'getLikes')
        const comments = await callVK('wall.get',{owner_id: -groupID, count: amount}, 'getWallpostCommentatorsUsers')
        const likesMap = new Map(likes.map(l => [l.id, l]))
        const commentsMap = new Map(comments.map(c => [c.id, c]))
        const allIds = new Set([...likesMap.keys(), ...commentsMap.keys()])
        const data = [...allIds].map(id => ({...likesMap.get(id), ...commentsMap.get(id)}))
        data.sort((a,b) => (b.like || 0 + b.comment || 0) - (a.like || 0 + a.like || 0))
        setVKData(data)
        setLoading(false)
      } else {
        alert('Введите правильный адрес группы ВК!')
        setLoading(false)
      }
    } catch(e) {
      setLoading(false)
    }
  }

  const filterData = ['Лайки', 'Комментарии']
  const filterChecked = []
  const onFilterChange = (id, status)  => {
    filterChecked[id] = status
  }

  return (
    <div className='flex flex-col justify-center'>
      <Header name = 'Сбор активности в группе ВК'/>
      <div className = "layout text-center">
        <div>
          <label htmlFor = "groud_id" className = "mr-5">Ссылка на группу ВК</label>
          <input
            type = "text"
            id = "group_id"
            value = { group }
            onChange = {e=> setGroup(e.target.value)}
          />
        </div>
        <div className = "mt-3">
          <label htmlFor = "notes_amount" className = "mr-5">Количество последних записей для обработки</label>
          <input
            className = "w-20"
            type = "number"
            id = "notes_amount"
            min = "1" max = "100"
            value = {amount}
            onChange = {e  => setAmount(e.target.value)}
          />
        </div>
        <SearchFilter
          filter = {filterData}
          onChange = {onFilterChange}
        />
      </div>
      <Button
        onClick = {startSearch}
        name = 'Начать поиск'
        isLoading = {isLoading}
      />
      {VKData &&
        <Result
          data = {VKData}
        />
      }
    </div>
  )
}

export default App;
