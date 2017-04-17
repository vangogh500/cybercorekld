import React from 'react'
import { Link } from 'react-router'

export default class AuthHomePage extends React.Component {
  componentDidMount() {
    document.title = "CyberCore KLD - Home"
  }
  render() {
    return (
      <div className="container">
        <h3 className="text-center text-white">Admin Panel</h3>
        <div className="row">
          <div className="col-xs-4">
            <Link className="card" to='/auth/onevone/ladder'>
              <div className="card-block text-center black-nav-item hoverable">
                <h4 className="card-title">Ladders</h4>
                <h2><i className="fa fa-list" aria-hidden="true"></i></h2>
              </div>
            </Link>
          </div>
          <div className="col-xs-4">
            <a className="card">
              <Link className="card" to='/auth/tournaments'>
                <div className="card-block text-center black-nav-item hoverable">
                  <h4 className="card-title">Tournaments</h4>
                  <h2><i className="fa fa-trophy" aria-hidden="true"></i></h2>
                </div>
              </Link>
            </a>
          </div>
          <div className="col-xs-4">
            <a className="card">
              <div className="card-block text-center black-nav-item hoverable">
                <h4 className="card-title">Users</h4>
                <h2><i className="fa fa-user" aria-hidden="true"></i></h2>
              </div>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
