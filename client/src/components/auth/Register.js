import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'

const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { name, email, password, confirmPassword } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setAlert('Пароли не совпадают')
    } else {
      register({ name, email, password })
    }
  }

  return (
    <div className='row'>
      <form onSubmit={e => onSubmit(e)} className='col s12 l4 offset-l4'>
        <div className='row'>
          <h3 className='center-align'>Регистрация</h3>

          <div className='input-field col s12'>
            <input
              value={name}
              onChange={e => onChange(e)}
              id='first_name'
              type='text'
              name='name'
              className='validate'
            />
            <label htmlFor='first_name'>Имя</label>
          </div>
          <div className='input-field col s12'>
            <input
              value={email}
              onChange={e => onChange(e)}
              id='email'
              type='email'
              name='email'
              className='validate'
            />
            <label htmlFor='email'>E-mail</label>
          </div>
          <div className='input-field col s12'>
            <input
              value={password}
              onChange={e => onChange(e)}
              id='password'
              type='password'
              name='password'
              className='validate'
              minLength='6'
            />
            <label htmlFor='password'>Пароль</label>
          </div>
          <div className='input-field col s12'>
            <input
              value={confirmPassword}
              onChange={e => onChange(e)}
              id='confirm_password'
              type='password'
              name='confirmPassword'
              className='validate'
              minLength='6'
            />
            <label htmlFor='confirm_password'>Подтвердите пароль</label>
          </div>
          <div className='col s12 center-align'>
            <button
              className='btn waves-effect waves-light btn-large'
              type='submit'>
              Зарегистрироваться
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
}

export default connect(null, { setAlert, register })(Register)
