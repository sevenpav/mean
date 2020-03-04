import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '../auth/Login'
import Register from '../auth/Register'
import Dashboard from '../dashboard/Dashboard'
import CreateProfile from '../profile-forms/CreateProfile'
import EditProfile from '../profile-forms/EditProfile'
import PrivateRoute from './PrivateRoute'
import Alert from '../layout/Alert'

import NotFound from '../layout/NotFound'

const Routes = () => {
  return (
    <section className='container'>
      <Alert />

      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <PrivateRoute path='/dashboard' exact component={Dashboard} />
        <PrivateRoute path='/create-profile' exact component={CreateProfile} />
        <PrivateRoute path='/edit-profile' exact component={EditProfile} />
        <Route component={NotFound} />
      </Switch>
    </section>
  )
}

export default Routes
