import React from 'react'

const SearchFilter = props => {
  return (
    <fieldset>
      <legend>Параметры поиска:</legend>
      <div className="text-left ml-50">
        {props.children}
      </div>
    </fieldset>
  )
}

export default SearchFilter