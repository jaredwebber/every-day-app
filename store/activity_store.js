import {createState, useState} from '@hookstate/core';
import {getStatisticsPublic, logActivityAsync} from './async_storage';

const store = createState({
	activities: [],
	selectedActivity: {
		ActivityID: -1,
	},
});

const wrapState = currStore => ({
	getActivities: () => currStore.value.activities,
	getSelectedActivity: () => currStore.value.selectedActivity,
	selectActivity: activityID => {
		setSelectedActivity(activityID);
	},
	updateActivities: activities => {
		currStore.activities.set(activities);
	},
	logActivity: count => {
		logActivityAsync(currStore.value.selectedActivity.ActivityID, count).then(
			getStatisticsPublic().then(response => {
				store.activities.set(response);
				setSelectedActivity(store.value.selectedActivity.ActivityID);
			})
		);
	},
	populateStore: () => {
		getStatisticsPublic().then(response => currStore.activities.set(response));
		// Async access populate, update current day total?
	}
});

export const useGlobalStore = () => wrapState(useState(store));

function setSelectedActivity(activityID) {
	if (store.value.activities !== null) {
		var result = store.value.activities.find(act => {
			return act.ActivityID === activityID;
		});
		if (result !== undefined)
			store.selectedActivity.set(JSON.parse(JSON.stringify(result)));
	}
}
