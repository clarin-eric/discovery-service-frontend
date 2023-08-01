import {
    REQUEST_IDPS,
    RECEIVE_IDPS,
    CLICKED_IDP,
    SELECTED_IDP,
    SET_QUERY_PARAMETERS,
    SHOW_MORE_IDPS,
} from '../actions'
import {log_debug, log_info, log_warn} from '../logging';
import { countries } from '../Constants';

const filter_pattern_character_treshhold = 1;

/**
 * state object:
 *  {
 *      countries: [],              //list of unique countries, derived from the list of IdPs
 *      filter_pattern: ,
 *      filter_country: ,
 *      isFetching: false,          //are we currently fetching the list of IdPs
 *      index: 0,                   //starting index
 *      show: 10,                   //number of IdPs to show at the same time
 *      items: [],                  //full list of IdPs
 *      filtered: [],               //filtered list of IdPs
 *      selected_entityId: null,    //entityID of the previously selected IdP or null
 *      selected_idp: null          //the IdP object for the selected IdP or null
 *      error: []                   //List of error messages, or empty array if there are no errors
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

const testIdpList = [{
    country:"EU",
    entityID:"https://idm.clarin.eu",
    icon:{
        height:220,
        url:"https://www.clarin.eu/sites/default/files/clarin-logo.png",
        width:195
    },
    titles:[
        {language:"en",value:"clarin.eu website account"}
    ],
    weight:100
},{
    country:"SI",
    entityID:"https://adfs.gskamnik.si/saml",
    titles:[
        {language:"en",value:"Glasbena šola Kamnik"},
        {language:"sl",value:"Glasbena šola Kamnik"}
    ],
    weight:0
}];

/*
Process the incoming idp json and transform into the presentation json required as input for the <Idp> component.
Process IDP items to sanitize titles and resolve country_code to country_label
 */
const processIdp = (idp_in) => {
    let ext_idp = null;
    if (idp_in && idp_in.entityID) {
        ext_idp = idp_in;
        if(!ext_idp.titles) {
            ext_idp.titles = []
        }

        for (var i = 0; i < ext_idp.titles.length; i++) {
            ext_idp.titles[i].value = ext_idp.titles[i].value.trim();
        }
        ext_idp["display_title"] = getTitle(ext_idp, "en");

        let country_code = idp_in.country;
        ext_idp["country_code"] = country_code;

        let country_name = getFullCountry(country_code, idp_in.entityID);
        ext_idp["country_label"] = country_name

        if (country_name === "Unknown") {
            log_warn("Skipping idp ("+idp_in.entityID+") with country name = Unkown.");
            ext_idp = null
        } else if (ext_idp["display_title"] === null) {
            log_warn("Skipping idp ("+idp_in.entityID+") without display title.");
            ext_idp = null
        }
    }
    return ext_idp
}

/**
 * Combine the pattern and country filters
 * @param pattern
 * @param country
 * @param list
 * @returns {*}
 */
const filterIdps = (idps, activeFilter) => {
    if(!activeFilter) {
        return idps;
    }

    log_debug("Combining filters, pattern="+activeFilter.text+", country="+activeFilter.country+", #unfiltered entries="+idps.length);
    let filtered = idps;
    if (activeFilter.country) {
        filtered = filterByCountry(activeFilter.country, idps)
    }
    log_debug("filtered by country: "+filtered.length);
    if(activeFilter.text) {
        filtered = filterByName(activeFilter.text, filtered)
    }
    log_debug("filtered by pattern: "+filtered.length);

    return filtered
}

const sortIdps = (idps) => {
    idps.sort(function(x, y) {
        if(!x || !y) {
            return 0;
        }

        //Sort on weight first, then on title (en) alphabetically
        const x_title = getTitle(x, 'en');
        const y_title = getTitle(y, 'en');
        if (x_title && y_title) {
            return y.weight - x.weight || x_title.localeCompare(y_title);
        }
        log_debug("Missing title. x: {entityid:"+x.entityID+", title:"+x_title+"}, y: {entityid:"+y.entityID+", title:"+y_title+"}");
        return 0;
    });
    return idps;
}

export const getProcessedFilteredAndSortedIdpList = (idps_in, activeFilter) => {
    return sortIdps(
        filterIdps(
            idps_in,//idps_in.map(idp => processIdp(idp)),
            activeFilter
        )
    )
}


//getProcessedFilteredAndSortedIdpList(testIdpList, null)
const initialIdpState = {version: {fetching: false, value: "n/a"}, errors: [], countries: getCountries(testIdpList.map(idp => processIdp(idp))), filter_pattern: "", filter_country: "*", isFetching: false, index: 0, show: 12, items: testIdpList, filtered: [], selected_entityId: null, selected_idp: null};

const idp_list = (state = initialIdpState, action) => {
    var new_idx = 0;
    switch (action.type) {
        case REQUEST_IDPS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_IDPS:
            return Object.assign({}, state, {
                countries: getCountries(action.idps.map(idp => processIdp(idp))),
                isFetching: false,
                items: action.idps.map(idp => processIdp(idp)),
                filtered: [],//getProcessedFilteredAndSortedIdpList(action.idps, activeFilter),
                lastUpdated: action.receivedAt,
                selected_entityId: state.selected_entityId,
                selected_idp: getSelectedIdp(action.idps, state.selected_entityId)
            })
        case SHOW_MORE_IDPS:
            return Object.assign({}, state, {
                show: state.show+12
            })
        case CLICKED_IDP:
            if (state.sp_return) {
                //TODO: check if ? exists in return url. If yes append with &, otherwise append with ?
                var redirect_url = state.sp_return+"&entityID=" + action.entityId;
                window.location.href = redirect_url;
            } else {
                log_warn("No SP return url found");
            }
            return state
        case SELECTED_IDP:
            return Object.assign({}, state, {
                selected_entityId: action.entityId,
                selected_idp: getSelectedIdp(state.items, action.entityId)
            })
        case SET_QUERY_PARAMETERS:
            var errors = [];
            if (!state.sp_entity_id && !action.sp_entity_id) {
                    errors.push({"code": "ERROR_NO_SP_ENTITY_ID", "message": "No entityID provided by service provider."});
            }
            if (!state.sp_return && !action.sp_return) {
                errors.push({"code": "ERROR_NO_RETURN_URL", "message": "No return url provided by service provider."});
            }

            let new_sp_entity_id = state.sp_entity_id;
            if(!new_sp_entity_id) {
                new_sp_entity_id = action.sp_entity_id;
            }

            let new_sp_return = state.sp_return;
            if(!new_sp_return) {
                new_sp_return = action.sp_return;
            }

            return Object.assign({}, state, {
                errors: state.errors.concat(errors),
                sp_entity_id: new_sp_entity_id,
                sp_return: new_sp_return
            })
        default:
            return state
    }
}

function getTitle(idp, lang) {
    if (idp && idp.titles) {
        for (var i = 0; i < idp.titles.length; i++) {
            if (idp.titles[i].language === lang) {
                return idp.titles[i].value;
            }
        }
    }
    return "Unavailable";
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
        if (idp && idp.entityID === entityId) {
            selected_idp = idp;
        }
    });
    return selected_idp
}

/**
 * Process the list of idps and generate a set of countries
 * @param list
 */
function getCountries(list) {
    var countries = [];
    list.forEach(function(idp) {
        if(idp) {
            var current = idp.country;

            //Check the current list to see if the current country is already in the list
            var exists = false;
            for (var i = 0; i < countries.length && !exists; i++) {
                if (current === countries[i].code) {
                    exists = true;
                }
            }

            //Add current country to list if it doesn't exist in the list
            if (!exists) {
                countries.push({"code": current, "label": getFullCountry(current)})
            }
        }
    });

    countries.sort(function(a, b) {
        return a.label.localeCompare(b.label);
    });

    return countries;
}

/**
 * Filter the list of idp entries by name according to the supplied pattern ("*" matches any value)
 * @param pattern
 * @param list
 * @returns {*}
 */
function filterByName(pattern, list) {
    let filtered = list;
    if(pattern.length > filter_pattern_character_treshhold) {
        let custom_filtered = []
        for(let i = 0; i < list.length; i++) {
            const idp = list[i];
            if(idp !== null) {
                let added = false;
                for (let j = 0; j < idp.titles.length && !added; j++) {
                    let title = idp.titles[j].value;
                    //let result = title.match(pattern, "i");
                    let result = title.match(new RegExp(pattern, "i"));
                    if (result) {
                        custom_filtered.push(idp)
                        added = true;
                    }
                }
            }
        }
        filtered = custom_filtered;
    }
    return filtered;
}

/**
 * Filter the list of idp entries according to the supplied country
 * @param pattern
 * @param list
 * @returns {*}
 */
function filterByCountry(country, list) {
    if (country === "*") {
        return list;
    }

    let filtered = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i] !== null && list[i].country === country) {
            filtered.push(list[i]);
        }
    }
    return filtered;
}

function getFullCountry(code, entityID) {
    if (code in countries) {
        return countries[code];
    }
    log_debug("Country code \""+code+"\" unkown for: "+entityID);
    return "Unknown";
}

export default idp_list