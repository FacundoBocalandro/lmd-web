import actions from "../../actions";
import {connect} from "react-redux";
import Navbar from '../components/Navbar'
const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(actions.session.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
