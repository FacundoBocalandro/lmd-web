import actions from "../../actions";
import {connect} from "react-redux";
import EnterDataScreen from "../components/EnterDataScreen";

const mapStateToProps = state => ({
    userInfo: state.session.userInfo,
    userRole: state.session.userInfo?.userRole,
    relationships: state.relationships.relationships,
})

const mapDispatchToProps = dispatch => ({
    createNewWeightRecord: (weight, timeRecorded, callback, errorCallback) => dispatch(actions.home.createNewWeightRecord.request(weight, timeRecorded, callback, errorCallback)),
    createNewPerimeterRecord: (perimeter, timeRecorded, callback, errorCallback) => dispatch(actions.home.createNewPerimeterRecord.request(perimeter, timeRecorded, callback, errorCallback)),
    createNewHeightRecord: (height, timeRecorded, callback, errorCallback) => dispatch(actions.home.createNewHeightRecord.request(height, timeRecorded, callback, errorCallback))
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterDataScreen);
