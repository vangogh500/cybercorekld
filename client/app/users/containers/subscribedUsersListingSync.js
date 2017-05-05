import { connect } from 'react-redux'
import UsersListing from '../components/usersListing.js'
import {subscribe} from '../../res/hocs.js'

const mapStateToProps = (state) => {
  console.log(state)
  return {
    data: state.users.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const UsersListingSync = connect(mapStateToProps, mapDispatchToProps)(UsersListing)

export default subscribe(UsersListingSync, "users")
