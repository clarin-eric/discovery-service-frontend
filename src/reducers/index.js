import { combineReducers } from 'redux'
import idp_list, { getProcessedFilteredAndSortedIdpList } from './IdpsReducer.js'
import filter from './FilterReducer'
import {FILTER_ON_COUNTRY, FILTER_ON_TEXT, SET_VIEW} from "../actions/FilterActions";
import {RECEIVE_IDPS} from "../actions";

/**
 * Do some postprocessing to update the list of filtered idps based on the current filter value. This requires the
 * filter reducer to have run first.
 */
const postProcessFilter = (state, action) => {
    switch(action.type) {
        case FILTER_ON_TEXT:
        case FILTER_ON_COUNTRY:
        case SET_VIEW:
        case RECEIVE_IDPS:
            //Generate new idp_list state with filtered and sorted list of idps
            const newIdPListState = Object.assign({}, state.idp_list, {
                filtered: getProcessedFilteredAndSortedIdpList(state.idp_list.items, state.filter)
            })
            //Merge full state with updated idp_list state
            return Object.assign(
                {},
                state,
                {
                    idp_list: newIdPListState
                }
            );
        default:
            return state;
    }
}

const combinedReducer = combineReducers({
    filter,
    idp_list,
})

/**
 * Get intermediate (default) state via the standard combinedReducer approach, then apply custom logic which returns the
 * final state. This ensures default state updates have been processed before customizing the result for specific actions.
 *
 * Inspired by https://redux.js.org/usage/structuring-reducers/beyond-combinereducers
 */
function rootReducer(state, action) {
    const intermediateState = combinedReducer(state, action);
    return postProcessFilter(intermediateState, action);
}

export default rootReducer