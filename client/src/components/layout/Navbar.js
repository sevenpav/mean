import React, { Fragment, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import M from 'materialize-css/dist/js/materialize'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Navbar = ({ logout, auth }) => {
  const { isAuthenticated, loading } = auth

  const authLinks = isMobile => {
    const props = isMobile
      ? { id: 'mobile-nav', className: 'sidenav', ref: sidenavRef }
      : { className: 'right hide-on-med-and-down' }

    return (
      <ul {...props}>
        <li>
          <a href='#!' onClick={logout}>
            Выход
          </a>
        </li>
      </ul>
    )
  }

  const guestLinks = isMobile => {
    const props = isMobile
      ? { id: 'mobile-nav', className: 'sidenav', ref: sidenavRef }
      : { className: 'right hide-on-med-and-down' }

    return (
      <ul {...props}>
        <li>
          <Link to='/register'>Регистрация</Link>
        </li>
        <li>
          <Link to='/login'>Вход</Link>
        </li>
      </ul>
    )
  }

  const sidenavRef = useRef(null)

  useEffect(() => {
    M.Sidenav.init(sidenavRef.current)
  }, [isAuthenticated])

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
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks() : guestLinks()}</Fragment>
          )}
        </div>
      </nav>
      {!loading && (
        <Fragment>
          {isAuthenticated ? authLinks(true) : guestLinks(true)}
        </Fragment>
      )}
    </Fragment>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
