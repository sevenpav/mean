import React, { useState } from 'react'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async e => {
    e.preventDefault()
  }

  return (
    <div className='row'>
      <form onSubmit={e => onSubmit(e)} className='col s12 l4 offset-l4'>
        <div className='row'>
          <h3 className='center-align'>Личный кабинет</h3>

          <div className='input-field col s12'>
            <input
              value={email}
              onChange={e => onChange(e)}
              id='email'
              type='email'
              name='email'
              className='validate'
              required
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
              required
            />
            <label htmlFor='password'>Пароль</label>
          </div>

          <div className='col s12 center-align'>
            <button
              className='btn waves-effect waves-light btn-large'
              type='submit'>
              Войти
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
