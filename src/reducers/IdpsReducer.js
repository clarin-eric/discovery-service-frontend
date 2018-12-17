
import {
    REQUEST_IDPS,
    RECEIVE_IDPS,
    NEXT_PAGE_IDPS,
    PREVIOUS_PAGE_IDPS,
    SEARCH_IDPS,
    FIRST_PAGE_IDPS,
    LAST_PAGE_IDPS,
    CLICKED_IDP,
    SELECTED_IDP, SET_QUERY_PARAMETERS, SET_COUNTRY_FILTER, SHOW_MORE_IDPS,
} from '../actions'
import { log_debug, log_warn } from '../logging';

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
const idp_list = (state = {version: {fetching: false, value: "n/a"}, errors: [], countries: [], filter_pattern: "", filter_country: "*", isFetching: false, index: 0, show: 12, items: [], filtered: [], selected_entityId: null, selected_idp: null}, action) => {
    var new_idx = 0;
    switch (action.type) {
        case REQUEST_IDPS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_IDPS:
            //Process IDP items to sanatize titles and resolve country_code to country_label
            var idps = [];
            action.idps.forEach(function(idp) {
                if (idp && idp.entityID) {
                    var ext_idp = idp;
                    if(!ext_idp.titles) {
                        ext_idp.titles = []
                    }

                    for (var i = 0; i < ext_idp.titles.length; i++) {
                        ext_idp.titles[i].value = ext_idp.titles[i].value.trim();
                    }
                    ext_idp["display_title"] = getTitle(ext_idp, "en");

                    let country_code = idp.country;
                    ext_idp["country_code"] = country_code;

                    let country_name = getFullCountry(country_code, idp.entityID);
                    ext_idp["country_label"] = country_name

                    if (country_name === "Unknown") {
                        log_warn("Skipping idp ("+idp.entityID+") with country name = Unkown.");
                    } else if (ext_idp["display_title"] === null) {
                        log_warn("Skipping idp ("+idp.entityID+") without display title.");
                    } else {
                        idps.push(ext_idp);
                    }
                } else {
                    log_warn("Skipped IDP entry with undefined entityID");
                }
            });

            //Sort idp list
            idps.sort(function(x, y) {
                //Sort on weight first, then on title (en) alphabetically
                const x_title = getTitle(x, 'en');
                const y_title = getTitle(y, 'en');
                if (x_title && y_title) {
                    return y.weight - x.weight || x_title.localeCompare(y_title);
                }
                log_debug("Missing title. x: {entityid:"+x.entityID+", title:"+x_title+"}, y: {entityid:"+y.entityID+", title:"+y_title+"}");
                return 0;
            });

            return Object.assign({}, state, {
                countries: getCountries(idps),
                isFetching: false,
                items: action.idps,
                filtered: idps,//action.idps,
                lastUpdated: action.receivedAt,
                selected_entityId: state.selected_entityId,
                selected_idp: getSelectedIdp(action.idps, state.selected_entityId)
            })
        case PREVIOUS_PAGE_IDPS:
            new_idx = state.index-state.show;
            if (new_idx < 0) {
                new_idx = 0;
            }
            log_debug("previous, new index="+new_idx);
            return Object.assign({}, state, {
                index: new_idx
            })
        case SHOW_MORE_IDPS:
            return Object.assign({}, state, {
                show: state.show+12
            })
        case NEXT_PAGE_IDPS:
            new_idx = state.index+state.show;
            if (new_idx >= state.filtered.length) {
                new_idx = state.filtered.length-1;
            }
            log_debug("next, new index="+new_idx);
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
                filter_pattern: action.pattern,
                filtered: combineFilters(action.pattern, state.filter_country, state.items)
            })
        case CLICKED_IDP:
            if (state.sp_return) {
                var expiration_date = new Date();
                expiration_date.setFullYear(expiration_date.getFullYear() + 10);
                action.cookies.set("entityid", action.entityId, {path: "/", expires: expiration_date});
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
            if (!action.sp_entity_id) {
                    errors.push({"code": "ERROR_NO_SP_ENTITY_ID", "message": "No entityID provided by service provider."});
            }
            if (!action.sp_return) {
                errors.push({"code": "ERROR_NO_RETURN_URL", "message": "No return url provided by service provider."});
            }

            return Object.assign({}, state, {
                errors: state.errors.concat(errors),
                sp_entity_id: action.sp_entity_id,
                sp_return: action.sp_return
            })
        case SET_COUNTRY_FILTER:
            log_debug("Set country filter: "+action.country);
            return Object.assign({}, state, {
                //filtered: filterByCountry(action.country, state.items)
                filter_country: action.country,
                filtered: combineFilters(state.filter_pattern, action.country, state.items)
            })
        default:
            return state
    }
}

function getTitle(idp, lang) {
    if (idp.titles) {
        for (var i = 0; i < idp.titles.length; i++) {
            if (idp.titles[i].language === lang) {
                return idp.titles[i].value;
            }
        }
    }
    return null;
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
            if (current === countries[i].code) {
                exists = true;
            }
        }

        //Add current country to list if it doesn't exist in the list
        if (!exists) {
            countries.push({"code": current, "label": getFullCountry(current)})
        }
    });

    countries.sort(function(a, b) {
        return a.label.localeCompare(b.label);
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
    if(pattern.length > filter_pattern_character_treshhold) {
        var custom_filtered = []
        for(var i = 0; i < list.length; i++) {
            var idp = list[i];
            var added = false;
            for(var j = 0; j < idp.titles.length && !added; j++) {
                var title = idp.titles[j].value;
                //var result = title.match(pattern, "i");
                var result = title.match(new RegExp(pattern, "i"));
                if(result) {
                    custom_filtered.push(idp)
                    added = true;
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
    var filtered = [];
    if (country === "*") {
        filtered = list;
    } else {
        for (var i = 0; i < list.length; i++) {
            if (list[i].country === country) {
                filtered.push(list[i]);
            }
        }
    }
    return filtered;
}

/**
 * Combine the pattern and country filters
 * @param pattern
 * @param country
 * @param list
 * @returns {*}
 */
function combineFilters(pattern, country, list) {
    log_debug("Combining filters, pattern="+pattern+", country="+country+", #unfiltered entries="+list.length);
    var filtered = list;
    if (country) {
        filtered = filterByCountry(country, filtered)
    }
    log_debug("filtered by country: "+filtered.length);
    if(pattern) {
        filtered = filter(pattern, filtered)
    }
    log_debug("filtered by pattern: "+filtered.length);
    return filtered
}

function getFullCountry(code, entityID) {
    var countries = {
        'EU': 'European Union',
        'AF': 'Afghanistan',
        'AX': 'Åland Islands',
        'AL': 'Albania',
        'DZ': 'Algeria',
        'AS': 'American Samoa',
        'AD': 'Andorra',
        'AO': 'Angola',
        'AI': 'Anguilla',
        'AQ': 'Antarctica',
        'AG': 'Antigua and Barbuda',
        'AR': 'Argentina',
        'AM': 'Armenia',
        'AW': 'Aruba',
        'AC': 'Ascension Island',
        'AU': 'Australia',
        'AT': 'Austria',
        'AZ': 'Azerbaijan',
        'BS': 'Bahamas', //The Bahamas
        'BH': 'Bahrain',
        'BD': 'Bangladesh',
        'BB': 'Barbados',
        'BY': 'Belarus',
        'BE': 'Belgium',
        'BZ': 'Belize',
        'BJ': 'Benin',
        'BM': 'Bermuda',
        'BT': 'Bhutan',
        'BO': 'Bolivia',
        'BQ': 'Bonaire, Sint Eustatius and Saba', //Caribbean Netherlands
        'BA': 'Bosnia and Herzegovina',
        'BW': 'Botswana',
        'BV': 'Bouvet Island',
        'BR': 'Brazil',
        'IO': 'British Indian Ocean Territory',
        'VG': 'British Virgin Islands', //Virgin Islands, British
        'BN': 'Brunei Darussalam', // Brunei
        'BG': 'Bulgaria',
        'BF': 'Burkina Faso',
        'MM': 'Burma', //Myanmar
        'BI': 'Burundi',
        'KH': 'Cambodia',
        'CM': 'Cameroon',
        'CA': 'Canada',
        'CV': 'Cape Verde',
        'KY': 'Cayman Islands',
        'CF': 'Central African Republic',
        'TD': 'Chad',
        'CL': 'Chile',
        'CN': 'China', //People's Republic of China
        'CX': 'Christmas Island',
        'CC': 'Cocos (Keeling) Islands',
        'CO': 'Colombia',
        'KM': 'Comoros',
        'CD': 'Congo, Democratic Republic of the', //Democratic Republic of the Congo
        'CG': 'Congo, Republic of the', //Republic of the Congo|Congo
        'CK': 'Cook Islands',
        'CR': 'Costa Rica',
        'CI': "Côte d'Ivoire",
        'HR': 'Croatia',
        'CU': 'Cuba',
        'CW': 'Curaçao',
        'CY': 'Cyprus',
        'CZ': 'Czech Republic',
        'DK': 'Denmark',
        'DJ': 'Djibouti',
        'DM': 'Dominica',
        'DO': 'Dominican Republic',
        'EC': 'Ecuador',
        'EG': 'Egypt',
        'SV': 'El Salvador',
        'GQ': 'Equatorial Guinea',
        'ER': 'Eritrea',
        'EE': 'Estonia',
        'ET': 'Ethiopia',
        'FK': 'Falkland Islands', //|Falkland Islands (Malvinas)
        'FO': 'Faroe Islands',
        'FJ': 'Fiji',
        'FI': 'Finland',
        'FR': 'France',
        'GF': 'French Guiana',
        'PF': 'French Polynesia',
        'TF': 'French Southern and Antarctic Lands', //French Southern Territories
        'GA': 'Gabon',
        'GM': 'Gambia', //The Gambia
        'GE': 'Georgia',
        'DE': 'Germany',
        'GH': 'Ghana',
        'GI': 'Gibraltar',
        'GR': 'Greece',
        'GL': 'Greenland',
        'GD': 'Grenada',
        'GP': 'Guadeloupe',
        'GU': 'Guam',
        'GT': 'Guatemala',
        'GG': 'Guernsey',
        'GN': 'Guinea',
        'GW': 'Guinea-Bissau',
        'GY': 'Guyana',
        'HT': 'Haiti',
        'HM': 'Heard Island and McDonald Islands',
        'HN': 'Honduras',
        'HK': 'Hong Kong',
        'HU': 'Hungary',
        'IS': 'Iceland',
        'IN': 'India',
        'ID': 'Indonesia',
        'IR': 'Iran', //Iran, Islamic Republic of
        'IQ': 'Iraq',
        'IE': 'Ireland', //Republic of Ireland
        'IM': 'Isle of Man',
        'IL': 'Israel',
        'IT': 'Italy',
        'JM': 'Jamaica',
        'JP': 'Japan',
        'JE': 'Jersey',
        'JO': 'Jordan',
        'KZ': 'Kazakhstan',
        'KE': 'Kenya',
        'KI': 'Kiribati',
        'KP': 'North Korea', //Korea, Democratic People's Republic of
        'KR': 'South Korea', //Korea, Republic of
        'KW': 'Kuwait',
        'KG': 'Kyrgyzstan',
        'LA': 'Laos', //Lao People's Democratic Republic
        'LV': 'Latvia',
        'LB': 'Lebanon',
        'LS': 'Lesotho',
        'LR': 'Liberia',
        'LY': 'Libya', //Libyan Arab Jamahiriya
        'LI': 'Liechtenstein',
        'LT': 'Lithuania',
        'LU': 'Luxembourg',
        'MO': 'Macau', //Macao|Macao Special Administrative Region of the People's Republic of China
        'MK': 'Macedonia', //Republic of Macedonia|FYR Macedonia|Macedonia, the former Yugoslav Republic of
        'MG': 'Madagascar',
        'MW': 'Malawi',
        'MY': 'Malaysia',
        'MV': 'Maldives',
        'ML': 'Mali',
        'MT': 'Malta',
        'MH': 'Marshall Islands',
        'MQ': 'Martinique',
        'MR': 'Mauritania',
        'MU': 'Mauritius',
        'YT': 'Mayotte',
        'MX': 'Mexico',
        'FM': 'Micronesia, Federated States of', //Federated States of Micronesia
        'MD': 'Moldova', //Moldova, Republic of
        'MC': 'Monaco',
        'MN': 'Mongolia',
        'ME': 'Montenegro',
        'MS': 'Montserrat',
        'MA': 'Morocco',
        'MZ': 'Mozambique',
        'NA': 'Namibia',
        'NR': 'Nauru',
        'NP': 'Nepal',
        'NL': 'Netherlands',
        'NC': 'New Caledonia',
        'NZ': 'New Zealand',
        'NI': 'Nicaragua',
        'NE': 'Niger',
        'NG': 'Nigeria',
        'NU': 'Niue',
        'NF': 'Norfolk Island',
        'MP': 'Northern Mariana Islands',
        'NO': 'Norway',
        'OM': 'Oman',
        'PK': 'Pakistan',
        'PW': 'Palau',
        'PS': 'Palestine', //State of Palestine|Palestinian territories|Palestinian Territory, Occupied
        'PA': 'Panama',
        'PG': 'Papua New Guinea',
        'PY': 'Paraguay',
        'PE': 'Peru',
        'PH': 'Philippines',
        'PN': 'Pitcairn Islands', //Pitcairn
        'PL': 'Poland',
        'PT': 'Portugal',
        'PR': 'Puerto Rico',
        'QA': 'Qatar',
        'RE': 'Réunion',
        'RO': 'Romania',
        'RU': 'Russia', //Russian Federation
        'RW': 'Rwanda',
        'BL': 'Saint Barthélemy',
        'SH': 'Saint Helena, Ascension and Tristan da Cunha',
        'KN': 'Saint Kitts and Nevis',
        'LC': 'Saint Lucia',
        'MF': 'Saint Martin', //Collectivity of Saint Martin|Saint Martin (French part)
        'PM': 'Saint Pierre and Miquelon',
        'VC': 'Saint Vincent and the Grenadines',
        'WS': 'Samoa',
        'SM': 'San Marino',
        'ST': 'São Tomé and Príncipe',
        'SA': 'Saudi Arabia',
        'SN': 'Senegal',
        'RS': 'Serbia',
        'SC': 'Seychelles',
        'SL': 'Sierra Leone',
        'SG': 'Singapore',
        'SX': 'Sint Maarten', //Sint Maarten (Dutch part)
        'SK': 'Slovakia',
        'SI': 'Slovenia',
        'SB': 'Solomon Islands',
        'SO': 'Somalia',
        'ZA': 'South Africa',
        'GS': 'South Georgia and the South Sandwich Islands',
        'ES': 'Spain',
        'LK': 'Sri Lanka',
        'SD': 'Sudan',
        'SR': 'Suriname',
        'SJ': 'Svalbard and Jan Mayen',
        'SZ': 'Swaziland',
        'SE': 'Sweden',
        'CH': 'Switzerland',
        'SY': 'Syria', //Syrian Arab Republic
        'TW': 'Taiwan', //Taiwan, Province of China
        'TJ': 'Tajikistan',
        'TZ': 'Tanzania', //Tanzania, United Republic of
        'TH': 'Thailand',
        'TL': 'Timor-Leste', //East Timor
        'TG': 'Togo',
        'TK': 'Tokelau',
        'TO': 'Tonga',
        'TT': 'Trinidad and Tobago',
        'TN': 'Tunisia',
        'TR': 'Turkey',
        'TM': 'Turkmenistan',
        'TC': 'Turks and Caicos Islands',
        'TV': 'Tuvalu',
        'UG': 'Uganda',
        'UA': 'Ukraine',
        'GB': 'UK', //United Kingdom|United Kingdom of Great Britian and Northern Ireland|Great Britian
        'AE': 'United Arab Emirates',
        'UK': 'United Kingdom',
        'UM': 'United States Minor Outlying Islands',
        'UY': 'Uruguay',
        'US': 'USA', //United States of America|United States
        'UZ': 'Uzbekistan',
        'VU': 'Vanuatu',
        'VA': 'Vatican City', //Holy See (Vatican City State)
        'VE': 'Venezuela', //Venezuela, Bolivarian Republic of
        'VN': 'Viet Nam', //Vietnam,
        'VI': 'Virgin Islands, U.S.', //United States Virgin Islands,
        'WF': 'Wallis and Futuna',
        'EH': 'Western Sahara',
        'YE': 'Yemen',
        'ZM': 'Zambia',
        'ZW': 'Zimbabwe',
        'XX': 'Experimental'
    };

    if (code in countries) {
        return countries[code];
    }
    log_warn("Country code \""+code+"\" unkown for: "+entityID);
    return "Unknown";
}

export default idp_list