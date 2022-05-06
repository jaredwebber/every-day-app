import AsyncStorage from '@react-native-async-storage/async-storage';

const METADATA_STORAGE_KEY = '@metadata';

export const asyncGetActivityMetadata = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem(METADATA_STORAGE_KEY);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		console.error('Error getting data [key: ' + METADATA_STORAGE_KEY + ']');
	}
};

export const asyncPostActivityMetadata = async activities => {
	try {
		const jsonValue = JSON.stringify(activities);
		await AsyncStorage.setItem(METADATA_STORAGE_KEY, jsonValue);
	} catch (e) {
		console.error(
			'Error storing data [key: ' +
				METADATA_STORAGE_KEY +
				', value: ' +
				activities +
				']',
		);
	}
};

export const asyncLogActivity = async (activityID, log) => {
	try {
		var logs = JSON.parse(await AsyncStorage.getItem(activityID));
		logs = logs != null ? logs : [];
		//console.log(logs);
		logs.push(log);
		await AsyncStorage.setItem(activityID, JSON.stringify(logs));
	} catch (error) {
		console.error(
			'Failed to log ActivityID: ' + activityID + ', value: ' + log + ']',
		);
	}
};

export const asyncDeleteAllStorage = async () => {
	var keys = await AsyncStorage.getAllKeys();

	for (var i in keys) {
		await AsyncStorage.removeItem(keys[i]).catch(err => console.error(err));
	}
	return true;
};

export const asyncGetAllData = async () => {
	var logs = [];
	var keys = await AsyncStorage.getAllKeys();
	//console.log(keys);
	try {
		logs = await AsyncStorage.multiGet(keys);
	} catch (error) {
		console.error(error);
	}
	return logs;
};
