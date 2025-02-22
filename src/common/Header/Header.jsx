import React from 'react'
import './Header.css'

const Header = props => {
  return (
    <div>
      <div className="layout menu-name">{props.name}</div>
    </div>
  )
}

export default Header