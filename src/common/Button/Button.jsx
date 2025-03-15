import './Button.css'

const Button = ({onClick, isLoading, name}) => {
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