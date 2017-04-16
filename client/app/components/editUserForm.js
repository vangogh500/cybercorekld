import React from 'react'

export default class EditUserForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      csm: props.csm,
      summonerName: props.summonerName,
      name: props.name,
      email: props.email
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <p><span className="profile-label">CSM: </span><input name="csm" value={this.state.csm} onChange={this.handleChange}/></p>
        <p><span className="profile-label">IGN: </span><input name="summonerName" value={this.state.summonerName} onChange={this.handleChange}/></p>
        <p><span className="profile-label">Name: </span><input name="name" value={this.state.name} onChange={this.handleChange}/></p>
        <p><span className="profile-label">Email: </span><input name="email" value={this.state.email} onChange={this.handleChange}/></p>
        <button type="button" className="btn waves-effect pull-left btn-danger"><span className="fa fa-trash-o"></span></button>
        <button type="button" className="btn waves-effect pull-right btn-danger">Save</button>
      </div>
    )
  }
}
