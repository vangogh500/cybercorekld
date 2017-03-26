import React from 'react'

export default class Navbar extends React.Component {
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
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
