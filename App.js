/**
 * @format
 * @flow strict-local
 */

//React Components & Imports
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigator from './components/scenes/root_navigator';
//import { getStatisticsPublic } from './data/local_async';
//import { useGlobalState } from './state/activityState';
/*
 * https://reactnavigation.org/docs/tab-based-navigation
 */

//App Begin
const App = () => {
	//const loadData = useGlobalState().updateActivities(getStatisticsPublic());
	//console.log(loadData);
	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<RootNavigator />
		</GestureHandlerRootView>
	);
};

export default App;
