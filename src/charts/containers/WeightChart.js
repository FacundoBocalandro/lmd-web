import {connect} from "react-redux";
import actions from "../../actions";
import WeightChart from "../components/weight-chart/WeightChart";

const mapStateToProps = state => ({
    averageWeightData: state.home.averageWeightData,
    userWeightHistory: state.home.userWeightHistory
})

const mapDispatchToProps = dispatch => ({
    getAverageWeightData: () => dispatch(actions.home.getAverageWeightData.request()),
    getUserWeightHistory: () => dispatch(actions.home.getUserWeightHistory.request()),
})


export default connect(mapStateToProps, mapDispatchToProps)(WeightChart);
