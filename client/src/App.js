import React, { Fragment, useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layout/Alert'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <div className='container'>
            <Switch>
              <Route path='/' exact component={Login} />
              <Route path='/register' component={Register} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
