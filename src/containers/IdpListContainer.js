import { connect } from 'react-redux'
import IdpList from '../pages/IdpList'
import { nextPageIdps, previousPageIdps } from '../actions'

const getVisibleIdps = (idps, filter) => {
    switch (filter) {
        //case 'SHOW_COMPLETED':
        //    return todos.filter(t => t.completed)
        //case 'SHOW_ACTIVE':
        //    return todos.filter(t => !t.completed)
        case 'SHOW_ALL':
        default:
            return {
                isFetching: idps.isFetching,
                items: idps.items.slice(idps.index,idps.index+idps.show)
            }
    }
}

const mapStateToProps = state => {
    return {
        idps: getVisibleIdps(state.idp_list, state.visibilityFilter)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        nextPageClick: () => {
            dispatch(nextPageIdps())
        },
        previousPageClick: () => {
            dispatch(previousPageIdps())
        },
    }
}

const VisibleIdpList = connect(
    mapStateToProps,
    mapDispatchToProps
)(IdpList)

export default VisibleIdpList