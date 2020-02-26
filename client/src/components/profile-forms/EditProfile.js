import React, { useState, createRef, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import M from 'materialize-css/dist/js/materialize'
import { createProfile, getCurrentProfile } from '../../actions/profile'
import { Link, useHistory } from 'react-router-dom'

const EditProfile = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading }
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    bio: '',
    youtube: '',
    facebook: '',
    vk: '',
    instagram: ''
  })

  const {
    company,
    website,
    location,
    bio,
    status,
    skills,
    youtube,
    facebook,
    vk,
    instagram
  } = formData

  const history = useHistory()

  const selectStatusRef = createRef(null)

  const [displaySocialInputs, toggleDisplaySocialInputs] = useState(false)

  useEffect(() => {
    getCurrentProfile()

    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      bio: loading || !profile.bio ? '' : profile.bio,
      youtube: loading || !profile.social.youtube ? '' : profile.social.youtube,
      facebook:
        loading || !profile.social.facebook ? '' : profile.social.facebook,
      vk: loading || !profile.social.vk ? '' : profile.social.vk,
      instagram:
        loading || !profile.social.instagram ? '' : profile.social.instagram
    })
  }, [loading])

  useEffect(() => {
    M.FormSelect.init(selectStatusRef.current)
  }, [])

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    createProfile(formData, history, true)
  }

  return (
    <div className='row'>
      <form onSubmit={e => onSubmit(e)} className='col s12 l4 offset-l4'>
        <div className='row'>
          <h3 className='center-align'>Создать профиль</h3>
          <div className='input-field col s12'>
            <input
              value={company}
              onChange={e => onChange(e)}
              id='company'
              type='text'
              name='company'
            />
            <label className='active' htmlFor='company'>
              Название компании
            </label>
          </div>
          <div className='input-field col s12'>
            <input
              value={website}
              onChange={e => onChange(e)}
              id='website'
              type='text'
              name='website'
            />
            <label className='active' htmlFor='website'>
              Сайт
            </label>
          </div>
          <div className='input-field col s12'>
            <input
              value={location}
              onChange={e => onChange(e)}
              id='location'
              type='text'
              name='location'
            />
            <label className='active' htmlFor='location'>
              Место жительства
            </label>
          </div>

          <div className='input-field col s12'>
            <textarea
              value={bio}
              onChange={e => onChange(e)}
              id='bio'
              name='bio'
              className='materialize-textarea'
            />
            <label className='active' htmlFor='bio'>
              О себе
            </label>
          </div>

          <div className='input-field col s12'>
            <select
              value={status}
              onChange={e => onChange(e)}
              name='status'
              ref={selectStatusRef}>
              <option value='' disabled>
                Выберите должность
              </option>
              <option value='1'>Frontend разработчик</option>
              <option value='2'>Backend разработчик</option>
              <option value='3'>Fullstack разработчик</option>
            </select>
            <label>Должность</label>
          </div>
          <div className='input-field col s12'>
            <input
              value={skills}
              onChange={e => onChange(e)}
              id='skills'
              type='text'
              name='skills'
            />
            <label className='active' htmlFor='skills'>
              Навыки
            </label>
          </div>
          <div className='input-field col s12'>
            <button
              className='btn waves-effect waves-light'
              type='button'
              onClick={() => toggleDisplaySocialInputs(!displaySocialInputs)}>
              Добавить социальные сети
            </button>
          </div>
          {displaySocialInputs && (
            <Fragment>
              <div className='input-field col s12'>
                <input
                  value={youtube}
                  onChange={e => onChange(e)}
                  id='youtube'
                  type='text'
                  name='youtube'
                />
                <label className='active' htmlFor='youtube'>
                  Ссылка на YouTube
                </label>
              </div>
              <div className='input-field col s12'>
                <input
                  value={facebook}
                  onChange={e => onChange(e)}
                  id='facebook'
                  type='text'
                  name='facebook'
                />
                <label className='active' htmlFor='facebook'>
                  Ссылка на Facebook
                </label>
              </div>
              <div className='input-field col s12'>
                <input
                  value={vk}
                  onChange={e => onChange(e)}
                  id='vk'
                  type='text'
                  name='vk'
                />
                <label className='active' htmlFor='vk'>
                  Ссылка на VK
                </label>
              </div>
              <div className='input-field col s12'>
                <input
                  value={instagram}
                  onChange={e => onChange(e)}
                  id='instagram'
                  type='text'
                  name='instagram'
                />
                <label className='active' htmlFor='instagram'>
                  Ссылка на Instagram
                </label>
              </div>
            </Fragment>
          )}

          <div className='col s12 center-align'>
            <div className='row'>
              <div className='col s6'>
                <button
                  className='btn waves-effect waves-light btn-large'
                  type='submit'>
                  Сохранить
                </button>
              </div>
              <div className='col s6'>
                <Link
                  to='/dashboard'
                  className='btn waves-effect waves-light btn-large'>
                  Назад
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  EditProfile
)
