import React from 'react'

import ModalButton from './res/components/modalbutton.js'
import LadderAddMatchFormSync from './containers/addmatchformsync.js'
import MatchesSync from './containers/matchesSync.js'

export default class MatchesPage extends React.Component {
  render() {
    return (
      <div>
        <div className="col-xs-8">
          <div className="row">
            <div className="col-xs-4"></div>
            <div className="col-xs-4"></div>
            <div className="col-xs-4">
              <div id="ladder-search">
                <form>
                  <input type="text" placeholder="Search" />
                </form>
              </div>
            </div>
          </div>
          <div id="ladder-title" className="panel panel-default">
            <div className="panel-heading text-center"><h4>1v1 Ladder - Match History</h4></div>
            <div className="panel-body">
            </div>
          </div>
          <MatchesSync />
        </div>
        <div className="col-xs-2">
          <ModalButton label={(<span>
              <span className="glyphicon glyphicon-plus"></span>Add Match
            </span>)} id="add-user">
            <div className="modal-content">
              <div className="modal-header">
                <h4>Add Match</h4>
              </div>
              <div className="modal-body">
                <LadderAddMatchFormSync users={Object.keys(this.props.users).map((key) => this.props.users[key])} champions={Object.keys(this.props.champions).map((key) => this.props.champions[key])} />
              </div>
            </div>
          </ModalButton>
        </div>
      </div>
    )
  }
}
