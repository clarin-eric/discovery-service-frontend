
import {
    REQUEST_IDPS,
    RECEIVE_IDPS,
    NEXT_PAGE_IDPS,
    PREVIOUS_PAGE_IDPS,
    SEARCH_IDPS,
    FIRST_PAGE_IDPS,
    LAST_PAGE_IDPS,
    CLICKED_IDP,
    SELECTED_IDP, SET_QUERY_PARAMETERS,
} from '../actions'

/**
 * state =
 *  {
 *      countries: [],              //list of unique countries, derived from the list of IdPs
 *      isFetching: false,          //are we currently fetching the list of IdPs
 *      index: 0,                   //starting index
 *      show: 10,                   //number of IdPs to show at the same time
 *      items: [],                  //full list of IdPs
 *      filtered: [],               //filtered list of IdPs
 *      selected_entityId: null,    //entityID of the previously selected IdP or null
 *      selected_idp: null          //the IdP object for the selected IdP or null
 *  }
 *
 *  IDP object:
 *   {
 *      "country": "EU",
 *      "entityID": "https://test-idp.clarin.eu",
 *      "geo": {"lat":48.25,"lon":11.65},
 *      "icon": {"url":"https://www.clarin.eu/sites/default/files/clarin-logo.png","width":195,"height":220},
 *      "titles": [{"language":"en","value":"clarin.eu website account [TEST]"}],
 *      "weight": 100
 *    }
 * @param state
 * @param action
 * @returns {*}
 */
const idp_list = (state = {countries: [], isFetching: false, index: 0, show: 10, items: [], filtered: [], selected_entityId: null, selected_idp: null}, action) => {
    var new_idx = 0;
    switch (action.type) {
        case REQUEST_IDPS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_IDPS:
            return Object.assign({}, state, {
                countries: getCountries(action.idps),
                isFetching: false,
                items: action.idps,
                filtered: action.idps,
                lastUpdated: action.receivedAt,
                selected_entityId: state.selected_entityId,
                selected_idp: getSelectedIdp(action.idps, state.selected_entityId)
            })
        case PREVIOUS_PAGE_IDPS:
            new_idx = state.index-state.show;
            if (new_idx < 0) {
                new_idx = 0;
            }
            console.log("previous, new index="+new_idx);
            return Object.assign({}, state, {
                index: new_idx
            })
        case NEXT_PAGE_IDPS:
            new_idx = state.index+state.show;
            if (new_idx >= state.filtered.length) {
                new_idx = state.filtered.length-1;
            }
            console.log("next, new index="+new_idx);
            return Object.assign({}, state, {
                index: new_idx
            })
        case FIRST_PAGE_IDPS:
            return Object.assign({}, state, {
                index: 0
            })
        case LAST_PAGE_IDPS:
            new_idx = state.filtered.length-state.show;
            if (new_idx <= 0) {
                new_idx = 0;
            }
            return Object.assign({}, state, {
                index: new_idx
            })
        case SEARCH_IDPS:
            return Object.assign({}, state, {
                filtered: filter(action.pattern, state.items)
            })
        case CLICKED_IDP:
            if (state.sp_return) {
                action.cookies.set("entityid", action.entityId, "/");
                //TODO: check if ? exists in return url. If yes append with &, otherwise append with ?
                var redirect_url = state.sp_return+"&entityID=" + action.entityId;
                console.log('set cookie, redirecting to'+redirect_url);
                window.location.href = redirect_url;
            } else {
                console.log("No SP return url found");
            }
            return state
        case SELECTED_IDP:
            return Object.assign({}, state, {
                selected_entityId: action.entityId,
                selected_idp: getSelectedIdp(state.items, action.entityId)
            })
        case SET_QUERY_PARAMETERS:
            console.log("Set query parameters to: sp_entity_id: "+action.sp_entity_id+". sp_return: "+action.sp_return)
            return Object.assign({}, state, {
                sp_entity_id: action.sp_entity_id,
                sp_return: action.sp_return
            })
        default:
            return state
    }
}

/**
 * Get the idp matching the supplied entity id from the list of idps
 * @param list
 * @param entityId
 * @returns {*}
 */
function getSelectedIdp(list, entityId) {
    var selected_idp = null;
    list.forEach(function(idp) {
        if (idp.entityID === entityId) {
            selected_idp = idp;
        }
    });
    //console.log('Selected idp for entityid='+entityId+' is:');
    //console.log(selected_idp);
    return selected_idp
}

/**
 * Process the list of idps and generate a set of countries
 * @param list
 */
function getCountries(list) {
    var countries = [];
    list.forEach(function(idp) {
        var current = idp.country;

        //Check the current list to see if the current country is already in the list
        var exists = false;
        for (var i = 0; i < countries.length && !exists; i++) {
            if (current === countries[i]) {
                exists = true;
            }
        }

        //Add current country to list if it doesn't exist in the list
        if (!exists) {
            countries.push(current)
        }
    });
    return countries;
}

/**
 * Filter the list of idp entries according to the supplied pattern
 * @param pattern
 * @param list
 * @returns {*}
 */
function filter(pattern, list) {
    var filtered = list;
    if(pattern.length > 2) {
        var custom_filtered = []
        for(var i = 0; i < list.length; i++) {
            var idp = list[i];
            var added = false;
            for(var j = 0; j < idp.titles.length && !added; j++) {
                var title = idp.titles[j].value;
                var result = title.match(pattern, "i");
                if(result) {
                    custom_filtered.push(idp)
                    added = true;
                }
            }
        }
        filtered = custom_filtered;
        console.log("Filtered list:");
        console.log(filtered);
    }
    return filtered;
}

export default idp_list