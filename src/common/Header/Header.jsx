import React from 'react'
import './Header.css'

const Header = props => {
  return (
    <div className="layout menu-name">{props.name}</div>
  )
}

export default Header