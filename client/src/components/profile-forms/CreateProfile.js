import React, { useState, createRef, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import M from 'materialize-css/dist/js/materialize'

const CreateProfile = props => {
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

  const selectStatusRef = createRef(null)

  const [displaySocialInputs, toggleDisplaySocialInputs] = useState(false)

  useEffect(() => {
    M.FormSelect.init(selectStatusRef.current)
  }, [])

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {}

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
            <label htmlFor='company'>Название компании</label>
          </div>
          <div className='input-field col s12'>
            <input
              value={website}
              onChange={e => onChange(e)}
              id='website'
              type='text'
              name='website'
            />
            <label htmlFor='website'>Сайт</label>
          </div>
          <div className='input-field col s12'>
            <input
              value={location}
              onChange={e => onChange(e)}
              id='location'
              type='text'
              name='location'
              className='validate'
              required
            />
            <label htmlFor='location'>Место жительства</label>
          </div>

          <div className='input-field col s12'>
            <textarea
              value={bio}
              onChange={e => onChange(e)}
              id='bio'
              name='bio'
              className='materialize-textarea validate'
            />
            <label htmlFor='bio'>О себе</label>
          </div>

          <div className='input-field col s12'>
            <select
              value={status}
              onChange={e => onChange(e)}
              name='status'
              ref={selectStatusRef}>
              <option value='' disabled>
                Выберите статус
              </option>
              <option value='1'>Option 1</option>
              <option value='2'>Option 2</option>
              <option value='3'>Option 3</option>
            </select>
            <label>Статус</label>
          </div>
          <div className='input-field col s12'>
            <input
              value={skills}
              onChange={e => onChange(e)}
              id='skills'
              type='text'
              name='skills'
              className='validate'
              required
            />
            <label htmlFor='skills'>Навыки</label>
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
                  className='validate'
                  required
                />
                <label htmlFor='youtube'>Ссылка на YouTube</label>
              </div>
              <div className='input-field col s12'>
                <input
                  value={facebook}
                  onChange={e => onChange(e)}
                  id='facebook'
                  type='text'
                  name='facebook'
                  className='validate'
                  required
                />
                <label htmlFor='facebook'>Ссылка на Facebook</label>
              </div>
              <div className='input-field col s12'>
                <input
                  value={vk}
                  onChange={e => onChange(e)}
                  id='vk'
                  type='text'
                  name='vk'
                  className='validate'
                  required
                />
                <label htmlFor='vk'>Ссылка на VK</label>
              </div>
              <div className='input-field col s12'>
                <input
                  value={instagram}
                  onChange={e => onChange(e)}
                  id='instagram'
                  type='text'
                  name='instagram'
                  className='validate'
                  required
                />
                <label htmlFor='instagram'>Ссылка на Instagram</label>
              </div>
            </Fragment>
          )}

          <div className='col s12 center-align'>
            <button
              className='btn waves-effect waves-light btn-large'
              type='submit'>
              Создать профиль
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

CreateProfile.propTypes = {}

export default connect()(CreateProfile)
