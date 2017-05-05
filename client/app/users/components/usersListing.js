import React from 'react'

/**
 * Users Listing
 * <p>Route: {@link USERS_HOME_URL}</p>
 * <p>Contains:
 * <ul style="list-style">
 *    <li> {@link AuthForm} </li>
 * </ul></p>
 */
export default class UsersListing extends React.Component {
  /**
   * Renders the users listing.
   * @return {ReactElement} Bootstrap list-group.
   */
  render() {
    return (
      <ul id="ladder" className="list list-group">
        {
          this.props.data.map((user, idx) => {
            return (
              <a>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-xs-1">
                      {idx + "."}
                    </div>
                    <div className="col-xs-4">
                      <img className="ladder-icon margin-right-10" src="http://ddragon.leagueoflegends.com/cdn/7.5.1/img/profileicon/23.png" />
                      <span>{user.csm}</span>
                    </div>
                    <div className="col-xs-3">
                      {user.name}
                    </div>
                    <div className="col-xs-2">
                      1 day left
                    </div>
                    <div className="col-xs-2">
                      {user.email}
                    </div>
                  </div>
                </li>
              </a>
            )
          })
        }
      </ul>
    )
  }
}
