import { combineReducers } from 'redux';
import homeReducer from './reducers/home';
// Combine Reducers
const rootReducer = combineReducers({
	homeReducer: homeReducer,
	// Add other reducers here if you have more
});

export default rootReducer;
