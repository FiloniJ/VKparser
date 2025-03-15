import React from 'react'
import Button from '../common/Button/Button'
import Image from '../common/Image'

const Result = props => {
  const headersMap = {
    id: 'Ид',
    fname: 'Имя',
    lname: 'Фамилия',
    like: 'Лайки',
    comment: 'Комментарии',
  }

  const saveData = (e, filename = "Активность в ВК.csv") => {
    const delimiter = ";"
    const headers = Object.values(headersMap)
    const keys = Object.keys(headersMap)
    const escapeValue = (value) => {
        if (typeof value === "string") {
            return `"${value.replace(/"/g, '""')}"`
        }
        return value ?? ""
    }
    const csvContent = [
        "\uFEFF" + headers.join(delimiter),
        ...props.data.map(row => keys.map(key => escapeValue(row[key])).join(delimiter))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className='layout'>
      <div className="menu-name">Результаты</div>
      <Button 
        name = 'Сохранить данные'
        onClick = {saveData}
      />
      <div className="layout">
        {props.data.map(user => (
          <a key={user.id} href={`https://vk.com/id${user.id}`} rel="noreferrer" target='_blank' title='Перейти в профиль'>
            <div className="layout flex flex-col sm:flex-row indent-0">
              <span>{user.lname + ' ' + user.fname}</span>
              <div className='flex flex-row justify-center'>
                {user.like &&
                  <>
                    <Image className="mx-2" name='like' width='30' height='30'/>
                    <span>{user.like}</span>
                  </>
                }
                {user.comment &&
                  <>
                    <Image className="mx-2" name='comment' width='30' height='30'/>
                    <span>{user.comment}</span>
                  </>
                }
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Result