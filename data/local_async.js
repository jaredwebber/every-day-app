//Local Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//AsyncStorage key for metadata
const META_KEY = '@metadata';

//params constants: logActivity function
const UPDATE = 'update';
const LOG = 'log';

//param constants: Activity Frequency
const DAY = 'D';
const WEEK = 'W';

//local copy of metadata from async to be used between modifications
var metadataCodeCopy = null;

//local copy of activityLog being manipulated
var currActivityLog = null;

//JSON objects
function metadataObject(name, goal, frequency, unit) {
	var date = new Date();
	this.ActivityID = date.getTime().toString();
	this.ActivityName = name;
	this.GoalAmount = goal;
	this.CurrentStreak = 0;
	this.HighestPeriod = 0;
	this.TotalGoalsMet = 0;
	this.GrandTotal = 0;
	this.TotalLogCount = 0;
	this.TodayCount = 0;
	this.LastGoalInit = date.toLocaleDateString();
	this.TodayLogs = 0;
	this.LongestStreak = 0;
	this.GoalFrequency = frequency;
	this.Unit = unit;
}

function activityLogObject(count) {
	this.utc = new Date().getTime().toString();
	this.count = count;
}

// Direct Data Manipulation
const storeData = async (key, value) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (e) {
		console.error(
			'Error storing data [key: ' + key + ', value: ' + value + ']',
		);
	}
};

const getData = async key => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		console.error('Error getting data [key: ' + key + ']');
	}
};

const pullMetadataAsync = async () => {
	//set metadata GLOBAL JSON with all metadata from async
	await getData(META_KEY)
		.then(data => {
			metadataCodeCopy = data;
		})
		.catch(err => console.warn(err));
};

const pushMetadataAsync = async () => {
	//set async metadata with GLOBAL JSON values
	await storeData(META_KEY, metadataCodeCopy)
		.then(() => {
			console.warn('completed push');
		})
		.catch(err => console.warn(err));
};

const pushActivityLogAsync = async ActivityID => {
	//push updated json array to activityID
	await storeData(ActivityID, currActivityLog)
		.then(() => {
			return true;
		})
		.catch(err => console.warn(err));
};

const pullActivityLogAsync = async ActivityID => {
	//set metadata GLOBAL JSON with all metadata from async
	await getData(ActivityID)
		.then(data => {
			currActivityLog = data;
		})
		.catch(err => console.error(err));
};

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

// Interaction Functions
const verifyInGoalSpan = async () => {
	await pullMetadataAsync();

	var needsPush = false; //if span is not within bounds, then must push to storage
	var currDateString = new Date().toLocaleDateString().trim();

	if (metadataCodeCopy !== null) {
		for (var i in metadataCodeCopy) {
			if (metadataCodeCopy[i].GoalFrequency === DAY) {
				//console.warn("meta: "+metadataCodeCopy[i].LastGoalInit);
				//console.warn("curr: "+currDateString);

				if (metadataCodeCopy[i].LastGoalInit.trim() !== currDateString) {
					needsPush = true;
					//console.warn("not equal dates")
				}
			} else if (metadataCodeCopy[i].GoalFrequency === WEEK) {
				if (
					areDifferentWeeks(metadataCodeCopy[i].LastGoalInit, currDateString)
				) {
					needsPush = true;
				}
			}

			if (needsPush) {
				metadataCodeCopy[i].LastGoalInit = currDateString;
				metadataCodeCopy[i].TodayLogs = 0;

				if (metadataCodeCopy[i].TodayCount >= metadataCodeCopy[i].GoalAmount) {
					metadataCodeCopy[i].TotalGoalsMet++;
					metadataCodeCopy[i].CurrentStreak =
						metadataCodeCopy[i].CurrentStreak + 1;
					if (
						metadataCodeCopy[i].LongestStreak <
						metadataCodeCopy[i].CurrentStreak
					) {
						metadataCodeCopy[i].LongestStreak =
							metadataCodeCopy[i].CurrentStreak;
					}
				} else {
					metadataCodeCopy[i].CurrentStreak = 0;
				}
				metadataCodeCopy[i].TodayCount = 0;

				console.warn('after');
				console.warn(metadataCodeCopy);
				await pushMetadataAsync();

				//TO REMOVE?
				await pullMetadataAsync();
			}
		}
	} else {
		console.warn('code metadata is null (verifyPresentDay)');
		// updateCurrentSelection(null);
	}
};

const updateActivityLog = async (ActivityID, Count, type) => {
	//update metadata in accordance with date
	await verifyInGoalSpan();

	var activityFound = false;
	var error = false;

	if (ActivityID === undefined || Count === undefined) {
		console.error('Invalid params LogActivity');
		error = true;
	}

	//update metadataCodeCopy values
	if (!error && type === LOG) {
		if (metadataCodeCopy !== null) {
			for (var i in metadataCodeCopy) {
				if (parseInt(metadataCodeCopy[i].ActivityID) === parseInt(ActivityID)) {
					activityFound = true;

					//update metadata with values
					metadataCodeCopy[i].TodayCount =
						parseInt(metadataCodeCopy[i].TodayCount) + parseInt(Count);
					metadataCodeCopy[i].TodayLogs =
						parseInt(metadataCodeCopy[i].TodayLogs) + 1;
					metadataCodeCopy[i].GrandTotal =
						parseInt(metadataCodeCopy[i].GrandTotal) + parseInt(Count);
					metadataCodeCopy[i].TotalLogCount =
						parseInt(metadataCodeCopy[i].TotalLogCount) + 1;

					if (
						metadataCodeCopy[i].TodayCount > metadataCodeCopy[i].HighestPeriod
					) {
						metadataCodeCopy[i].HighestPeriod = metadataCodeCopy[i].TodayCount;
					}

					await pushMetadataAsync();

					await pullActivityLogAsync(ActivityID);
					//add new Log object
					currActivityLog.push(new activityLogObject(Count));
					await pushActivityLogAsync(ActivityID);
					return metadataCodeCopy;
				}
			}
		} else {
			console.warn('metadata code null (logActivity)');
			error = true;
		}
	} else if (!error && type === UPDATE) {
		console.error('Update not implemented');
		//find activityID
		//TodayCount=Count
		error = true;
	} else {
		console.error('unexpected logActivity \'type\' param');
		error = true;
	}

	if (!activityFound) console.warn('ActivityID: ' + ActivityID + ' not found');
	return !error;
};

//Functions accessible to external files
export const logActivityAsync = async (ActivityID, Count) => {
	return await updateActivityLog(ActivityID, Count, LOG);
};

export const addNewActivity = async (
	ActivityName,
	GoalAmount,
	GoalFrequency,
	Unit,
) => {
	await pullMetadataAsync();

	if (metadataCodeCopy === null) {
		metadataCodeCopy = new Array();
	}

	var newMeta = new metadataObject(
		ActivityName,
		parseInt(GoalAmount),
		GoalFrequency,
		Unit,
	);
	metadataCodeCopy.push(newMeta);

	currActivityLog = new Array();

	await pushActivityLogAsync(newMeta.ActivityID);
	await pushMetadataAsync();
};

//TODO: Implementation
export const updateTodayTotalPublic = async (ActivityID, updatedTotal) => {
	await updateActivityLog(ActivityID, updatedTotal, UPDATE);
};

//TODO: Implementation
export const exportData = async () => {
	//find way to make all async storage data presentable & exportable
	//make possible to auto-export data? on a daily/weekly/whatever schedule? - upload to cloud as csv?
};

export const DEBUGupdate = async update => {
	if (update.length === 10) {
		await pullMetadataAsync();

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
};

export const DUMP_DATA_DEBUG = async () => {
	var keys = await AsyncStorage.getAllKeys();

	var dump = '';

	for (var i in keys) {
		await getData(keys[i])
			.then(data => {
				dump += keys[i] + ': ' + JSON.stringify(data) + ', ';
			})
			.catch(err => console.warn(err));
	}

	return dump;
};

export const CLEAR_DATA_DEBUG = async () => {
	// updateCurrentSelection(null);
	var keys = await AsyncStorage.getAllKeys();

	for (var i in keys) {
		await AsyncStorage.removeItem(keys[i])
			.then(() => {})
			.catch(err => console.error(err));
	}
};

// Will be made redundant once redux stores implemented
export const getStatisticsPublic = async () => {
	await pullMetadataAsync();
	return metadataCodeCopy;
};
