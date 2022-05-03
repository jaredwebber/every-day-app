/**
 * @format
 * @flow strict-local
 */

//React Components & Imports
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigator from './components/scenes/root_navigator';

/*
 * https://reactnavigation.org/docs/tab-based-navigation
 */

//App Begin
const App = () => {
	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<RootNavigator />
		</GestureHandlerRootView>
	);
};

export default App;
