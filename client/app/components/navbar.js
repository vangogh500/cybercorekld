import React from 'react'
import { browserHistory } from 'react-router'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    e.preventDefault()
    this.props.onLogout()
    browserHistory.push('/auth')
  }
  render() {
    return (
      <div>
        <nav id="main-nav" className="navbar">
          <div className="container">
            <div className="navbar-header">
              <a id="nav-title" className="navbar-brand">
                <span><img id="logo" src="/img/logo.png" />CyberCore KLD</span>
              </a>
            </div>
            {
              this.props.status == 200 ?
                (<ul className="nav navbar-nav pull-right">
                  <li>
                    <span className="glyphicon glyphicon-user"></span>{this.props.user}
                  </li>
                  <li>
                    <button type="button" className="btn btn-danger waves-effect" onClick={this.handleClick}>
                      Logout
                    </button>
                  </li>
                </ul>) : (<span></span>)
            }
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
