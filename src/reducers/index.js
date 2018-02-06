import { combineReducers } from 'redux'
import idp_list from './IdpsReducer.js'

const idpApp = combineReducers({
    idp_list,
})

export default idpApp