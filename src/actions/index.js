export const REQUEST_IDPS = 'REQUEST_IDPS'
export const RECEIVE_IDPS = 'RECEIVE_IDPS'

export const requestIdps = () => {
    return {
        type: REQUEST_IDPS,
        requestedAt: Date.now()
    }
}

export const receiveIdps = (json) => {
    return {
        type: RECEIVE_IDPS,
        idps: json.discojuice,
        receivedAt: Date.now()
    }
}

export function fetchIdps() {
    return dispatch => {
        dispatch(requestIdps())
        return fetch(`identity_providers.json`)
            .then(response => response.json())
            .then(json => dispatch(receiveIdps(json)))
    }
}