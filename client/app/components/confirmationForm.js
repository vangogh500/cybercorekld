import React from 'react'

export default class ConfirmationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: -1,
      value: "",
      msg: ""
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
    this.setState({ status: 0 })
    this.props.onConfirm(this.state.value, (status) => {
      var msg = ""
      switch(status) {
        case 200:
          msg = "Success! Redirecting..."
          break
        case 401:
          msg = "Invalid credentials"
          break
        default:
          msg = "Oops something went wrong!"
          break
      }
      console.log({ msg, status })
      this.setState({ msg, status })
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    var valid = (this.state.value !== "")
    var form = (
      <form className="modal-form">
        <div className="form-group">
          <label>Confirmation Code</label>
          <input name="value" type="password" value={this.state.value} className="form-control" onChange={this.handleChange} />
        </div>
        <button disabled={!valid} type="button" className="btn btn-danger waves-effect pull-right" onClick={this.handleClick}>
          Confirm
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
