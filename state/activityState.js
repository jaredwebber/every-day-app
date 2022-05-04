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

export const useGlobalState = () => {
	const currState = useState(state);
	return {
		getActivities: () => currState.value.activities,
		getSelectedActivity: () => currState.value.selectedActivity,
		getActivityOptions: () => currState.value.activityOptions,
		selectActivity: activity => {
			currState.selectedActivity.set(activity);
		},
		updateActivities: activities => {
			currState.activities.set(activities);

			if (activities == null || activities == undefined) {
				currState.activityOptions.set(null);
			} else {
				currState.activityOptions.set(parseActivityOptions(activities));
			}
		},
		logActivity: count => {
			const preLog = currState.activities;
			//will need to modify this once selectedActivity contains object not int
			logActivityAsync(currState.value.selectedActivity, count).then(
				updatedActivities => {
					if (updatedActivities) {
						currState.activities.set(updatedActivities);
					} else {
						console.warn(
							'Error logging activity - reverting to pre-log values',
						);
						currState.activities.set(preLog);
					}
				},
			);
		},
	};
};
