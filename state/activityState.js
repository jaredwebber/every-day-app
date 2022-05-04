import {createState, useState} from '@hookstate/core';

const state = createState({
	activities: [
		{
			ActivityID: '1651530166658',
			ActivityName: '99',
			GoalAmount: 99,
			CurrentStreak: 1,
			HighestPeriod: 8783,
			TotalGoalsMet: 1,
			GrandTotal: 8885,
			TotalLogCount: 5,
			TodayCount: 8783,
			LastGoalInit: '5/3/2022',
			TodayLogs: 2,
			LongestStreak: 1,
			GoalFrequency: 'D',
			Unit: '99',
		},
		{
			ActivityID: '1651544782489',
			ActivityName: 'g',
			GoalAmount: 3,
			CurrentStreak: 1,
			HighestPeriod: 71,
			TotalGoalsMet: 1,
			GrandTotal: 85,
			TotalLogCount: 4,
			TodayCount: 14,
			LastGoalInit: '5/3/2022',
			TodayLogs: 2,
			LongestStreak: 1,
			GoalFrequency: 'D',
			Unit: 'd',
		},
	],
	selectedActivity: -1,//make this an entire object?
});

export const useGlobalState = () => {
	const currState = useState(state);
	return {
		getActivities: () => currState.value.activities,
		getSelectedActivity: () => currState.value.selectedActivity,
		selectActivity: activity => {
			currState.selectedActivity.set(activity);
		},
		updateActivities: activities => {
			currState.activities.set(activities);
		},
		// eslint-disable-next-line no-unused-vars
		logActivity: (activity, count) => {
			// call async to store
			// update store async
			currState.activities.set(activity);
		},
	};
};
