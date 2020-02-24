import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <section className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">Developer connector</h1>
          <h2 class="subtitle">
            Создай профиль разработчика, выкладывай посты и получай помощь от
            других разработчиков
          </h2>
          <Link to="/register" className="button is-primary">
            <strong>Регистрация</strong>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Landing
