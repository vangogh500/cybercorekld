import React from 'react'

import ModalAddUserButton from './ModalAddUserButton.js'
import { USER_LISTING_HEADER } from '../res/strings.js'

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
      <div>
        <div className="col-xs-8">
          <div className="container-fluid">
            <div className="panel panel-default dark-red">
              <div className="panel-heading text-center"><h4>{USER_LISTING_HEADER}</h4></div>
            </div>
            <UsersListing />
          </div>
        </div>
        <ModalAddUserButton />
      </div>
    )
  }
}
