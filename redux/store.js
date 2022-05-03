import {configureStore} from '@reduxjs/toolkit';
import activitySlice from './slices/activitySlice';

export const store = configureStore({
	reducer: {
		activities: activitySlice,
	},
});
