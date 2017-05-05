import React from 'react'

import TournamentsSync from './containers/tournamentApp/tournamentsSync.js'
import ModalButton from './res/components/modalbutton.js'
import AddTournamentFormSync from './containers/tournamentApp/addTournamentFormSync.js'

export default class TournamentPage extends React.Component {
  render() {
    return (
      <div>
        <div className="col-xs-8">
          <div className="container-fluid">
            <div className="panel panel-default dark-red">
              <div className="panel-heading text-center"><h4>Tournaments</h4></div>
            </div>
            <TournamentsSync />
          </div>
        </div>
        <ModalButton label={(<span>
            <span className="glyphicon glyphicon-plus"></span><i className="fa fa-calendar-o"></i>
          </span>)}>
          <div className="modal-content">
            <div className="modal-header">
              <h4>Add Tournament</h4>
            </div>
            <div className="modal-body">
              <AddTournamentFormSync />
            </div>
          </div>
        </ModalButton>
      </div>
    )
  }
}
