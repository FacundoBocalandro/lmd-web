import {connect} from "react-redux";
import actions from "../../actions";
import Readings from "../components/Readings";

const mapStateToProps = state => ({
    categories: state.readings.categories,
    userRole: state.session.userInfo?.userRole,
})

const mapDispatchToProps = dispatch => ({
    getReadingCategories: () => dispatch(actions.readings.getReadingCategories.request()),
    getReadingsByCategory: (categoryId, callback) => dispatch(actions.readings.getReadingsByCategory.request(categoryId, callback)),
    disableReading: (id, callback) => dispatch(actions.readings.disableReading.request(id, callback)),
    enableReading: (id, callback) => dispatch(actions.readings.enableReading.request(id, callback)),
    addReading: (reading, callback, errorCallback) => dispatch(actions.readings.addReading.request(reading, callback, errorCallback)),
    editReading: (reading, callback, errorCallback) => dispatch(actions.readings.editReading.request(reading, callback, errorCallback)),
    uploadImage: (image, callback, errorCallback) => dispatch(actions.readings.uploadImage.request(image, callback, errorCallback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Readings);
