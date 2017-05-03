import React from 'react'
import { browserHistory } from 'react-router'
import { AUTH_FORM_USERNAME_PROMPT, AUTH_FORM_PASSWORD_PROMPT, AUTH_FORM_200_MESSAGE, AUTH_FORM_401_MESSAGE, AUTH_FORM_500_MESSAGE  } from '../../res/strings.js'

/**
 * Authorization Login Form
 * <p>Route: {@link AUTH_LOGIN_LINK}</p>
 */
export default class AuthForm extends React.Component {
  /**
   * Constructor
   * @param {object} props
   */
  constructor(props) {
    super(props)
    /**
     * @type {object}
     * @property {string} username="" username
     * @property {string} password="" password
     */
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getStatus = this.handleStatus.bind(this)
  }

  /**
   * Handle change event at input form
   * @param {SyntheticEvent} e
   */
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  /**
   * Handle submit form event
   * <p>Valid: If there is a username and password</p>
   * @param {SyntheticEvent} e
   */
  handleSubmit(e) {
    e.preventDefault()
    var creds = Object.assign({}, this.state)
    this.props.onSubmit(creds)
  }

  /**
   * Renders the status of the login request
   * @param {Number} status status of the login request
   * @return {ReactElement} A spinner or a card message depending on the status of the login request.
   * <p>Uses {@link AUTH_FORM_200_MESSAGE}, {@link AUTH_FORM_401_MESSAGE}, and {@link AUTH_FORM_500_MESSAGE}</p>
   */
  getStatus(status) {
    switch(status) {
      case -1:
        return (
          <span></span>
        )
      case 0:
        return (
          <div className="spinner">
            <div className="sk-cube-grid">
              <div className="sk-cube sk-cube1"></div>
              <div className="sk-cube sk-cube2"></div>
              <div className="sk-cube sk-cube3"></div>
              <div className="sk-cube sk-cube4"></div>
              <div className="sk-cube sk-cube5"></div>
              <div className="sk-cube sk-cube6"></div>
              <div className="sk-cube sk-cube7"></div>
              <div className="sk-cube sk-cube8"></div>
              <div className="sk-cube sk-cube9"></div>
            </div>
          </div>
        )
      default:
        var msg = ""
        if(status == 200) msg = AUTH_FORM_200_MESSAGE
        else if(status == 401) msg = AUTH_FORM_401_MESSAGE
        else if(status == 500) msg = AUTH_FORM_500_MESSAGE
        return (
          <div className={"card " + ((status == 200) ? "success-color" : "danger-color")}>
            <div className="card-block">
              <span className="card-title">{status}</span>
              <span className="card-text">{msg}</span>
            </div>
          </div>
        )
    }
  }

  /**
   * Renders the login page for admins
   * @return {ReactElement} HTML Form for logging in.
   * <p>Uses {@link AUTH_FORM_USERNAME_PROMPT} and {@link AUTH_FORM_PASSWORD_PROMPT}</p>
   */
  render() {
    var valid = false
    if(this.state.username && this.state.password) { valid = true }
    return (
      <form>
        <div className="row">
          <div className="col-xs-6">
            <div className="row">
              <div className="form-group col-xs-12">
                <label>{AUTH_FORM_USERNAME_PROMPT}</label>
                <input name="username" className="form-control" type="text" value={this.state.username} onChange={this.handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-xs-12">
                <label>{AUTH_FORM_PASSWORD_PROMPT}</label>
                <input name="password" className="form-control" type="password" value={this.state.password} onChange={this.handleChange} />
              </div>
            </div>
            <div className="row">
              <button type="button" disabled={!valid} className="btn btn-danger pull-right waves-effect" onClick={this.handleSubmit}>
                <span className="glyphicon glyphicon-lock"></span>Login
              </button>
            </div>
          </div>
          <div className="col-xs-6">
            {
              this.getStatus(this.props.status)
            }
          </div>
        </div>
      </form>
    )
  }
}
