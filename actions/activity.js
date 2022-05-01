import {ADD_ACTIVITY, GET_ACTIVITY_METADATA} from '/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import metadataKey from '../index';

export const addActivity = activity => {
	return {
		type: ADD_ACTIVITY,
		payload: activity,
	};
};

export const getActivityMetadata = () => {
	return async dispatch => {
		const response = await AsyncStorage.getItem(metadataKey);
		if (response.data) {
			dispatch({
				type: GET_ACTIVITY_METADATA,
				payload: JSON.parse(response.data),
			});
		} else {
			console.warn('Unable to retrieve activities');
		}
	};
};
