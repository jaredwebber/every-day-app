export const activityJSON = (name, goal, frequency, unit) => {
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
};

export const logJSON = (count) => {
	this.utc = new Date().getTime().toString();
	this.count = count;
};
