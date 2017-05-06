import React from 'react'
import { USER_LISTING_HEADER } from '../res/strings.js'

/**
 * User List Item
 * List item for {@link UsersListing}
 */
export default class UserListItem extends React.Component {
  /**
   * propTypes
   * @property {Number} idx Index of the list item
   * @property {Object} user User to display list item for
   */
  static get propTypes() {
    return {
      idx: React.PropTypes.number,
      user: React.PropTypes.object,
    }
  }

  /**
   * header
   * @type {ReactElement} Header for the User List Item
   */
  static get header() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading text-center dark-red text-white"><h4>{USER_LISTING_HEADER}</h4></div>
        <div className="panel-body dark-red text-white">
          <div className="row">
            <div className="col-xs-1">
            </div>
            <div className="col-xs-4">
              CSM
            </div>
            <div className="col-xs-3">
              Name
            </div>
            <div className="col-xs-2">
              Email
            </div>
          </div>
        </div>
      </div>
    )
  }

  /**
   * Renders list item for the user.
   * @return {ReactElement} Bootstrap list-item
   */
  render() {
    return (
      <a>
        <li className="list-group-item">
          <div className="row">
            <div className="col-xs-1">
              {(this.props.idx + 1) + "."}
            </div>
            <div className="col-xs-4">
              <img className="ladder-icon margin-right-10" src="http://ddragon.leagueoflegends.com/cdn/7.5.1/img/profileicon/23.png" />
              <span>{this.props.user.csm}</span>
            </div>
            <div className="col-xs-3">
              {this.props.user.name}
            </div>
            <div className="col-xs-2">
              {this.props.user.email}
            </div>
          </div>
        </li>
      </a>
    )
  }
}
