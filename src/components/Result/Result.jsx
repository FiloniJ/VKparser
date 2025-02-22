import React from 'react'
import Button from '../../common/Button/Button'
import Image from '../../common/Image'

const Result = props => {
  const saveData = () => {
    let text = Object.keys(props.data).map(el => (
      `Активность (${props.data[el].value}) - ${props.data[el].lname} ${props.data[el].fname} - https://vk.com/id${props.data[el].id}\n`
    ))
    navigator.clipboard.writeText(text.join(''))
  }

  return (
    <div className='layout'>
      <div className="menu-name">Результаты</div>
      <Button 
        name = 'Скопировать данные'
        onClick = {saveData}
      />
      <div className="layout">
        {Object.keys(props.data).map(el => (
          <a key={el} href={`https://vk.com/id${props.data[el].id}`} rel="noreferrer" target='_blank' title='Перейти в профиль'>
            <div className="layout flex indent-0">
              <span>{props.data[el].lname + ' ' + props.data[el].fname}</span>
              <Image className="mx-2" name='like' width='30' height='30'/>
              <span>{props.data[el].value}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Result