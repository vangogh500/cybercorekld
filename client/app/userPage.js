import React from 'react'
import { browserHistory } from 'react-router'

import MatchListing from './components/matchListing.js'
import ModalButton from './components/modalbutton.js'
import ConfirmationForm from './components/confirmationForm.js'
import LoadingAnimation from './components/loadingAnimation.js'

export default class UserPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      name: "",
      csm: "",
      ign: "",
      email: ""
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleOnDelete = this.handleOnDelete.bind(this)
  }

  toggleEdit(e) {
    e.preventDefault()
    this.setState({
      edit: !this.state.edit,
      name: this.props.ladderEntry._user.name,
      csm: this.props.ladderEntry._user.csm,
      ign: this.props.ladderEntry._user.ign,
      email: this.props.ladderEntry._user.email
    })
  }

  handleOnDelete(password,cb) {
    this.props.onDelete(password, this.props.ladderEntry.id, (status) => {
      cb(status)
      if(status === 200) {
        browserHistory.push('/auth/onevone/ladder')
      }
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    if(this.props.status === 0) {
      return <LoadingAnimation />
    }
    if(this.props.status === 200) {
      var left = (
        <div>
          <p className="text-white"><b>CSM:</b></p>
          <p>{this.state.edit ? <input className="text-black width-100" name="csm" value={this.state.csm} onChange={this.handleChange}/> : this.props.ladderEntry._user.csm}</p>
          <p className="text-white"><b>IGN:</b></p>
          <p>{this.state.edit ? <input className="text-black width-100" name="ign" value={this.state.ign} onChange={this.handleChange}/> : this.props.ladderEntry._user.ign}</p>
          <p className="text-white"><b>Email:</b></p>
          <p>{this.state.edit ? <input className="text-black width-100" name="email" value={this.state.email} onChange={this.handleChange}/> : this.props.ladderEntry._user.email}</p>
        </div>
      )
      var bottomLeft = this.state.edit ? (
        <div id="user-bottom-left" className="panel panel-default">
          <div className="panel-body">
            <ModalButton label={(<span className="fa fa-trash-o"></span>)} className="width-auto">
              <div className="modal-content">
                <div className="modal-header">
                  <h4>Are you sure you want to delete this user?</h4>
                </div>
                <div className="modal-body">
                  <ConfirmationForm onConfirm={this.handleOnDelete} />
                </div>
              </div>
            </ModalButton>
            <button type="button" className="btn waves-effect btn-danger width-auto"><span className="fa fa-floppy-o"></span></button>
          </div>
        </div>
      ) : <div></div>
      var body = (
        <ul id="matches" className="list list-group">
          {this.props.ladderEntry.matches.map((match) => {
            return (
              <MatchListing key={match.id} match={match} users={this.props.users} champions={this.props.champions} />
            )
          })}
        </ul>
      )
      return (
        <div className="container">
          <div className="row">
            <div id="user-title" className="panel panel-default">
              <div className="panel-heading clearfix">
                <img className="ladder-icon pull-left" src="http://ddragon.leagueoflegends.com/cdn/7.5.1/img/profileicon/23.png" />
                <h4 className="line-height-30 pull-left">{this.state.edit ? <input className="text-black" name="name" value={this.state.name} onChange={this.handleChange}/> : this.props.ladderEntry._user.name}</h4>
                <button type="button" className={"btn waves-effect pull-right " + (this.state.edit ? "btn-elegant" : "btn-danger")} onClick={this.toggleEdit}>
                  <span className={"fa " + (this.state.edit ? "fa-undo" : "fa-pencil")}></span>
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-3">
              <div id="user-left" className="panel panel-default">
                <div className="panel-body">
                  {left}
                </div>
              </div>
              {bottomLeft}
            </div>
            <div className="col-xs-8">
              <div id="user-body" className="panel panel-default">
                <div className="panel-heading text-center"><h4 className="text-white"><b>Match History</b></h4></div>
                  {body}
              </div>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div></div>
      )
    }
  }
}
