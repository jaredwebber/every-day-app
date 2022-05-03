import {ADD_ACTIVITY} from '/types';
import {addNewActivity} from '../../data/local_async';

export const addActivity = (activityName, goal, frequency, unit) => {
	addNewActivity(); //need proper params & update state
	return {
		type: ADD_ACTIVITY,
		payload: { activityName, goal, frequency, unit}
	};
};
