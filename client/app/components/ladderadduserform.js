import React from 'react'

import { validateEmail } from '../util.js'

export default class LadderAddUserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      csm: "",
      ign: "",
      name: "",
      email: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    var valid = false
    if(this.state.csm && this.state.ign && this.state.name && validateEmail(this.state.email)) {
      valid = true
    }

    return (
      <form className="modal-form">
        <div className="form-group">
          <label>CSM</label>
          <input name="csm" type="text" className="form-control" onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label>IGN</label>
          <input name="ign" type="text" className="form-control" onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input name="name" type="text" className="form-control" onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input name="email" type="text" className="form-control" onChange={this.handleChange} />
        </div>
        <button type="button" className={"btn btn-danger waves-effect pull-right " + (valid ? "" : "disabled")}>
          <span className="glyphicon glyphicon-lock"></span>Login
        </button>
        <div className="clearfix"></div>
      </form>
    )
  }
}
