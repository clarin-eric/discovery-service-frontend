export const REQUEST_IDPS = 'REQUEST_IDPS'
export const RECEIVE_IDPS = 'RECEIVE_IDPS'
export const NEXT_PAGE_IDPS = 'NEXT_PAGE_IDPS'
export const PREVIOUS_PAGE_IDPS = 'PREVIOUS_PAGE_IDPS'
export const FIRST_PAGE_IDPS = 'FIRST_PAGE_IDPS'
export const LAST_PAGE_IDPS = 'LAST_PAGE_IDPS'
export const SEARCH_IDPS = 'SEARCH_IDPS'
export const CLICKED_IDP = 'CLICKED_IDP'
export const SELECTED_IDP = 'SELECTED_IDP'
export const SET_QUERY_PARAMETERS = 'SET_QUERY_PARAMETERS'
export const SET_COUNTRY_FILTER = 'SET_COUNTRY_FILTER'
export const SHOW_MORE_IDPS = 'SHOW_MORE_IDPS'


/**
 * Request download if IDP json data
 * @returns {{type: string, requestedAt: number}}
 */
export const requestIdps = () => {
    return {
        type: REQUEST_IDPS,
        requestedAt: Date.now()
    }
}

/**
 * Process downloaded IDP json data
 * @param json
 * @returns {{type: string, idps: *, receivedAt: number}}
 */
export const receiveIdps = (json) => {
    return {
        type: RECEIVE_IDPS,
        idps: json.discojuice,
        receivedAt: Date.now()
    }
}

export const showMoreIdps = () => {
    return {
        type: SHOW_MORE_IDPS
    }
}

/**
 * Switch the next page of idps
 * @returns {{type: string}}
 */
export const nextPageIdps = () => {
    return {
        type: NEXT_PAGE_IDPS
    }
}

/**
 * Switch to previous page of idps
 * @returns {{type: string}}
 */
export const previousPageIdps = () => {
    return {
        type: PREVIOUS_PAGE_IDPS
    }
}

export const firstPageIdps = () => {
    return {
        type: FIRST_PAGE_IDPS
    }
}

export const lastPageIdps = () => {
    return {
        type: LAST_PAGE_IDPS
    }
}

/**
 * Search list of idps
 * @param string
 * @returns {{type: string, pattern: *}}
 */
export const searchIdp = (string) => {
    return {
        type: SEARCH_IDPS,
        pattern: string
    }
}

/**
 * Trigger fetching of idp data asynchrounously and dispatch an action when fetching of the data is finished
 *
 * @returns {function(*)}
 */
export function fetchIdps() {
    return dispatch => {
        dispatch(requestIdps())
        return fetch(`identity_providers.json`)
            .then(response => response.json())
            .then(json => dispatch(receiveIdps(json)))
    }
}

export function idpClick(cookies, entityId) {
    return {
        type: CLICKED_IDP,
        entityId: entityId,
        cookies: cookies
    }
}

export function selectIdp(entityId) {
    return {
        type: SELECTED_IDP,
        entityId: entityId
    }
}

export function createQueryParametersAction(sp_entity_id, sp_return) {
    return {
        type: SET_QUERY_PARAMETERS,
        sp_entity_id: sp_entity_id,
        sp_return: sp_return
    }
}

export function setCountryFilter(country) {
    return {
        type: SET_COUNTRY_FILTER,
        country: country,
    }
}