import React from 'react'

export default class AuthForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    
  }

  render() {
    return (
      <form>
        <div className="row">
          <div className="col-xs-6">
            <div className="row">
              <div className="form-group col-xs-12">
                <label>Username</label>
                <input name="username" className="form-control" type="text" value={this.state.username} onChange={this.handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-xs-12">
                <label>Password</label>
                <input name="password" className="form-control" type="password" value={this.state.password} onChange={this.handleChange} />
              </div>
            </div>
            <div className="row">
              <button type="button" className="btn btn-danger pull-right waves-effect">
                <span className="glyphicon glyphicon-lock"></span>Login
              </button>
            </div>
          </div>
          <div className="col-xs-6">
          </div>
        </div>
      </form>
    )
  }
}
