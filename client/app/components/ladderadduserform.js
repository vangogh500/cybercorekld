import React from 'react'

import { validateEmail } from '../res/util.js'

export default class LadderAddUserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      csm: '',
      ign: '',
      name: '',
      email: '',
      status: -1,
      msg: ''
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
    this.setState({ status: 0 })
    var user = Object.assign({}, this.state)
    delete user.msg
    delete user.status
    this.props.onClick(user, (status) => {
      var msg = ''
      switch(status) {
        case 200:
          msg = this.state.name + ' has been successfully added!'
          break
        case 401:
          msg = 'Unauthorized'
        default:
          msg = 'Oops something went wrong!'
      }
      this.setState({
        csm: '',
        ign: '',
        name: '',
        email: '',
        status,
        msg
      })
    })
  }

  render() {
    var valid = false
    if(this.state.csm && this.state.ign && this.state.name && validateEmail(this.state.email)) {
      valid = true
    }

    switch(this.state.status) {
      case -1:
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
            <button type="button" disabled={!valid} className="btn btn-danger waves-effect pull-right" onClick={this.handleClick}>
              Submit
            </button>
            <div className="clearfix"></div>
          </form>
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
        return (
          <div>
            <div className="card success-color">
              <div className="card-block">
                <span className="card-title">{this.state.status}</span>
                <span className="card-text">{this.state.msg}</span>
              </div>
            </div>
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
              <button type="button" disabled={!valid} className="btn btn-danger waves-effect pull-right" onClick={this.handleClick}>
                Submit
              </button>
              <div className="clearfix"></div>
            </form>
          </div>
        )
    }


  }
}
