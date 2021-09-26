import {connect} from "react-redux";
import actions from "../../actions";
import HeightChart from "../components/height-chart/HeightChart";


const mapStateToProps = state => ({
    averageHeightData: state.home.averageHeightData,
    userHeightHistory: state.home.userHeightHistory
})

const mapDispatchToProps = dispatch => ({
    getAverageHeightData: () => dispatch(actions.home.getAverageHeightData.request()),
    getUserHeightHistory: () => dispatch(actions.home.getUserHeightHistory.request()),
})


export default connect(mapStateToProps, mapDispatchToProps)(HeightChart);
