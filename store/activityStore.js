import {createState, useState} from '@hookstate/core';
import {logActivityAsync} from '../data/local_async';

function kvPair(label, value) {
	this.label = label;
	this.value = value;
}

function parseActivityOptions(metadata) {
	var build = new Array();
	for (var i in metadata) {
		build.push(new kvPair(metadata[i].ActivityName, metadata[i].ActivityID));
	}
	return build;
}

const state = createState({
	activities: [],
	selectedActivity: -1, //make this an entire object?,
	activityOptions: [], //redundant? can just filter activities[]
});

export const useGlobalStore = () => {
	const store = useState(state);
	return {
		getActivities: () => store.value.activities,
		getSelectedActivity: () => store.value.selectedActivity,
		getActivityOptions: () => store.value.activityOptions,
		selectActivity: activity => {
			store.selectedActivity.set(activity);
		},
		updateActivities: activities => {
			store.activities.set(activities);

			if (activities == null || activities == undefined) {
				store.activityOptions.set(null);
			} else {
				store.activityOptions.set(parseActivityOptions(activities));
			}
		},
		logActivity: count => {
			const preLog = store.activities;
			//will need to modify this once selectedActivity contains object not int
			logActivityAsync(store.value.selectedActivity, count).then(
				updatedActivities => {
					if (updatedActivities) {
						store.activities.set(updatedActivities);
					} else {
						console.warn(
							'Error logging activity - reverting to pre-log values',
						);
						store.activities.set(preLog);
					}
				},
			);
		},
	};
};
