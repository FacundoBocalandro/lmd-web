import Home from "../components/Home";
import {connect} from "react-redux";
import actions from "../../actions";

const mapStateToProps = state => ({
    userInfo: state.session.userInfo,
    userRole: state.session.userInfo?.userRole,
    relationships: state.relationships.relationships,
})

const mapDispatchToProps = dispatch => ({
    exportGrowthData: (callback) => dispatch(actions.home.exportGrowthData.request(callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
