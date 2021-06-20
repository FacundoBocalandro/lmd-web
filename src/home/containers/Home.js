import Home from "../components/Home";
import {connect} from "react-redux";
// import actions from "../../actions";

const mapStateToProps = state => ({
    userInfo: state.session.userInfo
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
