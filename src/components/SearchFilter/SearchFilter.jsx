import React from 'react'

const SearchFilter = props => {
  const filterChange = e => {
    const id = Number(e.target.id.replace('row_', ''))
    props.onChange(id, e.target.checked)
  }

  return (
    <fieldset>
      <legend>Параметры поиска:</legend>
      <div className="text-left ml-50">
        {props.filter.map((data, idx) =>
          <div key={idx + 1}>
            <input
              type="checkbox"
              id={`row_${idx + 1}`}
              onChange={filterChange}
            />
            <label htmlFor={`row_${idx + 1}`} className="ml-2">{data}</label>
          </div>
        )}
      </div>
    </fieldset>
  )
}

export default SearchFilter