import { connect } from 'react-redux'
import IdpList from '../pages/IdpList'
import { nextPageIdps, previousPageIdps, firstPageIdps, lastPageIdps, searchIdp } from '../actions'

const getVisibleIdps = (idps, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
        default:
            return {
                isFetching: idps.isFetching,
                index: idps.index,
                show: idps.show,
                total: idps.items.length,
                items: idps.filtered.slice(idps.index,idps.index+idps.show)
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
        patternChange: (pattern) => {
            dispatch(searchIdp(pattern))
        },
        firstPageClick: () => {
            dispatch(firstPageIdps())
        },
        lastPageClick: () => {
            dispatch(lastPageIdps())
        },
    }
}

const VisibleIdpList = connect(
    mapStateToProps,
    mapDispatchToProps
)(IdpList)

export default VisibleIdpList