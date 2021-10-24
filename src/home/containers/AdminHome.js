import {connect} from "react-redux";
import AdminHome from "../components/admin-home/AdminHome";
import actions from "../../actions";

const mapStateToProps = state => ({
    readingCategories: state.readings.categories
})

const mapDispatchToProps = dispatch => ({
    getReadingCategories: () => dispatch(actions.readings.getReadingCategories.request()),
    addReading: (reading, callback, errorCallback) => dispatch(actions.readings.addReading.request(reading, callback, errorCallback)),
    sendNotification: (notification, callback, errorCallback) => dispatch(actions.notifications.sendNotification.request(notification, callback, errorCallback))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
