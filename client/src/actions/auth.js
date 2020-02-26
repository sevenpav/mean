import axios from 'axios'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './types'
import { setAlert } from './alert'
import setAuthToken from '../utils/setAuthToken'

export const loadUser = () => async dispath => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get('/api/auth')

    dispath({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispath({
      type: AUTH_ERROR
    })
  }
}

export const register = user => async dispath => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify(user)

  try {
    const res = await axios.post('/api/users', body, config)

    dispath({ type: REGISTER_SUCCESS, payload: res.data })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(({ msg }) => dispath(setAlert(msg)))
    }

    dispath({
      type: REGISTER_FAIL
    })
  }
}

export const login = (email, password) => async dispath => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('/api/auth', body, config)

    dispath({ type: LOGIN_SUCCESS, payload: res.data })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(({ msg }) => dispath(setAlert(msg)))
    }

    dispath({
      type: LOGIN_FAIL
    })
  }
}
