import React from 'react'
import { useState, useRef } from 'react';
import "./App.css";
import Button from "./common/Button/Button";
import Header from "./common/Header/Header";
import Result from './components/Result';
import Settings from './components/Settings';
import { startSearch } from './providers/search';

export type dataType = {
  id: string,
  lname: string,
  fname: string,
  like?: number,
  comment?: number
}

function App() {
  const [amount, setAmount] = useState<number>(1)
  const [group, setGroup] = useState<string>('https://vk.com/')
  const [isLoading, setLoading] = useState<boolean>(false)
  const [VKData, setVKData] = useState<dataType[]>([])
  const commentRef = useRef<HTMLInputElement | null>(null)
  const likeRef = useRef<HTMLInputElement | null>(null)

  return (
    <div className='flex flex-col justify-center'>
      <Header name = 'Сбор активности в группе ВК'/>
      <Settings {...{ group, setGroup, setAmount, amount, likeRef, commentRef }}/>
      <Button
        onClick = {() => startSearch({ group, likeRef, commentRef, setLoading, setVKData, setAmount, amount })}
        name = 'Начать парсинг'
        isLoading = {isLoading}
      />
      { VKData[0] && <Result data = {VKData}/> }
    </div>
  )
}

export default App
