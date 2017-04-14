import React from 'react'
import Select from 'react-select'
import AutoFillChampion from './AutoFillChampion.js'
import AutoFillUser from './AutoFillUser.js'

export default class LadderAddUserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: -1,
      msg: "",
      player_one: {
        _user: "",
        champion: ""
      },
      player_two: {
        _user: "",
        champion: ""
      },
      winner: "",
      win_condition: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(path, value) {
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
    console.log(merge)
    this.setState(merge)
  }

  handleClick(e) {
    e.preventDefault()
    this.setState({ status: 0 })
    var match = Object.assign({}, this.state)
    delete match.msg
    delete match.status
    match.date = Date.now()
    this.props.onClick(match, (status) => {
      var msg = ''
      switch(status) {
        case 200:
          msg = 'The match has been successfully added!'
          break
        case 401:
          msg = 'Unauthorized'
        default:
          msg = 'Oops something went wrong!'
      }
      this.setState({
        msg: msg,
        status
      })
    })
  }

  render() {
    var valid = false
    if(this.state.player_one._user && this.state.player_two._user && this.state.winner && this.state.win_condition && this.state.player_one.champion && this.state.player_two.champion) {
      valid = true
    }

    var form = (
      <form className="modal-form">
        <AutoFillUser label="Player 1" path="player_one._user" data={this.props.users} onClick={this.handleChange} />
        <AutoFillChampion path="player_one.champion" data={this.props.champions} onClick={this.handleChange} />
        <hr className="spacer" />
        <AutoFillUser label="Player 2" path="player_two._user" data={this.props.users} onClick={this.handleChange} />
        <AutoFillChampion path="player_two.champion" data={this.props.champions} onClick={this.handleChange} />
        <hr className="spacer" />
        <div className="form-group">
          <label>Winner</label>
          <Select name="Winner" value={this.state.winner} onChange={(value) => this.handleChange('winner', value)} options={[{value: 'player_one', label: 'Player 1'}, {value: 'player_two', label: 'Player 2'}]} />
        </div>
        <div className="form-group">
          <label>Win Condition</label>
          <Select name="Win Condition" value={this.state.win_condition} onChange={(value) => this.handleChange('win_condition', value)} options={[{value: 'cs', label: 'Creep Score'}, {value: 'fb', label: 'First Blood'}, {value: 'ft', label: 'First Tower'}]} />
        </div>
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
      case 200:
        return (
          <div>
            <div className="card success-color">
              <div className="card-block">
                <span className="card-title">{this.state.status + " "}</span>
                <span className="card-text">{this.state.msg}</span>
              </div>
            </div>
            { form }
          </div>
        )
      default:
        return (
          <div>
            <div className="card danger-color">
              <div className="card-block">
                <span className="card-title">{this.state.status + " "}</span>
                <span className="card-text">{this.state.msg}</span>
              </div>
            </div>
            { form }
          </div>
        )
    }
  }
}
