import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import { validateURL } from '../../res/util.js'
import LoadingAnimation from '../loadingAnimation.js'

import 'react-datepicker/dist/react-datepicker.css'

export default class LadderAddUserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: -1,
      rightNow: moment(),
      date: moment(),
      name: '',
      fcbk: '',
      stream: '',
      thumbnail: '',
      banner: '',
      msg: 'This is a msg'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(e) {
    if(e instanceof moment) {
      this.setState({
        date: e
      })
    }
    else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handleClick(e) {
    e.preventDefault()
    const tournament = JSON.parse(JSON.stringify({
      date: this.state.date.format('YYYY-MM-DD'),
      name: this.state.name,
      thumbnail: this.state.thumbnail ? this.state.thumbnail : undefined,
      banner: this.state.banner ? this.state.banner : undefined,
      fcbk: this.state.fcbk ? this.state.fcbk : undefined,
      stream: this.state.stream ? this.state.stream : undefined
    }))
    console.log(tournament)
    this.props.onSubmit(tournament, (status) => {
      console.log(status)
      switch(status) {
        case 200:
          this.setState({ msg: 'Success, tournament has been added!', status })
          break
        case 401:
          this.setState({ msg: 'Unauthorized.', status })
          break
        default:
          this.setState({ msg: 'Oops! Something went wrong.', state })
      }
    })
  }

  render() {
    const valid = (this.state.name && (this.state.date.diff(this.state.rightNow) >= 0) && (!this.state.thumbnail || validateURL(this.state.thumbnail)) && (!this.state.banner) || validateURL(this.state.banner))
    const form = (
      <form className="modal-form">
        <div className="form-group">
          <label>Name</label>
          <input name="name" type="text" className="form-control" onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label>Facebook</label>
          <input name="fcbk" type="text" className="form-control" onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label>Stream</label>
          <input name="stream" type="text" className="form-control" onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label>Date</label>
          <DatePicker className="form-control" selected={this.state.date} onChange={this.handleChange} dateFormat="DD/MM/YY" />
        </div>
        <div className="form-group">
          <label>Thumbnail URL</label>
          <p className="text-lightgrey">120x50 px</p>
          <input name="thumbnail" type="text" className="form-control" onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label>Banner URL</label>
          <input name="banner" type="text" className="form-control" onChange={this.handleChange} />
        </div>
        <button type="button" disabled={!valid} className="btn btn-danger waves-effect pull-right" onClick={this.handleClick}>
          Submit
        </button>
        <div className="clearfix"></div>
      </form>
    )
    const msg = (
      <div className={"card " + ((this.state.status === 200) ? "success-color" : "danger-color") }>
        <div className="card-block">
          <span className="card-title margin-right-10">{this.state.status + " "}</span>
          <span className="card-text">{this.state.msg}</span>
        </div>
      </div>
    )
    switch(this.state.status) {
      case -1:
        return form
      case 0:
        return <LoadingAnimation />
      default:
        return (
          <div>
            {msg}
            {form}
          </div>
        )
    }
  }
}
