
const initialState = {
	ActivityID: -1,
	ActivityName: '',
	GoalAmount: -1,
	CurrentStreak: -1,
	HighestPeriod: -1,
	TotalGoalsMet: -1,
	GrandTotal: -1,
	TotalLogCount: -1,
	TodayCount: -1,
	LastGoalInit: -1,
	TodayLogs: -1,
	LongestStreak: -1,
	GoalFrequency: '',
	Unit: '',
};

// eslint-disable-next-line no-unused-vars
const selectedActivityReducer = (state = initialState, action) => {
	return state;
};

export default selectedActivityReducer;
