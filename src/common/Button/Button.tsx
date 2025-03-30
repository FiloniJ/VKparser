import React from 'react'
import './Button.css'

type Props = {
  onClick: () => void,
  isLoading?: boolean,
  name: string
}

const Button: React.FC<Props> = ({onClick, isLoading, name}) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`layout but ${isLoading && 'loader'}`}
        disabled={isLoading}
      >
        {!isLoading && name }
      </button>
    </div>
  )
}

export default Button