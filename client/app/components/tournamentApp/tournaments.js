import React from 'react'

export default class Tournaments extends React.Component {
  render() {
    return (
      <ul className="list list-group">
        <li className="list-group-item">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-6">
                May Dragon Tournament 2016
              </div>
              <div className="col-xs-6">
                <span className="text-grey margin-right-10">Today</span>
                <span className="pull-right text-success"><i className="fa fa-circle margin-right-10"></i>in progress</span>
              </div>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-6">
                New Years Invitational
              </div>
              <div className="col-xs-6">
                <span className="text-grey margin-right-10">1/1/2016</span>
                <span className="text-danger pull-right"><i className="fa fa-circle margin-right-10"></i>completed</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    )
  }
}
