import {ADD_ACTIVITY, GET_ACTIVITY_METADATA} from '../actions/types';

const initialState = {
	activities: [],
};

const activityReducer = (state = initialState, action) => {
	switch (action.type) {
	case ADD_ACTIVITY:
		return {
			// Need to Save Async here?
			...state,
			activities: state.activities.concat({
				key: Math.random(),
				value: action.payload,
			}),
		};
	case GET_ACTIVITY_METADATA:
		return {
			...state,
			activities: action.payload,
		};
	default:
		return state;
	}
};

export default activityReducer;
