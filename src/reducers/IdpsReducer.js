
import {
    REQUEST_IDPS,
    RECEIVE_IDPS,
} from '../actions'

const idp_list = (state = {isFetching: false, items: []}, action) => {
    switch (action.type) {
        case REQUEST_IDPS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_IDPS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.idps,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

export default idp_list

/**
 fetch('identity_providers.json')
 .then(r => r.json())
 .then(r => action.asyncDispatchMiddleware());

 return [
 {
     "country":"EU",
     "entityID":"https://idm.clarin.eu",
     "geo":{"lat":48.25,"lon":11.65},
     "icon":{"url":"https://www.clarin.eu/sites/default/files/clarin-logo.png","width":195,"height":220},
     "titles":[{"language":"en","value":"clarin.eu website account"}],
     "weight":100
 }, {
                    "country":"AT",
                    "entityID":"https://sso.tugraz.at/idp/shibboleth",
                    "geo":{"lat":47.0667,"lon":15.45},
                    "icon":{"url":"https://static.tugraz.at/static/core/latest/icons/favicon.ico","width":16,"height":16},
                    "titles":[
                        {"language":"de","value":"Technische Universität Graz"},
                        {"language":"en","value":"Graz University of Technology"}],
                    "weight":0
                }, {
                    "country":"AT",
                    "entityID":"https://shibboleth.fhwn.ac.at/idp/shibboleth",
                    "geo":{"lat":48.2,"lon":16.3667},
                    "icon":{"url":"https://shibboleth.fhwn.ac.at/idp/images/logo16.png","width":16,"height":16},
                    "titles":[
                        {"language":"de","value":"FH Wiener Neustadt"},
                        {"language":"en","value":"University of Applied Sciences Wiener Neustadt"}],
                    "weight":0
                }
 ];
 */