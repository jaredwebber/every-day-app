/* eslint-disable no-unused-vars */
import { asyncLogActivity } from './async_storage';
import { activityJSON, logJSON } from './json_templates';

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

export const processLogActivity = (activityID, count) => {
	asyncLogActivity(activityID, new logJSON(count));
};

export const processAddNewActivity = (name, amount, frequency, unit) => {

};

// TODO - Rework for stores
export const processDEBUG_UPDATE = (arr) => {
	/*
	if (update.length === 10) {
		for (var i in metadataCodeCopy) {
			if (parseInt(metadataCodeCopy[i].ActivityID) === parseInt(update[0])) {
				try {
					if (update[1] !== '-') metadataCodeCopy[i].ActivityName = update[1];
					if (update[2] !== '-')
						metadataCodeCopy[i].GoalAmount = parseInt(update[2]);
					if (update[3] !== '-')
						metadataCodeCopy[i].CurrentStreak = parseInt(update[3]);
					if (update[4] !== '-')
						metadataCodeCopy[i].HighestPeriod = parseInt(update[4]);
					if (update[5] !== '-')
						metadataCodeCopy[i].TotalGoalsMet = parseInt(update[5]);
					if (update[6] !== '-')
						metadataCodeCopy[i].GrandTotal = parseInt(update[6]);
					if (update[7] !== '-')
						metadataCodeCopy[i].TotalLogCount = parseInt(update[7]);
					if (update[8] !== '-')
						metadataCodeCopy[i].LongestStreak = parseInt(update[8]);
					if (update[9] !== '-') metadataCodeCopy[i].Unit = update[9];
					await pushMetadataAsync();
				} catch (e) {
					console.warn('Unable to update with values:');
					console.warn(update);
				}
				break;
			}
		}
	} else {
		console.warn('Invalid update array length: ' + update.length);
	}
	*/
};
