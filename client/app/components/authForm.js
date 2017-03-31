import React from 'react'
import { browserHistory } from 'react-router'

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      password: '',
      msg: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleStatus = this.handleStatus.bind(this)
  }

  componentWillMount() {
    if(this.props.status == 200) {
      browserHistory.push('/auth/ladder')
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.status == 200) {
      browserHistory.push('/auth/ladder')
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    var creds = Object.assign({}, this.state)
    delete creds.msg

    this.props.onSubmit(creds)
  }

  handleStatus(status) {

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
        if(status == 200) msg = "Success! Redirecting..."
        else if(status == 401) msg = "Invalid login"
        else if(status == 500) msg = "Oops, something went wrong!"
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

  render() {
    var valid = false
    if(this.state.user && this.state.password) { valid = true }
    return (
      <form>
        <div className="row">
          <div className="col-xs-6">
            <div className="row">
              <div className="form-group col-xs-12">
                <label>Username</label>
                <input name="user" className="form-control" type="text" value={this.state.user} onChange={this.handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-xs-12">
                <label>Password</label>
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
              this.handleStatus(this.props.status)
            }
          </div>
        </div>
      </form>
    )
  }
}
