import React from 'react'
import { validateEmail } from '../util.js'

import FormSelect from './formSelect.js'
import FormAutoFill from './formAutoFill.js'

export default class LadderAddUserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: -1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
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
    console.log(user)
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
    console.log(this.props.users)
    var valid = false
    if(this.state.csm && this.state.ign && this.state.name && validateEmail(this.state.email)) {
      valid = true
    }

    var form = (
      <form className="modal-form">
        <FormAutoFill label="Player 1" type="text"/>
        <div className="form-group">
          <label>Champion</label>
          <input type="text" className="form-control" />
        </div>
        <hr className="spacer" />
        <div className="form-group">
          <label>Player 2</label>
          <input name="ign" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label>Champion</label>
          <input type="text" className="form-control" />
        </div>
        <hr className="spacer" />
        <FormSelect label="Winner" options={["Player 1", "Player 2"]} />
        <FormSelect label="Win Condition" options={["Creep Score", "First Blood", "First Tower"]}/>
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
