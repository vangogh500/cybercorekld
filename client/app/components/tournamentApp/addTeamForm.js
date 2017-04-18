import React from 'react'

import { validateURL } from '../../util.js'
import LoadingAnimation from '../loadingAnimation.js'
import AutoFillUser from '../autoFillUser.js'

const STATUS_AWAIT = -1
const STATUS_INVALID = -3

export default class LadderAddUserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: -3,
      msg: 'Fields missing',
      name: '',
      top: '',
      jg: '',
      mid: '',
      adc: '',
      supp: '',
      sub_1: '',
      sub_2: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      var msg
      var status
      if(!this.state.top || !this.state.name || !this.state.jg || !this.state.mid || !this.state.adc || !this.state.supp) {
        msg = 'Fields missing'
        status = STATUS_INVALID
      }
      else if(new Set([this.state.top, this.state.jg, this.state.mid, this.state.adc, this.state.supp]).size !== 5) {
        msg = 'There cannot be any duplicate users on a team'
        status = STATUS_INVALID
      }
      else {
        msg = ''
        status = STATUS_AWAIT
      }
      this.setState({ ...this.state, status: status, msg: msg })
    })
  }

  handleClick(e) {
    e.preventDefault()
    const team = JSON.parse(JSON.stringify({
      name: this.state.name,
      roster: {
        top: this.state.top,
        jg: this.state.jg,
        mid: this.state.mid,
        adc: this.state.adc,
        supp: this.state.supp,
        sub_1: this.state.sub_1,
        sub_2: this.state.sub_2
      }
    }))
    this.props.onSubmit(team, (status) => {
      switch(status) {
        case 200:
          this.setState({ msg: 'Success, team has been added!', status })
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
    const form = (
      <form className="modal-form">
        <div className="form-group">
          <label>Name</label>
          <input name="name" type="text" className="form-control" onChange={this.handleChange} />
        </div>
        <hr className="spacer" />
        <h4 className="text-center"><u>Roster</u></h4>
        <AutoFillUser name="top" label="Top" data={this.props.users} onChange={this.handleChange} />
        <AutoFillUser name="jg" label="Jungle" data={this.props.users} onChange={this.handleChange} />
        <AutoFillUser name="mid" label="Mid" data={this.props.users} onChange={this.handleChange} />
        <AutoFillUser name="adc" label="ADC" data={this.props.users} onChange={this.handleChange} />
        <AutoFillUser name="supp" label="Support" data={this.props.users} onChange={this.handleChange} />
        <h5 className="text-center"><i>Optional</i></h5>
        <AutoFillUser name="sub_1" label="Sub 1" data={this.props.users} onChange={this.handleChange} />
        <AutoFillUser name="sub_2" label="Sub 2" data={this.props.users} onChange={this.handleChange} />
        <button type="button" disabled={this.state.status === 0} className="btn btn-danger waves-effect pull-right" onClick={this.handleClick}>
          Submit
        </button>
        <div className="clearfix"></div>
      </form>
    )
    const msg = (
      <div className={"card " + ((this.state.status === 200) ? "success-color" : "danger-color") }>
        <div className="card-block">
          { (this.state.status > 0) ? <span className="card-title margin-right-10">{this.state.status + " "}</span> : <span></span>}
          <span className="card-text">{this.state.msg}</span>
        </div>
      </div>
    )
    switch(this.state.status) {
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
