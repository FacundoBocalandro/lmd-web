import {connect} from "react-redux";
import Notifications from "../components/Notifications";
import actions from "../../actions";

const mapStateToProps = state => ({
    notifications: state.notifications.notifications,
})

const mapDispatchToProps = dispatch => ({
    sendNotification: (notification, callback, errorCallback) => dispatch(actions.notifications.sendNotification.request(notification, callback, errorCallback)),
    getAllNotifications: () => dispatch(actions.notifications.getAllNotifications.request())
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
