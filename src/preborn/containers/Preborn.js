import {connect} from "react-redux";
import actions from "../../actions";
import Preborn from "../components/Preborn";

const mapStateToProps = state => ({
    userRole: state.session.userInfo?.userRole,
    prebornData: state.preborn.prebornData
})

const mapDispatchToProps = dispatch => ({
    getPrebornData: () => dispatch(actions.preborn.getPrebornData.request()),
    setPrebornData: (prebornData) => dispatch(actions.preborn.setPrebornData.request(prebornData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Preborn);
