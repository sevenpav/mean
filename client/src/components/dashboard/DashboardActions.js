import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const DashboardActions = () => {
  return (
    <Fragment>
      <div className='row mt-2'>
        <Link to='/edit-profile' className='waves-effect waves-light btn-small'>
          Редактировать профиль
        </Link>
      </div>

      <div className='row'>
        <Link
          to='/add-experience'
          className='waves-effect waves-light btn-small'>
          Добавить опыт
        </Link>
      </div>
      <div className='row'>
        <Link
          to='/add-education'
          className='waves-effect waves-light btn-small'>
          Добавить образование
        </Link>
      </div>
    </Fragment>
  )
}

export default DashboardActions
