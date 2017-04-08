import React from 'react'

import ModalButton from './components/modalbutton.js'
import LadderAddMatchForm from './components/ladderaddmatchform.js'

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
        </div>
        <div className="col-xs-2">
          <ModalButton label="Add Match">
            <LadderAddMatchForm users={Object.keys(this.props.users).map((key) => this.props.users[key])} />
          </ModalButton>
        </div>
      </div>
    )
  }
}
