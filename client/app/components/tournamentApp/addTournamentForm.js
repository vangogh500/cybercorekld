import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

export default class LadderAddUserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: moment()
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
  }

  render() {
    var valid = false
    return (
      <form className="modal-form">
        <div className="form-group">
          <label>Name</label>
          <input name="name" type="text" className="form-control" onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label>Date</label>
          <DatePicker selected={this.state.date} />
        </div>
        <button type="button" disabled={!valid} className="btn btn-danger waves-effect pull-right" onClick={this.handleClick}>
          Submit
        </button>
        <div className="clearfix"></div>
      </form>
    )
  }
}
