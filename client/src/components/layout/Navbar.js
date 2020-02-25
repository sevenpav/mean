import React, { Fragment, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize'

const Navbar = () => {
  const sidenavRef = useRef(null)

  useEffect(() => {
    M.Sidenav.init(sidenavRef.current)
  }, [])

  return (
    <Fragment>
      <nav>
        <div className='nav-wrapper blue-grey lighten-2'>
          <Link to='/' className='brand-logo'>
            <i className='material-icons'>developer_mode</i>
            DevConnector
          </Link>
          <a
            href='#!'
            data-target='mobile-nav'
            className='right sidenav-trigger'>
            <i className='material-icons'>menu</i>
          </a>
          <ul className='right hide-on-med-and-down'>
            <li>
              <Link to='/register'>Регистрация</Link>
            </li>
            <li>
              <Link to='/'>Вход</Link>
            </li>
          </ul>
        </div>
      </nav>
      <ul id='mobile-nav' className='sidenav' ref={sidenavRef}>
        <li>
          <Link to='/register'>Регистрация</Link>
        </li>
        <li>
          <Link to='/'>Вход</Link>
        </li>
      </ul>
    </Fragment>
  )
}

export default Navbar
