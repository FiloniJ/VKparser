import React, { Dispatch, SetStateAction } from 'react';
import SearchFilter from './SearchFilter/SearchFilter'
import SearchInput from './SearchFilter/SearchInput'

export type settingProps = {
  group: string,
  setGroup: Dispatch<SetStateAction<string>>,
  setAmount: Dispatch<SetStateAction<number>>,
  likeRef: React.RefObject<HTMLInputElement | null>,
  commentRef: React.RefObject<HTMLInputElement | null>,
  amount: number
}

const Settings: React.FC<settingProps> = ({group, setGroup, setAmount, likeRef, commentRef, amount}) => {
    return (
    <div className = "layout text-center">
        <div>
          <label htmlFor = "groud_id" className = "mr-5">Ссылка на группу ВК</label>
          <input
            type = "text"
            id = "group_id"
            value = { group }
            onChange = {e => setGroup(e.target.value)}
          />
        </div>
        <div className = "mt-3">
          <label htmlFor = "notes_amount" className = "mr-5">Количество последних записей для парсинга</label>
          <input
            className = "w-20"
            type = "number"
            id = "notes_amount"
            min = "1" max = "100"
            value = {amount}
            onChange = {e  => setAmount(Number(e.target.value))}
          />
        </div>
        <SearchFilter>
          <SearchInput id='likeInput' ref={likeRef} name="Лайки" defaultChecked/>
          <SearchInput id='commentInput' ref={commentRef} name="Комментарии"/>
        </SearchFilter>
    </div>
    )
}

export default Settings