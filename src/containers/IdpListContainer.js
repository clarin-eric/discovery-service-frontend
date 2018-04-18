import { connect } from 'react-redux'
import IdpList from '../pages/IdpList'
import { nextPageIdps, previousPageIdps, firstPageIdps, lastPageIdps, searchIdp, idpClick, selectIdp, setCountryFilter } from '../actions'

const getVisibleIdps = (idps, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
        default:
            return {
                isFetching: idps.isFetching,
                index: idps.index,
                show: idps.show,
                total: idps.items.length,
                items: idps.filtered.slice(idps.index,idps.index+idps.show),
                selected_entityId: idps.selected_entityId,
                selected_idp: idps.selected_idp,
                countries: idps.countries,
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
        countryChange: (country) => {
        dispatch(setCountryFilter(country))
        },
        firstPageClick: () => {
            dispatch(firstPageIdps())
        },
        lastPageClick: () => {
            dispatch(lastPageIdps())
        },
        idpClick: (cookies, entityId) => {
            dispatch(idpClick(cookies, entityId))
        },
        setSelectedIdp: (entityId) => {
            dispatch(selectIdp(entityId))
        }
    }
}

const VisibleIdpList = connect(
    mapStateToProps,
    mapDispatchToProps
)(IdpList)

export default VisibleIdpList