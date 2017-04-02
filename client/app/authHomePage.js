import React from 'react'

export default class AuthHomePage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-4">
            <div className="card black">
              <div className="card-block">
                <h4 className="card-title text-center">Ladders</h4>
              </div>
            </div>
          </div>
          <div className="col-xs-4">
            <div className="card black">
              <div className="card-block">
                <h4 className="card-title text-center">Tournaments</h4>
              </div>
            </div>
          </div>
          <div className="col-xs-4">
            <div className="card black">
              <div className="card-block">
                <h4 className="card-title text-center">Users</h4>
                <h5 className="glyphicon glyphicon-menu-hamburger"></h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
