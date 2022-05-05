import {createState, useState} from '@hookstate/core';
import {getStatisticsPublic, logActivityAsync} from '../data/local_async';

function setSelectedActivity(activityID) {
	if (store.value.activities !== null) {
		var result = store.value.activities.find(act => {
			return act.ActivityID === activityID;
		});
		if (result !== undefined)
			store.selectedActivity.set(JSON.parse(JSON.stringify(result)));
	}
}

function updateActivities() {
	getStatisticsPublic().then(response => {
		store.activities.set(response);
		setSelectedActivity(store.value.selectedActivity.ActivityID);
	});
}

const store = createState({
	activities: [],
	selectedActivity: {
		ActivityID: -1,
	},
});

const wrapState = currStore => ({
	getActivities: () => currStore.value.activities,
	getSelectedActivity: () => currStore.value.selectedActivity,
	selectActivity: activityId => {
		setSelectedActivity(activityId);
	},
	updateActivities: activities => {
		currStore.activities.set(activities);
	},
	logActivity: count => {
		logActivityAsync(currStore.value.selectedActivity.ActivityID, count).then(
			updateActivities(),
		);
	},
});

export const useGlobalStore = () => wrapState(useState(store));
