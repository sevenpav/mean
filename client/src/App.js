import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.css'
import 'bulma/bulma.sass'

import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route path="/" exact component={Landing} />

        <div className="container">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  )
}

export default App
