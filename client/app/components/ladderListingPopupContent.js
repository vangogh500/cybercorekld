import React from 'react'
import EditUserForm from './editUserForm.js'

export default class LadderListingPopupContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
    this.setState({
      edit: !this.state.edit
    })
  }

  render() {
    var body
    if(this.state.edit) {
      body = (<div className="modal-body">
        <EditUserForm csm={this.props.csm} summonerName={this.props.summonerName} name={this.props.name} email={this.props.email} />
      </div>)
    }
    else {
      body = (<div className="modal-body">
        <div className="container">
          <p><span className="profile-label">CSM: </span>{this.props.csm}</p>
          <p><span className="profile-label">IGN: </span>{this.props.summonerName}</p>
          <p><span className="profile-label">Name: </span>{this.props.name}</p>
          <p><span className="profile-label">Email: </span>{this.props.email}</p>
        </div>
      </div>)
    }
    return (
      <div className="modal-content">
        <div className="modal-header">
          <img className="ladder-icon pull-left" src="http://ddragon.leagueoflegends.com/cdn/7.5.1/img/profileicon/23.png" />
          <h4 className="line-height-30 pull-left">{this.props.name}</h4>
          <button type="button" className={"btn waves-effect pull-right " + (this.state.edit ? "" : "btn-danger")} onClick={this.handleClick}>
            <span className={"fa " + (this.state.edit ? "fa-undo" : "fa-pencil")}></span>
          </button>
        </div>
        {body}
      </div>
    )
  }
}
