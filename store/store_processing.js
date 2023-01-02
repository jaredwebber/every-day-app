import {asyncLogActivity} from './async_storage';
import {logJSON} from './json_templates';

function daysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
}

function areDifferentWeeks(dateStringOne, dateStringTwo) {
	var result = true;
	// simulator dates formatted MM/DD/YYYY, while ios devices use YYYY-MM-DD
	var stringOne = dateStringOne.split(/|-/);
	var stringTwo = dateStringTwo.split(/|-/);

	var monthOne = -1;
	var monthTwo = -1;
	var dayOne = -1;
	var dayTwo = -1;

	if (stringOne[0].length == 4) {
		monthOne = parseInt(stringOne[1]);
		monthTwo = parseInt(stringTwo[1]);
		dayOne = parseInt(stringOne[2]);
		dayTwo = parseInt(stringTwo[2]);
	} else {
		monthOne = parseInt(stringOne[0]);
		monthTwo = parseInt(stringTwo[0]);
		dayOne = parseInt(stringOne[1]);
		dayTwo = parseInt(stringTwo[1]);
	}

	if (monthOne == monthTwo) {
		if (dayTwo - dayOne < 7) {
			result = false;
		}
	} else {
		var daysInFirstMonth =
			daysInMonth(monthOne, new Date().getFullYear()) - dayOne;
		if (parseInt(daysInFirstMonth) + dayTwo < 7) {
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
	if (update.length === 14) {
		for (var i in activities) {
			if (parseInt(activities[i].ActivityID) === parseInt(update[0])) {
				try {
					if (update[1] !== '-') {
						activities[i].ActivityName = update[1];
					}
					if (update[2] !== '-') {
						activities[i].GoalAmount = parseInt(update[2]);
					}
					if (update[3] !== '-') {
						activities[i].CurrentStreak = parseInt(update[3]);
					}
					if (update[4] !== '-') {
						activities[i].HighestPeriod = parseInt(update[4]);
					}
					if (update[5] !== '-') {
						activities[i].TotalGoalsMet = parseInt(update[5]);
					}
					if (update[6] !== '-') {
						activities[i].GrandTotal = parseInt(update[6]);
					}
					if (update[7] !== '-') {
						activities[i].TotalLogCount = parseInt(update[7]);
					}
					if (update[8] !== '-') {
						activities[i].TodayCount = parseInt(update[8]);
					}
					if (update[9] !== '-') {
						activities[i].LastGoalInit = update[9];
					}
					if (update[10] !== '-') {
						activities[i].TodayLogs = parseInt(update[10]);
					}
					if (update[11] !== '-') {
						activities[i].LongestStreak = parseInt(update[11]);
					}
					if (update[12] !== '-') {
						activities[i].GoalFrequency = update[12];
					}
					if (update[13] !== '-') {
						activities[i].Unit = update[13];
					}
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
