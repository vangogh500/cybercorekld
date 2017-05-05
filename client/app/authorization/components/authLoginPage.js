import React from 'react'

import {AUTH_LOGIN_TITLE} from '../res/strings.js'
import AuthFormSync from '../containers/authFormSync.js'
/**
 * Authorization Login Page
 * <p>Route: {@link AUTH_LOGIN_LINK}</p>
 * <p>Contains:
 * <ul style="list-style">
 *    <li> {@link AuthForm} </li>
 * </ul></p>
 */
export default class AuthLoginPage extends React.Component {
  /**
   * Set's the page title to {@link AUTH_LOGIN_TITLE}
   */
  componentDidMount() {
    document.title = AUTH_LOGIN_TITLE
  }
  /**
   * Renders the login page for admin's
   * @return {ReactElement} HTML panel with {@link AuthForm}
   */
  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading text-center"><h4>Authorize</h4></div>
          <div className="panel-body">
            <AuthFormSync />
          </div>
        </div>
      </div>
    )
  }
}
