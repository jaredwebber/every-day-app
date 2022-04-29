import { ADD_ACTIVITY } from "../actions/types";

const initialState = {
    activityName: '',
    goalAmount: 0,
    frequency: '',
    unit: 0,
    activities: []
};

const activityReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_ACTIVITY:
            return {
                ...state,
                activities: state.activities.concat({
                    key: Math.random(),
                    value: action.payload
                })
            }
            default:
                return state;
    }
}

export default activityReducer;