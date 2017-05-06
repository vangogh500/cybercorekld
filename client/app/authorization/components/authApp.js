import React from 'react'
import { browserHistory } from 'react-router'

import { AUTH_LOGIN_URL } from '../../res/strings.js'
import { AUTH_INVALID_PROMPT } from '../res/strings.js'
import { STATUS_SUCCESS } from '../../res/numbers.js'

/**
 * Container for components with authorized access only
 */
export default class AuthApp extends React.Component {
  /**
   * Handles mount event.
   * @emits {Alert} If status is not equal to {@link STATUS_SUCCESS}
   * @emits {Redirect} If status is not equal to {@link STATUS_SUCCESS}
   */
  componentWillMount() {
    if(this.props.status !== STATUS_SUCCESS) {
      alert(AUTH_INVALID_PROMPT)
      browserHistory.push(AUTH_LOGIN_URL)
    }
  }
  /**
   * Renders child components
   * @return {ReactComponent} A div containing all children
   */
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
