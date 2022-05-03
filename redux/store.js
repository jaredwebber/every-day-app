import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import selectedActivityReducer from './reducers/selectedActivityReducer';
const rootReducer = combineReducers({
	selectedActivityReducer
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
