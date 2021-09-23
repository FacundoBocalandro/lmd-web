import Home from "../components/Home";
import {connect} from "react-redux";
// import actions from "../../actions";

const mapStateToProps = state => ({
    userInfo: state.session.userInfo,
    userRole: state.session.userInfo?.userRole
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
