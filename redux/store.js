import {createStore, combineReducers} from 'redux';
import activityReducer from './activityReducer';

const rootReducer = combineReducers({
	activites: activityReducer,
});

const configureStore = () => {
	return createStore(rootReducer);
};

export default configureStore;
