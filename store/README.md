### Storage Organization:

- Storage key for metadata json object
```
    {
        ActivityID: {
            ActivityID = UNIQUE_UTC_TIME;
            ActivityName = NAME STRING;
            GoalAmount = INTEGER;
            CurrentStreak = INTEGER;
            HighestPeriod = INTEGER;
            TotalGoalsMet = INTEGER;
            GrandTotal = INTEGER;
            TotalLogCount = INTEGER;
            TodayCount = INTEGER;
            LastGoalInit = MONTH-DAY-YEAR;
            TodayLogs = INTEGER;
            LongestStreak = INTEGER;
            GoalFrequency = W or D;
            Unit = UNIT STRING;
        }
    }
```

- Storage key for activity logs: divided by ActivityID key
```
    {
        ActivityID: {
            UTC: utcOne,
            Count: numOne
        }
    }
```

**Constructors in `json_templates.js`**

[AsyncStorage Package](https://react-native-async-storage.github.io/async-storage/docs/usage)
