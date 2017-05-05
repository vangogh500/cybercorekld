import React from 'react'
import { browserHistory } from 'react-router'

import {AUTH_LOGIN_URL} from '../strings.js'
import {LOGOUT_BUTTON_LABEL} from '../../authorization/res/strings.js'
import { STATUS_SUCCESS } from '../numbers.js'

/**
 * Navbar for the web app
 */
export default class Navbar extends React.Component {
  /**
   * propTypes
   * @property {Number} status Status of the login request
   * @property {String} username Username for the account
   * @property {ReactElement} children JSX to present under the navbar
   */
  static get propTypes() {
    return {
      status: React.PropTypes.number,
      username: React.PropTypes.string,
      children: React.PropTypes.element
    }
  }

  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props)
    this.handleOnLogout = this.handleOnLogout.bind(this)
  }

  /**
   * Handle click event on logout button. Redux Action emits {@link logout}.
   * @param {SythenticEvent} e
   * @emits {ReduxAction} Sends the logout action to the dispatcher.
   * @emits {Redirect} Redirects to login page.
   */
  handleOnLogout(e) {
    e.preventDefault()
    this.props.onLogout()
    browserHistory.push(AUTH_LOGIN_URL)
  }

  /**
   * Renders the navbar. Renders auth info based on prop status.
   * @return {ReactElement} HTML of the Navbar and child components
   */
  render() {
    return (
      <div>
        <nav id="main-nav" className="navbar">
          <div className="container">
            <div className="navbar-header">
              <a id="nav-title" className="navbar-brand">
                <span><img id="logo" src="/img/logo.png" />CyberCore KLD</span>
              </a>
            </div>
            {
              this.props.status == STATUS_SUCCESS ?
                (<ul className="nav navbar-nav pull-right">
                  <li>
                    <span className="glyphicon glyphicon-user"></span>{this.props.username}
                  </li>
                  <li>
                    <button type="button" className="btn btn-danger waves-effect" onClick={this.handleOnLogout}>
                      {LOGOUT_BUTTON_LABEL}
                    </button>
                  </li>
                </ul>) : (<span></span>)
            }
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
