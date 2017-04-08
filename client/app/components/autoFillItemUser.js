import React from 'react'

export default class AutoFillItemUser extends React.Component {
  render() {
    var boldSubString = (arr) => {
      return (
        arr.map((substr, idx) => {
          if(substr.toLowerCase() == this.props.search.toLowerCase()) return (<b className="highlight" key={substr + idx + 'autofill-item bold' + this.props.search }>{substr}</b>)
          else return (<span key={substr + idx + 'autofill-item' + this.props.search }>{substr}</span>)
        })
      )
    }
    return (
      <li className="autofill-item" onClick={(e) => {this.props.onClick(e, this.props.id)}}>
        <div className="row">
          <div className="col-xs-4" >
            {boldSubString(this.props.csm)}
          </div>
          <div className="col-xs-4">
            {boldSubString(this.props.ign)}
          </div>
          <div className="col-xs-4">
            {boldSubString(this.props.name)}
          </div>
        </div>
      </li>
    )
  }
}
