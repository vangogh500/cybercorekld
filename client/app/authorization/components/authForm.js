import React from 'react'
import { browserHistory } from 'react-router'
import { AUTH_HOME_URL, AUTH_FORM_USERNAME_PROMPT, AUTH_FORM_PASSWORD_PROMPT, AUTH_FORM_200_MESSAGE, AUTH_FORM_401_MESSAGE, AUTH_FORM_500_MESSAGE, LOGIN_BUTTON_LABEL } from '../../res/strings.js'
import { STATUS_REQUEST, STATUS_SUCCESS, STATUS_PREREQUEST } from '../../res/numbers.js'
import LoadingAnimation from '../../res/components/loadingAnimation.js'

/**
 * Authorization Login Form
 * <p>Route: {@link AUTH_LOGIN_URL}</p>
 */
export default class AuthForm extends React.Component {
  /**
   * propTypes
   * @property {Number} status Status of the login request
   */
  static get propTypes() {
    return {
      status: React.PropTypes.number
    }
  }

  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props)
    /**
     * @type {Object}
     * @property {string} username="" username
     * @property {string} password="" password
     */
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  /**
   * Handles prop change
   * @param {Object} nextProps Next props
   * @emits {Redirect} Redirects if {@link STATUS_SUCCESS}
   */
  componentWillReceiveProps(nextProps) {
    if(nextProps.status == STATUS_SUCCESS) {
      browserHistory.push(AUTH_HOME_URL)
    }
  }

  /**
   * Handles the mount event
   * @emits {Redirect} Redirects if {@link STATUS_SUCCESS}
   */
  componentWillMount() {
    if(this.props.status == STATUS_SUCCESS) {
      browserHistory.push(AUTH_HOME_URL)
    }
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
    this.props.onSubmit(this.state.username, this.state.password)
  }

  /**
   * Returns if the form is valid
   * @param {String} username
   * @param {String} password
   * @return {Boolean} A boolean stating if the form is valid or not
   */
  isValid(username, password) {
    return (username && password)
  }

  /**
   * Renders the status of the login request (rendered on the right half)
   * @param {Number} status status of the login request
   * @return {ReactElement} A spinner or a card message depending on the status of the login request.
   * <ul style="list-style">
   *    <li> Nothing at {@link STATUS_PREREQUEST} </li>
   *    <li> Spinner at {@link STATUS_REQUEST} </li>
   *    <li> Success msg at {@link STATUS_SUCCESS} </li>
   * </ul>
   * <p>Msgs: {@link AUTH_FORM_200_MESSAGE}, {@link AUTH_FORM_401_MESSAGE}, and {@link AUTH_FORM_500_MESSAGE}</p>
   */
  getStatus(status) {
    switch(status) {
      case STATUS_PREREQUEST:
        return <span></span>
      case STATUS_REQUEST:
        return (
          <div className="center-container">
            <LoadingAnimation className="md" />
          </div>
        )
      default:
        var msg = ""
        if(status == STATUS_SUCCESS) msg = AUTH_FORM_200_MESSAGE
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
    const valid = this.isValid(this.state.username, this.state.password)
    return (
      <form>
        <div className="row row-eq-height">
          <div className="col-xs-6 no-float">
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
                <span className="glyphicon glyphicon-lock"></span>{LOGIN_BUTTON_LABEL}
              </button>
            </div>
          </div>
          <div className="col-xs-6 no-float">
            {
              this.getStatus(this.props.status)
            }
          </div>
        </div>
      </form>
    )
  }
}
