### Todo List:
#### Priorities:
**Verify Fixes:**
- Fix logging: when new day rolls over, the first log of the day is added to previous days total
- Remove the ability to (attempt to) log deleted activities
**TODO:**
- Avoid repeated code for activity selection
  - Fix having to tap on dropdowns multiple times to refresh
- Find cleaner code options instead of using globals
  - stores?
- if # of activities = 0, have 'create an activity to begin' message on Stats & logging page
- Fix aesthetics overall (icons, graphics, scaling)
- Clean up README with steps to install, build & run app w/screenshot(s)

#### Tasks
- Add Reminders/Notifications
- Add option to edit previous logs
- Allow dark/light modes to work the same
- Allow editing current period/session stats
  - and edit name, unit, goal, etc of activities

#### TD
- Dont allow 2 activities with the same name
- Account for local time in NumericInput date display
- Decide when the week should start for weekly tasks instead of the second of initialization

#### Longterm Possibilities
- Cloud database, every task tracked which can be accessed/updated on different devices using guid?
- Add more task types:
  - taking a picture
  - writing a note
  - checkbox 
- View progress on calendar with red/green/yellow days well as a streak indicator
