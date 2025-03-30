import React from 'react'
import Button from '../common/Button/Button'
import Image from '../common/Image'
import { saveToCSV } from '../providers/saveToCSV'
import { dataType } from '../App'

type Props = {
  data: dataType[]
}

const Result: React.FC<Props> = ({ data }) => {
  return (
    <div className='layout'>
      <div className="menu-name">Результаты</div>
      <Button 
        name = 'Сохранить данные'
        onClick = {() => saveToCSV(data)}
      />
      <div className="layout">
        {data.map(user => (
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