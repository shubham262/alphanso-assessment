import { combineReducers } from 'redux';
import chatReducer from './reducers/chat';
// Combine Reducers
const rootReducer = combineReducers({
	chatReducer: chatReducer,
	// Add other reducers here if you have more
});

export default rootReducer;
