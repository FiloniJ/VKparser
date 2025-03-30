import React, { forwardRef } from 'react';

type Props = {
    id: string,
    defaultChecked?: boolean,
    name: string,
    ref: HTMLInputElement
}

const SearchInput = forwardRef<HTMLInputElement, Props>(({id, defaultChecked, name}, ref) => {
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