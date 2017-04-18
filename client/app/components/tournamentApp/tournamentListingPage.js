import React from 'react'
import AddTeamForm from './addTeamForm.js'
import ModalButton from '../modalbutton.js'

export default class TournamentListingPage extends React.Component {
  render() {
    return (
      <div>
        <div className="col-xs-8">
          <h3 className="text-white">May Dragon 2017</h3>
          <img className="banner" src="https://i.ytimg.com/vi/DLiNHCmJzV4/maxresdefault.jpg"/>
          <ul className="nav nav-tabs dark-red row row-fluid">
            <li className="col-xs-4 active"><a>Teams</a></li>
            <li className="col-xs-4"><a>Bracket</a></li>
          </ul>
        </div>
        <div className="col-xs-2">
          <ModalButton label={(<span>
              <span className="glyphicon glyphicon-plus"></span><i className="fa fa-users"></i>
            </span>)}>
            <div className="modal-content">
              <div className="modal-header">
                <h4>Add Team</h4>
              </div>
              <div className="modal-body">
                <AddTeamForm />
              </div>
            </div>
          </ModalButton>
        </div>
      </div>
    )
  }
}
