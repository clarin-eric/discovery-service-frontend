import { connect } from 'react-redux'
import Home from '../pages/Home'
import { createQueryParametersAction } from '../actions'


const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        setQueryParameters: (sp_entity_id, sp_return) => {
            dispatch(createQueryParametersAction(sp_entity_id, sp_return));
        }
    }
}

const QueryParametersEnhancedHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

export default QueryParametersEnhancedHome