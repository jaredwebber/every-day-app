import {ADD_ACTIVITY, ADD_LOG} from '../actions/types';

const initialState = {
	activities: []
};

const activityMetadataReducer = (state = initialState, action) => {
	switch (action.type) {
	case ADD_ACTIVITY: {
		// Update activities metadata array
		// Save activities array into AsyncStorage
		return {
			...state,
			action
		};
	}
	case ADD_LOG: {
		// Update activities metadata where ActivityId matches
		// Save activities array into AsyncStorage
		// Create new Log in AsyncStorage
		return {
			...state,
			action
		};
	}
	default:
		return state;
	}
};

export default activityMetadataReducer;
