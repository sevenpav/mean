import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <div className='nav-wrapper blue-grey lighten-2'>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li>
            <Link to='/register'>Регистрация</Link>
          </li>
          <li>
            <Link to='/'>Вход</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
