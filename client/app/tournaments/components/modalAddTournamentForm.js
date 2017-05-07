import React from 'react'
import moment from 'moment'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import LoadingAnimation from '../../res/components/loadingAnimation.js'

import { emulateSyntheticEvent, validateURL } from '../../res/util.js'
import { FORM_OPTIONAL_PROMPT } from '../../res/strings.js'
import { MODAL_ADD_TOURNAMENT_200_MESSAGE, MODAL_ADD_TOURNAMENT_401_MESSAGE, MODAL_ADD_TOURNAMENT_500_MESSAGE,
  MODAL_ADD_TOURNAMENT_STATUS_TYPES, MODAL_ADD_TOURNAMENT_TYPE_TYPES,
  MODAL_ADD_TOURNAMENT_GAME_TYPES, MODAL_ADD_TOURNAMENT_NAME, MODAL_ADD_TOURNAMENT_DATE, MODAL_ADD_TOURNAMENT_GAME, MODAL_ADD_TOURNAMENT_TYPE,
  MODAL_ADD_TOURNAMENT_STATUS, MODAL_ADD_TOURNAMENT_FACEBOOK, MODAL_ADD_TOURNAMENT_STREAM, MODAL_ADD_TOURNAMENT_GALLERY, MODAL_ADD_TOURNAMENT_BANNER,
  MODAL_ADD_TOURNAMENT_THUMBNAIL} from '../res/strings.js'
import { validateEmail } from '../../res/util.js'
import { STATUS_REQUEST, STATUS_SUCCESS, STATUS_PREREQUEST } from '../../res/numbers.js'

import { createForm } from '../../res/hocs.js'

/**
 * Modal form to add tournament
 */
class ModalAddTournamentForm extends React.Component {
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
   * @property {String} name="" name
   * @property {Moment} date=moment() date
   * @property {String} game="" game
   * @property {String} type="" type
   * @property {String} [tournamentStatus=""] Tournament status
   * @property {String} [facebook=""] Facebook link
   * @property {String} [stream=""] Stream link
   * @property {String} [gallery=""] Gallery link
   * @property {String} [thumbnail=""] Thumbnail Link
   * @property {String} [banner=""] Banner link
   */
  static get initialState() {
    return {
      name: "",
      date: moment(),
      game: "",
      type: "",
      tournamentStatus: "",
      facebook: "",
      stream: "",
      gallery: "",
      banner: ""
    }
  }

  /**
   * Validator for the form
   * @return {Boolean} True if form is ready to be submitted
   */
  validate(state) {
    return (
      state.name && state.date && state.game && state.type &&
      (!state.facebook || validateURL(state.facebook)) &&
      (!state.stream || validateURL(state.stream)) &&
      (!state.gallery || validateURL(state.gallery)) &&
      (!state.banner || validateURL(state.banner))
    )
  }

  /**
   * Renders the modal form
   * @return {ReactElement} Modal form
   */
  renderForm() {
    return (
      <form className="modal-form">
        <div className="form-group">
          <label>{MODAL_ADD_TOURNAMENT_NAME}</label>
          <input name="name" type="text" className="form-control" onChange={this.props.handleChange} />
        </div>
        <div className="form-group">
          <label>{MODAL_ADD_TOURNAMENT_DATE}</label>
          <DatePicker className="form-control" selected={this.props.formData.date} onChange={(picked) => this.props.handleChange(emulateSyntheticEvent(picked, "date"))} dateFormat="DD/MM/YY" />
        </div>
        <div className="form-group">
          <label>{MODAL_ADD_TOURNAMENT_GAME}</label>
          <Select value={this.props.formData.game} onChange={(value) => this.props.handleChange(emulateSyntheticEvent(value, "game"))} options={MODAL_ADD_TOURNAMENT_GAME_TYPES} />
        </div>
        <div className="form-group">
          <label>{MODAL_ADD_TOURNAMENT_TYPE}</label>
          <Select value={this.props.formData.type} onChange={(value) => this.props.handleChange(emulateSyntheticEvent(value, "type"))} options={MODAL_ADD_TOURNAMENT_TYPE_TYPES} />
        </div>
        <div className="form-group">
          <label>{MODAL_ADD_TOURNAMENT_STATUS} <span className="text-lightgrey">{FORM_OPTIONAL_PROMPT}</span></label>
          <Select value={this.props.formData.tournamentStatus} onChange={(value) => this.props.handleChange(emulateSyntheticEvent(value, "tournamentStatus"))} options={MODAL_ADD_TOURNAMENT_STATUS_TYPES} />
        </div>
        <hr className="spacer" />
        <h4 className="text-center"><u>Images</u></h4>
        <div className="form-group">
          <label>{MODAL_ADD_TOURNAMENT_BANNER} <span className="text-lightgrey">{FORM_OPTIONAL_PROMPT}</span></label>
          <input name="banner" type="text" className="form-control" onChange={this.props.handleChange} />
        </div>
        <hr className="spacer" />
        <h4 className="text-center"><u>Links</u></h4>
        <div className="form-group">
          <label>{MODAL_ADD_TOURNAMENT_FACEBOOK} <span className="text-lightgrey">{FORM_OPTIONAL_PROMPT}</span></label>
          <input name="facebook" type="text" className="form-control" onChange={this.props.handleChange} />
        </div>
        <div className="form-group">
          <label>{MODAL_ADD_TOURNAMENT_STREAM} <span className="text-lightgrey">{FORM_OPTIONAL_PROMPT}</span></label>
          <input name="stream" type="text" className="form-control" onChange={this.props.handleChange} />
        </div>
        <div className="form-group">
          <label>{MODAL_ADD_TOURNAMENT_GALLERY} <span className="text-lightgrey">{FORM_OPTIONAL_PROMPT}</span></label>
          <input name="gallery" type="text" className="form-control" onChange={this.props.handleChange} />
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
        if(status == STATUS_SUCCESS) msg = MODAL_ADD_TOURNAMENT_200_MESSAGE
        else if(status == 401) msg = MODAL_ADD_TOURNAMENT_401_MESSAGE
        else if(status == 500) msg = MODAL_ADD_TOURNAMENT_500_MESSAGE
        return (
          <div>
            <div className={"card " + ((status == STATUS_SUCCESS) ? "success-color" : "danger-color")}>
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

export default createForm(ModalAddTournamentForm)
