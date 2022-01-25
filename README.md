# every-day-app

Habit tracker mobile app, take variable input not solely a checkmark for the day.  
Though likely could accomodate Android as react-native is designed to be multi-platform, the current build is tested on ios. 

Built Using [React Native](https://reactnative.dev) 

Startup (ios):  `npx run-ios`

### Priorities:
- Stat display page
- Input validation on buttons
  - make sure fields are filled with expected type
  - dont allow 2 activities with the same name.trim()
- Reminders/Notifications


### Eventually:
- TD: 
  - Avoid repeated code for activity selection
  - Find cleaner code options instead of using globals?
- Account for local time in NumericInput date display
- Make components & aesthetics scale with screen size
- Add option to edit previous logs 
  - and edit name, unit, goal, etc of metadata
- if # of activities = 0, have 'create a recurring activity to begin' message 
- Fix dark/light modes
- cloud db(?) and each every day task being tracked is associated with a key which can be saved and re-accessed?
- any kind of every day task
  - taking a picture
  - writing a note
  - checkbox 
- can have a character requirement in order to be complete or numeric >= or just completion for note and photo
- view progress on calendar with red/green/yellow days (yellow being attempted but not completed) as well as a streak indicator


### App Init Steps
On Mac, target ios

```
brew install node
brew install watchman
```
Setup XCode Command Line Tools

`sude gem install cocoapods`

`npx react-native init ProjectName`

Open XCode project and update
- Display Name
- Bundle Identifier
- App Icons

