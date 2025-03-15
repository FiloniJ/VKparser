import React, { forwardRef } from 'react';

const SearchInput = forwardRef(({id, defaultChecked, name}, ref) => {
    return (
       <div>
            <input type="checkbox"
                id={id}
                ref={ref}
                defaultChecked={defaultChecked}
            />
            <label htmlFor={id} className='ml-2'>{name}</label>
       </div>
    )
})

export default SearchInput