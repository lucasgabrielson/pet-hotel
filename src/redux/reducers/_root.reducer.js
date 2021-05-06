import { combineReducers } from 'redux';
import owners from './owners.reducer'

const rootReducer = combineReducers({
    owners,
});

export default rootReducer;