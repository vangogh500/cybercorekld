import React from 'react'

import Tournaments from './components/tournamentApp/tournaments.js'
import ModalButton from './components/modalbutton.js'
import AddTournamentForm from './components/tournamentApp/AddTournamentForm.js'

export default class TournamentPage extends React.Component {
  render() {
    return (
      <div>
        <div className="col-xs-8">
          <div className="container-fluid">
            <div className="panel panel-default dark-red">
              <div className="panel-heading text-center"><h4>Tournaments</h4></div>
            </div>
            <Tournaments />
          </div>
        </div>
        <ModalButton label={(<span>
            <span className="glyphicon glyphicon-plus"></span>Add Tournament
          </span>)}>
          <div className="modal-content">
            <div className="modal-header">
              <h4>Add Tournament</h4>
            </div>
            <div className="modal-body">
              <AddTournamentForm />
            </div>
          </div>
        </ModalButton>
      </div>
    )
  }
}
