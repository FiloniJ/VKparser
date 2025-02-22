import React, { forwardRef } from 'react';

const SearchInput = forwardRef((props, ref) => {
    return (
       <div>
            <input type="checkbox"
                id={props.id}
                ref={ref}
                defaultChecked={props.defaultChecked}
            />
            <label htmlFor={props.id} className='ml-2'>{props.name}</label>
       </div>
    )
})

export default SearchInput