import { combineReducers } from "redux";
import productReducers from './reducer';

const rootReducer = combineReducers({
    data : productReducers
});

export default rootReducer;