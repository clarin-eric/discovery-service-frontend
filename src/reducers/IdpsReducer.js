
import {
    REQUEST_IDPS,
    RECEIVE_IDPS,
    NEXT_PAGE_IDPS,
    PREVIOUS_PAGE_IDPS,
    SEARCH_IDPS,
    FIRST_PAGE_IDPS,
    LAST_PAGE_IDPS,
} from '../actions'

const idp_list = (state = {isFetching: false, index: 0, show: 10, items: [], filtered: []}, action) => {
    var new_idx = 0;
    switch (action.type) {
        case REQUEST_IDPS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_IDPS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.idps,
                filtered: action.idps,
                lastUpdated: action.receivedAt
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
            var filtered = state.items;
            if(action.pattern.length > 2) {
                var custom_filtered = []
                for(var i = 0; i < state.items.length; i++) {
                    var idp = state.items[i];
                    var added = false;
                    for(var j = 0; j < idp.titles.length && !added; j++) {
                        var title = idp.titles[j].value;
                        var result = title.match(action.pattern, "i");
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

            return Object.assign({}, state, {
                filtered: filtered
            })
        default:
            return state
    }
}

export default idp_list