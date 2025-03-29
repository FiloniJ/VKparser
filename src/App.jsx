import { useState, useRef } from 'react';
import "./App.css";
import Button from "./common/Button/Button";
import Header from "./common/Header/Header";
import Result from './components/Result';
import Settings from './components/Settings';
import { startSearch } from './providers/search';

function App() {
  const [amount, setAmount] = useState(1)
  const [group, setGroup] = useState('https://vk.com/')
  const [isLoading, setLoading] = useState(false)
  const [VKData, setVKData] = useState(false)
  const commentRef = useRef()
  const likeRef = useRef()

  return (
    <div className='flex flex-col justify-center'>
      <Header name = 'Сбор активности в группе ВК'/>
      <Settings {...{ group, setGroup, setAmount, amount, likeRef, commentRef }}/>
      <Button
        onClick = {() => startSearch({ group, likeRef, commentRef, setLoading, setVKData, setAmount, amount })}
        name = 'Начать парсинг'
        isLoading = {isLoading}
      />
      { VKData && <Result data = {VKData}/> }
    </div>
  )
}

export default App;
