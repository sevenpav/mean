import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [])

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        {loading && profile === null ? (
          <div className='center-align'>
            <Spinner />
          </div>
        ) : (
          <Fragment>
            <h3>Профиль</h3>
            <div className='card-panel blue-grey lighten-2'>
              <span className='white-text'>
                <h4>Здравствуйте {user && user.name}</h4>
                {profile ? (
                  <p>Ваш профиль</p>
                ) : (
                  <div>
                    <p>Заполните ваш профиль</p>
                    <Link
                      to='/create-profile'
                      className='btn waves-effect waves-light blue darken-1'>
                      Заполнить
                    </Link>
                  </div>
                )}
              </span>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth, profile }) => ({
  auth,
  profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
