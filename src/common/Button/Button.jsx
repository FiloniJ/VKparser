import './Button.css'

const Button = props => {
  const buttonClicked = () => {
    props.onClick()
  }

  return (
    <div>
      <button
        onClick={buttonClicked}
        className={`layout but ${props.isLoading && 'loader'}`}
        disabled={props.isLoading}
      >
        {!props.isLoading && props.name }
      </button>
    </div>
  )
}

export default Button