import React from 'react'
import LadderListing from './ladderlisting.js'

export default class Ladder extends React.Component {
  componentDidMount() {
    this.props.init()
  }
  render() {
    switch(this.props.status) {
      case 0:
        return (
          <div className="spinner">
            <div className="sk-cube-grid">
              <div className="sk-cube sk-cube1"></div>
              <div className="sk-cube sk-cube2"></div>
              <div className="sk-cube sk-cube3"></div>
              <div className="sk-cube sk-cube4"></div>
              <div className="sk-cube sk-cube5"></div>
              <div className="sk-cube sk-cube6"></div>
              <div className="sk-cube sk-cube7"></div>
              <div className="sk-cube sk-cube8"></div>
              <div className="sk-cube sk-cube9"></div>
            </div>
          </div>
        )
      case 200:
        return (
          <ul id="ladder" className="list-group">
            {
              this.props.data.map((listing, idx) => {
                return (
                  <LadderListing
                    key={listing._id}
                    index={idx + 1}
                    summonerName={listing.ign}
                    name={listing.name}
                    kp={listing.kp}  />
                )
              })
            }
          </ul>
        )
      default:
        return (
          <div></div>
        )
    }

  }
}
