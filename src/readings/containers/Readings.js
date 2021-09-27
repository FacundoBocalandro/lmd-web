import {connect} from "react-redux";
import actions from "../../actions";
import Readings from "../components/Readings";

const mapStateToProps = state => ({
    categories: state.readings.categories
})

const mapDispatchToProps = dispatch => ({
    getReadingCategories: () => dispatch(actions.readings.getReadingCategories.request()),
    getReadingsByCategory: (categoryId, callback) => dispatch(actions.readings.getReadingsByCategory.request(categoryId, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(Readings);
