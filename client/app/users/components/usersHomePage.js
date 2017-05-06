import React from 'react'

import ModalAddUserButton from './ModalAddUserButton.js'
import UsersListing from '../containers/subscribedUsersListingSync.js'

/**
 * Users Home Page
 * <p>Route: {@link USERS_HOME_URL}</p>
 * <p>Contains:
 * <ul style="list-style">
 *    <li> {@link AuthForm} </li>
 * </ul></p>
 */
export default class UsersHomePage extends React.Component {
  /**
   * Renders the users home page.
   * @return {ReactElement} HTML for the users home page.
   */
  render() {
    return (
      <div className="row">
        <div className="col-xs-2">
        </div>
        <div className="col-xs-8">
          <div className="container-fluid">
            <UsersListing />
          </div>
        </div>
        <div className="col-xs-2">
          <ModalAddUserButton />
        </div>
      </div>
    )
  }
}
