import React from 'react'

import UserListItem from './userListItem.js'

/**
 * Users Listing
 * <p>Route: {@link USERS_HOME_URL}</p>
 * <p>Contains:
 * <ul style="list-style">
 *    <li> {@link UserListItem} </li>
 * </ul></p>
 */
export default class UsersListing extends React.Component {
  /**
   * Renders the users listing.
   * @return {ReactElement} Bootstrap list-group.
   */
  render() {
    return (
      <div>
        {UserListItem.header}
        <ul id="ladder" className="list list-group">
          {
            this.props.data.map((user, i) => {
              return (
                <UserListItem key={user.id} idx={i} user={user} />
              )
            })
          }
        </ul>
      </div>
    )
  }
}
