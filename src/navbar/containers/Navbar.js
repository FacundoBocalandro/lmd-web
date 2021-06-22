import actions from "../../actions";
import {connect} from "react-redux";
import Navbar from '../components/Navbar'
const mapStateToProps = state => ({
    allUsersInfo: state.session.allUsersInfo
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(actions.session.logout()),
    getUserInfoFromToken: (token) => dispatch(actions.session.getUserInfoFromToken.request(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
