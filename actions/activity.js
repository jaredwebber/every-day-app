import { ADD_ACTIVITY } from "./types";

export const addActivity = activity => {
    return {
        type: ADD_ACTIVITY,
        payload: activity
    }
}