import React from 'react'
import { validateEmail } from '../util.js'

import FormSelect from './formSelect.js'
import FormAutoFill from './formAutoFill.js'

export default class LadderAddUserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: -1,
      playerOne: {
        _id: "",
        champion: ""
      },
      playerTwo: {
        _id: "",
        champion: ""
      },
      winner: "",
      winCondition: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(e, path, value) {
    if(!path) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    else {
      var set_deep_value = (obj, path, value) => {
        for (var i=0, path=path.split('.'), len=path.length; i<len; i++) {
          if(i<len-1) {
            obj = obj[path[i]]
          }
          else {
            obj[path[i]] = value
          }
        }
      }
      var merge = Object.assign({}, this.state)
      set_deep_value(merge, path, value)
      this.setState(merge)
    }
  }

  handleClick(e) {
    e.preventDefault()
    this.setState({ status: 0 })
    var match = Object.assign({}, this.state)
    match.date = Date.now()
    this.props.onClick(match, (status) => {
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
    if(this.state.playerOne._id && this.state.playerTwo._id && this.state.winner && this.state.winCondition && this.state.playerOne.champion && this.state.playerTwo.champion) {
      valid = true
    }

    var form = (
      <form className="modal-form">
        <FormAutoFill label="Player 1" type="user" data={this.props.users} onChange={this.handleChange} path="playerOne._id" />
        <FormAutoFill label="Champion" type="champion" data={this.props.champions} onChange={this.handleChange} path="playerOne.champion"/>
        <hr className="spacer" />
        <FormAutoFill label="Player 2" type="user" data={this.props.users} onChange={this.handleChange} path="playerTwo._id" />
        <FormAutoFill label="Champion" type="champion" data={this.props.champions} onChange={this.handleChange} path="playerTwo.champion" />
        <hr className="spacer" />
        <FormSelect label="Winner" options={["Player 1", "Player 2"]} onChange={this.handleChange} path="winner" />
        <FormSelect label="Win Condition" options={["Creep Score", "First Blood", "First Tower"]} onChange={this.handleChange} path="winCondition"/>
        <button type="button" disabled={!valid} className="btn btn-danger waves-effect pull-right" onClick={this.handleClick}>
          Submit
        </button>
        <div className="clearfix"></div>
      </form>
    )

    switch(this.state.status) {
      case -1:
        return form
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
            { form }
          </div>
        )
    }
  }
}
