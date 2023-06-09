import { VIEW_LIST } from '../Constants';
import {
    FILTER_ON_TEXT,
    SET_VIEW,
    FILTER_ON_COUNTRY
} from '../actions/FilterActions';

const filter = (state = {text: "", country: "*", view: VIEW_LIST}, action) => {
    switch (action.type) {
        case FILTER_ON_TEXT:
            return Object.assign({}, state, {
                text: action.value
            });
        case FILTER_ON_COUNTRY:
            return Object.assign({}, state, {
                country: action.value
            });
        case SET_VIEW:
            return Object.assign({}, state, {
                view: action.value
            });
        default:
            return state
    }
}

export default filter;