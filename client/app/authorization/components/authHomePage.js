import React from 'react'
import { Link } from 'react-router'
import { AUTH_HOME_TITLE } from '../res/strings.js'
import { AUTH_URL, LADDERS_HOME_URL, TOURNAMENTS_HOME_URL, USERS_HOME_URL, USERS_LABEL, TOURNAMENTS_LABEL, LADDERS_LABEL } from '../../res/strings.js'
import { withAuth } from '../hocs.js'

/**
 * Authorization Home Page
 * <p>Route: {@link AUTH_HOME_URL}</p>
 */
class AuthHomePage extends React.Component {
  /**
   * Set's the page title to {@link AUTH_HOME_TITLE}
   */
  componentDidMount() {
    document.title = AUTH_HOME_TITLE
  }
  /**
   * Renders the home page for admins
   * @return {ReactElement} HTML Nav with 3 links
   */
  render() {
    return (
      <div className="container">
        <h3 className="text-center text-white">Admin Panel</h3>
        <div className="row">
          <div className="col-xs-4">
            <Link className="card" to={AUTH_URL + LADDERS_HOME_URL}>
              <div className="card-block text-center black-nav-item hoverable">
                <h4 className="card-title">{LADDERS_LABEL}</h4>
                <h2><i className="fa fa-list" aria-hidden="true"></i></h2>
              </div>
            </Link>
          </div>
          <div className="col-xs-4">
            <Link className="card" to={AUTH_URL + TOURNAMENTS_HOME_URL}>
              <div className="card-block text-center black-nav-item hoverable">
                <h4 className="card-title">{TOURNAMENTS_LABEL}</h4>
                <h2><i className="fa fa-trophy" aria-hidden="true"></i></h2>
              </div>
            </Link>
          </div>
          <div className="col-xs-4">
            <Link className="card" to={AUTH_URL + USERS_HOME_URL}>
              <div className="card-block text-center black-nav-item hoverable">
                <h4 className="card-title">{USERS_LABEL}</h4>
                <h2><i className="fa fa-user" aria-hidden="true"></i></h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(AuthHomePage)
