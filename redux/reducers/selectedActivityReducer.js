import {SELECT_ACTIVITY} from '../actions/types';

const initialState = {
	ActivityID: -1,
	ActivityName: '',
	GoalAmount: -1,
	CurrentStreak: -1,
	HighestPeriod: -1,
	TotalGoalsMet: -1,
	GrandTotal: -1,
	TotalLogCount: -1,
	TodayCount: -1,
	LastGoalInit: -1,
	TodayLogs: -1,
	LongestStreak: -1,
	GoalFrequency: '',
	Unit: '',
};

const selectedActivityReducer = (state = initialState, action) => {
	switch (action.type) {
	case SELECT_ACTIVITY: {
		// update state to parameter activityMetadata.ActivityId = parameter
		return {
			...state,
			action,
		};
	}
	default:
		return state;
	}
};

export default selectedActivityReducer;
