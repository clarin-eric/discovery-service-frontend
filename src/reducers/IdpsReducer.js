
import {
    REQUEST_IDPS,
    RECEIVE_IDPS,
    NEXT_PAGE_IDPS,
    PREVIOUS_PAGE_IDPS,
} from '../actions'

const idp_list = (state = {isFetching: false, index: 0, show: 10, items: []}, action) => {
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
        case PREVIOUS_PAGE_IDPS:
            var new_idx = state.index-state.show;
            if (new_idx < 0) {
                new_idx = 0;
            }
            console.log("previous, new index="+new_idx);
            return Object.assign({}, state, {
                index: new_idx
            })
        case NEXT_PAGE_IDPS:
            var new_idx = state.index+state.show;
            if (new_idx >= state.items.length) {
                new_idx = state.items.length-1;
            }
            console.log("next, new index="+new_idx);
            return Object.assign({}, state, {
                index: new_idx
            })
        default:
            return state
    }
}

export default idp_list