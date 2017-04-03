import React from 'react'

import LadderSync from './containers/laddersync.js'
import LadderAddUser from './components/ladderadduser.js'

export default class LadderPage extends React.Component {
  render() {
    return(
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
            <div className="panel-heading text-center"><h4>1v1 Ladder</h4></div>
            <div className="panel-body">
              <div className="row">
                <div className="col-xs-1">
                  Placing
                </div>
                <div className="col-xs-4">
                  IGN
                </div>
                <div className="col-xs-3">
                  Name
                </div>
                <div className="col-xs-2">
                  Time Left Til Decay
                </div>
                <div className="col-xs-2">
                  KP
                </div>
              </div>
            </div>
          </div>
          <LadderSync />
        </div>
        <div className="col-xs-2">
          <LadderAddUser />
        </div>
      </div>
    )
  }
}
