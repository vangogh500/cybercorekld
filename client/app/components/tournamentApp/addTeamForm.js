import React from 'react'

import { validateURL } from '../../util.js'
import LoadingAnimation from '../loadingAnimation.js'
import AutoFillUser from '../autoFillUser.js'

export default class LadderAddUserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: -1,
      msg: 'This is a msg'
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
    const tournament = JSON.parse(JSON.stringify({
      date: this.state.date.toDate(),
      name: this.state.name,
      thumbnail: this.state.thumbnail ? this.state.thumbnail : undefined,
      banner: this.state.banner ? this.state.banner : undefined
    }))
    console.log(tournament)
    this.props.onSubmit(tournament, (status) => {
      console.log(status)
      switch(status) {
        case 200:
          this.setState({ msg: 'Success, tournament has been added!', status })
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
    console.log(this.props)
    const valid = false
    const form = (
      <form className="modal-form">
        <div className="form-group">
          <label>Name</label>
          <input name="name" type="text" className="form-control" onChange={this.handleChange} />
        </div>
        <AutoFillUser label="Top" data={this.props.users} />
        <AutoFillUser label="Jungle" data={this.props.users} onClick={this.handleChange} />
        <AutoFillUser label="Mid" data={this.props.users} onClick={this.handleChange} />
        <AutoFillUser label="ADC" data={this.props.users} onClick={this.handleChange} />
        <AutoFillUser label="Support" data={this.props.users} onClick={this.handleChange} />
        <button type="button" disabled={!valid} className="btn btn-danger waves-effect pull-right" onClick={this.handleClick}>
          Submit
        </button>
        <div className="clearfix"></div>
      </form>
    )
    const msg = (
      <div className={"card " + ((this.state.status === 200) ? "success-color" : "danger-color") }>
        <div className="card-block">
          <span className="card-title margin-right-10">{this.state.status + " "}</span>
          <span className="card-text">{this.state.msg}</span>
        </div>
      </div>
    )
    switch(this.state.status) {
      case -1:
        return form
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
