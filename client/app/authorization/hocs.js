import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { AUTH_LOGIN_URL, AUTH_INVALID_PROMPT } from '../res/strings.js'
import { STATUS_SUCCESS } from '../res/numbers.js'

const mapStateToProps = (state) => {
  return {
    status: state.auth.status
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}
/**
 * Returns a Higher Order Component that is connected to the store and redirect if not authorized.
 * @param {ReactComponent} WrappedComponent The component to wrap.
 * @property {Function} componentWillMount Handles the mount event. Redirects if it is not a {@link STATUS_SUCCESS}
 * @property {Function} render Renders the {@link WrappedComponent}.
 */
export function withAuth(WrappedComponent) {
  class WithAuth extends React.Component {
    componentWillMount() {
      if(this.props.status !== STATUS_SUCCESS) {
        alert(AUTH_INVALID_PROMPT)
        browserHistory.push(AUTH_LOGIN_URL)
      }
    }
    render() {
      return <WrappedComponent />
    }
  }
  return connect(mapStateToProps, mapDispatchToProps)(WithAuth)
}
