### Goals for storage:
- get app working on local storage with plan below
- once working reliably, can add cloud (firebase?) db support & OAuth signin?

### Storage Organization:
- [HARDCODED] Storage key for metadata json object (need enclosing around objects?)
    {
        "ActivityID - One":{
            "ActivityName": "One",
            "GoalAmount": -1,
            "CurrentStreak": -1,
            "GrandTotal": -1,
            "LogCount": -1,
            "TodayDate": "DAY-MONTH-YEAR",
            "TodayCount": -1,
            "TodayLogs": -1
        },
        "ActivityID - Two":{
            "ActivityName": "Two",
            "GoalAmount": -1,
            "CurrentStreak": -1,
            "GrandTotal": -1,
            "LogCount": -1,
            "TodayDate": "DAY-MONTH-YEAR",
            "TodayCount": -1,
            "TodayLogs": -1
        },
    }
- Storage key for activity logs: divided by activity - key is activityID?
    - Make activityIDs some sort of hash(?) or at least like 3 characters
    {
        {
            "UTC": utcOne,
            "Count": numOne
        },
        {
            "UTC": utcTwo,
            "Count": numTwo
        },
    }


### Add Export Data option to email(?) yourself a csv(?) with all your user data

### DECIDE WHAT FUNCTIONS MUST BE ASYNC & FIGURE OUT THE DELAY ON SOME REPEATED CALLS
- Start using the promise returns from async functions to determine when to continue