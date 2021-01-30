import {combineReducers} from 'redux'
import {findAllUnit, findUnitById, removeUnitById, saveUnit, testReducer} from "./unitReducer";


const rootReducer = combineReducers({
    findAllUnit, findUnitById, removeUnitById, saveUnit
});
export default rootReducer;