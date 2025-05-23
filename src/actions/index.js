import { log_info, log_debug } from "../logging";

export const REQUEST_IDPS = 'REQUEST_IDPS'
export const RECEIVE_IDPS = 'RECEIVE_IDPS'
export const CLICKED_IDP = 'CLICKED_IDP'
export const SELECTED_IDP = 'SELECTED_IDP'
export const SET_QUERY_PARAMETERS = 'SET_QUERY_PARAMETERS'
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
        idps: json,
        receivedAt: Date.now()
    }
}

/**
 * Trigger fetching of idp data asynchrounously and dispatch an action when fetching of the data is finished
 *
 * @returns {function(*)}
 */
export function fetchIdps(id) {
    log_info("fetchIdps(id = "+id+")");

    let url = "";
    if (window.config.endpoints.hasOwnProperty(id)) {
        url = window.config.endpoints[id].url;
    } else {
        log_info("No valid feed id specified, falling back to default clarin sp feed...");
        for(var key in window.config.endpoints) {
           if(window.config.endpoints[key].default) {
               url = window.config.endpoints[key].url;
           }
        };
    }
    log_info("Feed url="+url);

    return (dispatch, getState) => {
        const { filter } = getState();
        dispatch(requestIdps())
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveIdps(json)))
    }
}

export function idpClick(cookies, entityId, digest, digestIndex) {
    return {
        type: CLICKED_IDP,
        entityId: entityId,
        digest: digest,
        digestIndex: digestIndex,
        cookies: cookies
    }
}

export function selectIdp(entityId) {
    return {
        type: SELECTED_IDP,
        entityId: entityId
    }
}

export function createQueryParametersAction(sp_entity_id, sp_return, unityAutoLogin) {
    return {
        type: SET_QUERY_PARAMETERS,
        sp_entity_id: sp_entity_id,
        sp_return: sp_return,
        unityAutoLogin: unityAutoLogin
    }
}