import actions from "../../actions";
import {connect} from "react-redux";
import EnterDataScreen from "../components/EnterDataScreen";

const mapStateToProps = state => ({
    age: state.session.userInfo.age
})

const mapDispatchToProps = dispatch => ({
    createNewWeightRecord: (weight, callback, errorCallback) => dispatch(actions.home.createNewWeightRecord.request(weight, callback, errorCallback)),
    createNewPerimeterRecord: (perimeter, callback, errorCallback) => dispatch(actions.home.createNewPerimeterRecord.request(perimeter, callback, errorCallback)),
    createNewHeightRecord: (height, callback, errorCallback) => dispatch(actions.home.createNewHeightRecord.request(height, callback, errorCallback))
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterDataScreen);
