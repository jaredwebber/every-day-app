import {asyncLogActivity} from './async_storage';
import {logJSON} from './json_templates';

function daysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
}

function areDifferentWeeks(dateStringOne, dateStringTwo) {
	var result = true;
	var stringOne = dateStringOne.split('/');
	var stringTwo = dateStringTwo.split('/');

	if (parseInt(stringOne[0]) === parseInt(stringTwo[0])) {
		//if same month
		if (parseInt(stringTwo[1]) - parseInt(stringOne[1]) < 7) {
			result = false;
		}
	} else {
		var daysInFirstMonth =
			daysInMonth(parseInt(stringOne[0]), new Date().getFullYear()) -
			parseInt(stringOne[1]);
		if (parseInt(daysInFirstMonth) + parseInt(stringTwo[1]) < 7) {
			result = false;
		}
	}
	return result;
}

export const processValidateCurrent = activity => {
	const currDateString = new Date().toLocaleDateString().trim();

	if (
		(activity.GoalFrequency === 'D' &&
			activity.LastGoalInit.trim() !== currDateString) ||
		(activity.GoalFrequency === 'W' &&
			areDifferentWeeks(activity.LastGoalInit, currDateString))
	) {
		var updatedActivity = JSON.parse(JSON.stringify(activity));
		updatedActivity.LastGoalInit = currDateString;
		updatedActivity.TodayLogs = 0;

		if (updatedActivity.TodayCount >= updatedActivity.GoalAmount) {
			updatedActivity.CurrentStreak = updatedActivity.CurrentStreak + 1;
			updatedActivity.TotalGoalsMet++;
			if (updatedActivity.CurrentStreak > updatedActivity.LongestStreak) {
				updatedActivity.LongestStreak = updatedActivity.CurrentStreak;
			}
		} else {
			updatedActivity.CurrentStreak = 0;
		}
		updatedActivity.TodayCount = 0;
		return updatedActivity;
	}

	return activity;
};

export const processLogActivity = (activityID, count) => {
	asyncLogActivity(activityID, new logJSON(count));
};

export const processDEBUG_UPDATE = (activities, update) => {
	if (update.length === 10) {
		for (var i in activities) {
			if (parseInt(activities[i].ActivityID) === parseInt(update[0])) {
				try {
					if (update[1] !== '-') activities[i].ActivityName = update[1];
					if (update[2] !== '-') activities[i].GoalAmount = parseInt(update[2]);
					if (update[3] !== '-')
						activities[i].CurrentStreak = parseInt(update[3]);
					if (update[4] !== '-')
						activities[i].HighestPeriod = parseInt(update[4]);
					if (update[5] !== '-')
						activities[i].TotalGoalsMet = parseInt(update[5]);
					if (update[6] !== '-') activities[i].GrandTotal = parseInt(update[6]);
					if (update[7] !== '-')
						activities[i].TotalLogCount = parseInt(update[7]);
					if (update[8] !== '-')
						activities[i].LongestStreak = parseInt(update[8]);
					if (update[9] !== '-') activities[i].Unit = update[9];
				} catch (e) {
					console.warn('Unable to update with values:');
				}
				break;
			}
		}
	} else {
		console.warn('Invalid update array length: ' + update.length);
	}

	return activities;
};
