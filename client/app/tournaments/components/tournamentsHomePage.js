import React from 'react'

import TournamentList from '../containers/subscribedTournamentListSync.js'
import ModalAddTournamentButton from './modalAddTournamentButton.js'

export default class TournamentsHomePage extends React.Component {
  render() {
    return (
      <div>
        <div className="col-xs-8">
          <div className="container-fluid">
            <TournamentList />
          </div>
        </div>
        <ModalAddTournamentButton />
      </div>
    )
  }
}
