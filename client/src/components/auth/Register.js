import React, { useState } from 'react'

const Register = () => {
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
      console.log('Password error')
    } else {
      console.log('Success')
    }
  }

  return (
    <div className="columns">
      <form
        onSubmit={e => onSubmit(e)}
        className="column is-4 is-offset-one-quarter"
      >
        <h1 className="title">Регистрация</h1>
        <div className="field">
          <div className="control">
            <input
              className="input"
              name="name"
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={e => onChange(e)}
              required
            />
          </div>
        </div>

        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              name="email"
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={e => onChange(e)}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input"
              name="password"
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={e => onChange(e)}
              minLength="6"
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input"
              name="confirmPassword"
              type="password"
              placeholder="Подтвердите пароль"
              value={confirmPassword}
              onChange={e => onChange(e)}
              minLength="6"
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>

        <div className="control">
          <button type="submit" className="button is-primary">
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
