import {connect} from "react-redux";
import actions from "../../actions";
import RelationshipsScreen from "../components/RelationshipsScreen";

const mapStateToProps = state => ({
    relationships: state.relationships.relationships,
    userInfo: state.session.userInfo
})

const mapDispatchToProps = dispatch => ({
    getAllRelationships: () => dispatch(actions.relationships.getAllRelationships.request()),
    addNewRelationship: (info, callback, errorCallback) => dispatch(actions.relationships.addNewRelationship.request(info, callback, errorCallback)),
    deleteRelationship: (info) => dispatch(actions.relationships.deleteRelationship.request(info)),
    searchDoctors: (dni, callback) => dispatch(actions.relationships.searchDoctors.request(dni, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(RelationshipsScreen);
