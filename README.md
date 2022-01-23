# every-day-app

Habit tracker mobile app, take variable input not solely a checkmark for the day.
Though likely could accomodate Android as react-native is designed to be multi-platform, the current build is only functional on ios devices. 

Built Using [React Native](https://reactnative.dev) 

Startup (ios):  `npx run-ios`

### Priorities:
- Navigation between New Component, View Stats, Log Activity pages
- Select Activity Component
- Reminders/Notifications


### Eventually:
- Account for local time in NumericInput date display
- Make components & aesthetics scale with screen size
- Add option to edit previous logs 
- 'Select an activity to log, or add a new activity' options
  - if # of activities = 0, then only show new activity option?
    https://stackoverflow.com/questions/67571592/react-native-dropdown-picker-how-to-get-selected-index-from-items
- make seperate pages?
- Fix dark/light modes
- get rid of react-native startup screen
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

