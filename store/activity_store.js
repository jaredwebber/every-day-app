import {createState, useState} from '@hookstate/core';
import {
	asyncGetActivityMetadata,
	asyncPostActivityMetadata,
	asyncGetAllData,
	asyncDeleteAllStorage,
} from './async_storage';
import {
	processLogActivity,
	processValidateCurrent,
	processDEBUG_UPDATE,
} from './store_processing';
import {activityJSON} from './json_templates';

var store = createState({
	activities: [],
	appInstanceDateString: 'default',
	selectedActivity: {
		ActivityID: -1,
		ActivityName: 'Activity',
		TodayCount: -1,
	},
});

const wrapState = currStore => ({
	getActivities: () => JSON.parse(JSON.stringify(currStore.value.activities)), //When obj empty, returned [undefined] without JSON copying
	getSelectedActivity: () => currStore.value.selectedActivity,
	selectActivity: activityID => {
		setSelectedActivity(activityID);
	},
	newActivity: (name, amount, frequency, unit) => {
		const json = new activityJSON(name, amount, frequency, unit);
		if (currStore.value.activities.length === 0) {
			var arr = new Array();
			arr.push(json);
			currStore.activities.set(arr);
		} else {
			var activities = [...currStore.value.activities];
			activities.push(json);
			currStore.activities.set(JSON.parse(JSON.stringify(activities)));
		}
		saveAsync();
	},
	deleteSelectedActivity: () => {
		if (currStore.value.selectedActivity.ActivityID == -1) return;

		var deleteID = currStore.value.selectedActivity.ActivityID;

		currStore.selectedActivity.set({
			ActivityID: -1,
			ActivityName: 'Activity',
			TodayCount: -1,
		});

		var currActivities = JSON.parse(JSON.stringify(currStore.value.activities));
		var updatedActivities = [];

		for (var i in currActivities) {
			if (currActivities[i].ActivityID != deleteID) {
				updatedActivities.push(currActivities[i]);
			}
		}

		currStore.activities.set(updatedActivities);
		saveAsync();
	},
	logActivity: count => {
		var current = JSON.parse(
			JSON.stringify(processValidateCurrent(currStore.value.selectedActivity)),
		);
		var allActivites = JSON.parse(JSON.stringify(currStore.value.activities));

		current.TodayCount = current.TodayCount + parseInt(count);
		current.TodayLogs = current.TodayLogs + 1;
		current.GrandTotal = current.GrandTotal + parseInt(count);
		current.TotalLogCount = current.TotalLogCount + 1;

		if (current.TodayCount > current.HighestPeriod) {
			current.HighestPeriod = current.TodayCount;
		}

		for (var i in allActivites) {
			if (allActivites[i].ActivityID === current.ActivityID) {
				allActivites[i] = current;
			}
		}

		currStore.selectedActivity.set(current);
		currStore.activities.set(allActivites);

		processLogActivity(currStore.value.selectedActivity.ActivityID, count);
		saveAsync();
	},
	populateStore: () => {
		var metadata = [];
		currStore.appInstanceDateString.set(new Date().toLocaleDateString().trim());
		asyncGetActivityMetadata()
			.then(response => {
				metadata = [];
				for (var i in response) {
					metadata[i] = processValidateCurrent(response[i]);
				}
				currStore.activities.set(metadata);
				saveAsync();
			})
			.catch(error =>
				console.error('Error populating activity options: ' + error),
			);
	},
	deleteStorage: () => {
		var arr = new Array();
		currStore.activities.set(arr);
		currStore.selectedActivity.set({
			ActivityID: -1,
			ActivityName: 'Activity',
			TodayCount: -1,
		});
		asyncDeleteAllStorage();
	},
	tryUpdatePeriod: () => {
		var pollDateString = new Date().toLocaleDateString().trim();

		if (currStore.value.appInstanceDateString != pollDateString) {
			currStore.appInstanceDateString.set(pollDateString);
			var currActivities = [...currStore.value.activities];
			var updatedActivities = [];
			for (var i in currActivities) {
				var updatedActivity = processValidateCurrent(
					JSON.parse(JSON.stringify(currActivities[i])),
				);
				updatedActivities.push(updatedActivity);
				if (
					updatedActivity.ActivityID ==
					currStore.value.selectedActivity.ActivityID
				) {
					currStore.selectedActivity.set(updatedActivity);
				}
			}
			currStore.activities.set(updatedActivities);
			saveAsync();
		}
	},
	getAllData: () => {
		return asyncGetAllData();
	},
	debugUpdate: array => {
		store.activities.set(
			processDEBUG_UPDATE(
				JSON.parse(JSON.stringify(store.value.activities)),
				array,
			),
		);
		currStore.selectedActivity.set({
			ActivityID: -1,
			ActivityName: 'Activity',
			TodayCount: -1,
		});
		saveAsync();
	},
});

export const useGlobalStore = () => wrapState(useState(store));

function setSelectedActivity(activityID) {
	if (store.value.activities !== '[]') {
		var result = store.value.activities.find(act => {
			return act.ActivityID === activityID;
		});
	}
	if (result !== undefined) {
		store.selectedActivity.set(JSON.parse(JSON.stringify(result)));
	} else {
		store.selectedActivity.set({ActivityID: -1, ActivityName: 'activity'});
	}
}

function saveAsync() {
	asyncPostActivityMetadata(store.value.activities);
}
