import React from 'react'

type Props = {
  children?: React.ReactNode
}

const SearchFilter: React.FC<Props> = ({ children }) => {
  return (
    <fieldset>
      <legend>Параметры поиска:</legend>
      <div className="text-left ml-50">
        {children}
      </div>
    </fieldset>
  )
}

export default SearchFilter