import React, { useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({ alerts }) => {
  useEffect(() => {
    if (alerts.length) {
      M.toast({ html: alerts[alerts.length - 1] })
    }
  }, [alerts])

  return <div id='toast-container'></div>
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alert)
