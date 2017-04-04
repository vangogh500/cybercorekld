import { connect } from 'react-redux'
import LadderSection from '../components/ladderSection.js'
import { fetchLadder } from '../actions/ladder.js'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
 return {
   init: () => {
     dispatch(fetchLadder())
   }
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(LadderSection)
