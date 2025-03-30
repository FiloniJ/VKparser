import React from 'react'
import './Header.css'

type Props = {
  name: string
}

const Header: React.FC<Props> = ({ name }) => {
  return (
    <div className="layout menu-name">{name}</div>
  )
}

export default Header