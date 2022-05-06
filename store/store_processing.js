import {asyncLogActivity} from './async_storage';
import {logJSON} from './json_templates';

function daysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
}

function areDifferentWeeks(dateStringOne, dateStringTwo) {
	var result = true;
	var stringOne = dateStringOne.split('-');
	var stringTwo = dateStringTwo.split('-');

	if (parseInt(stringOne[1]) === parseInt(stringTwo[1])) {
		//if same month
		if (parseInt(stringTwo[2]) - parseInt(stringOne[2]) < 7) {
			result = false;
		}
	} else {
		var daysInFirstMonth =
			daysInMonth(parseInt(stringOne[1]), new Date().getFullYear()) -
			parseInt(stringOne[2]);
		if (parseInt(daysInFirstMonth) + parseInt(stringTwo[2]) < 7) {
			result = false;
		}
	}
	return result;
}

export const processValidateCurrent = activity => {
	const currDateString = new Date().toLocaleDateString().trim();
	if (
		(activity.Frequency === 'D' &&
			activity.LastGoalInit.trim() !== currDateString) ||
		(activity.Frequency === 'W' &&
			areDifferentWeeks(activity.LastGoalInit, currDateString))
	) {
		activity.LastGoalInit = currDateString;
		activity.TodayLogs = 0;

		if (activity.TodayCount >= activity.GoalAmount) {
			activity.CurrentStreak = activity.CurrentStreak + 1;
			activity.TotalGoalsMet++;
			if (activity.CurrentStreak > activity.LongestStreak) {
				activity.LongestStreak = activity.CurrentStreak;
			}
		} else {
			activity.CurrentStreak = 0;
		}
		activity.TodayCount = 0;
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
