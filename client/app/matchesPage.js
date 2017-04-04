import React from 'react'

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
      </div>
    )
  }
}
