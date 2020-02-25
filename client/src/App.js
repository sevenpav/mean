import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import 'materialize-css/dist/js/materialize'
import 'materialize-css/sass/materialize.scss'

import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />

        <div className='container'>
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/register' component={Register} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  )
}

export default App
