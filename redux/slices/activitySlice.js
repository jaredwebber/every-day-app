import {createSlice} from '@reduxjs/toolkit';
import { addNewActivity, getStatisticsPublic, logActivity } from '../../data/local_async';

const activitySlice = createSlice({
	name: 'activities',
	initialState: {
		activities: [],
		selectedActivity: -1,
	},
	reducers: {
		addActivity(state, action) {
			const payload = action.payload;
			addNewActivity(payload.ActivityName, payload.GoalAmount, payload.GoalFrequency, payload.Unit);
			state.activities = getStatisticsPublic();
		},
		selectActivity(state, action) {
			//populate selectedActivity with activities[action.payload] where payload is ActivityID 
			state.selectedActivity = action.payload;
		},
		addLog(state, action) {
			logActivity(action.payload.ActivityID, action.payload.Count);
			state.activities = getStatisticsPublic();
		}
	},
});

export const { addActivity, selectActivity } = activitySlice.actions;

export default activitySlice.reducer;
