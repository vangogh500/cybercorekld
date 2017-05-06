import React from 'react'
import LoadingAnimation from '../../res/components/loadingAnimation.js'

import { FORM_OPTIONAL_PROMPT } from '../../res/strings.js'
import {MODAL_USER_FORM_CSM, MODAL_USER_FORM_LOL_NAME, MODAL_USER_FORM_EMAIL, MODAL_USER_FORM_NAME, MODAL_USER_FORM_200_MESSAGE, MODAL_USER_FORM_401_MESSAGE, MODAL_USER_FORM_500_MESSAGE} from '../res/strings.js'
import { validateEmail } from '../../res/util.js'
import { STATUS_REQUEST, STATUS_SUCCESS, STATUS_PREREQUEST } from '../../res/numbers.js'

import { createForm } from '../../res/hocs.js'

/**
 * Modal form to add users
 */
class ModalUserForm extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props)
    this.handleStatus = this.handleStatus.bind(this)
    this.renderForm = this.renderForm.bind(this)
  }

  /**
   * initialState
   * @property {String} csm="" username
   * @property {String} lolname="" password
   * @property {String} email="" email
   * @property {String} name="" name
   * @property {Number} state=STATUS_PREREQUEST Status of the form.
   */
  static get initialState() {
    return {
      csm: "",
      lolname: "",
      email: "",
      name: ""
    }
  }

  /**
   * Validator for the form
   * @param {String} csm Required
   * @param {String} email Optional but must be in valid syntax
   * @return {Boolean} True if form is ready to be submitted
   */
  validate(state) {
    return (state.csm && (!state.email || validateEmail(state.email)))
  }

  /**
   * Renders the modal form
   * @return {ReactElement} Modal form
   */
  renderForm() {
    return (
      <form className="modal-form">
        <div className="form-group">
          <label>{MODAL_USER_FORM_CSM}</label>
          <input name="csm" type="text" className="form-control" onChange={this.props.handleChange} />
        </div>
        <div className="form-group">
          <label>{MODAL_USER_FORM_LOL_NAME} <span className="text-lightgrey">{FORM_OPTIONAL_PROMPT}</span></label>
          <input name="lolname" type="text" className="form-control" onChange={this.props.handleChange} />
        </div>
        <div className="form-group">
          <label>{MODAL_USER_FORM_NAME} <span className="text-lightgrey">{FORM_OPTIONAL_PROMPT}</span></label>
          <input name="name" type="text" className="form-control" onChange={this.props.handleChange} />
        </div>
        <div className="form-group">
          <label>{MODAL_USER_FORM_EMAIL} <span className="text-lightgrey">{FORM_OPTIONAL_PROMPT}</span></label>
          <input name="email" type="text" className="form-control" onChange={this.props.handleChange} />
        </div>
        <button type="button" disabled={!this.props.valid} className="btn btn-danger waves-effect pull-right" onClick={this.props.handleSubmit}>
          Submit
        </button>
        <div className="clearfix"></div>
      </form>
    )
  }

  /**
   * Handles the status to render the component
   * @param {Number} status Status of the form
   * @return {ReactElement} Modal form and appropriate message
   */
  handleStatus(status) {
    switch(status) {
      case STATUS_PREREQUEST:
        return this.renderForm()
      case STATUS_REQUEST:
        return (
          <div className="center-container">
            <LoadingAnimation />
          </div>
        )
      default:
        var msg = ""
        if(status == STATUS_SUCCESS) msg = MODAL_USER_FORM_200_MESSAGE
        else if(status == 401) msg = MODAL_USER_FORM_401_MESSAGE
        else if(status == 500) msg = MODAL_USER_FORM_500_MESSAGE
        return (
          <div>
            <div className={"card " + ((status == 200) ? "success-color" : "danger-color")}>
              <div className="card-block">
                <span className="card-title margin-right-10">{status}</span>
                <span className="card-text">{msg}</span>
              </div>
            </div>
            {this.renderForm()}
          </div>
        )
    }
  }

  /**
   * Renders the modal form
   * @return {ReactElement} Modal form
   */
  render() {
    return this.handleStatus(this.props.status)
  }
}

export default createForm(ModalUserForm)
