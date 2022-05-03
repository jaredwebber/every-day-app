/**
 * @format
 * @flow strict-local
 */

//React Components & Imports
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
//import { Provider } from 'react-redux';
import RootNavigator from './components/scenes/root_navigator';
//import store from './redux/store';

/*
 * https://reactnavigation.org/docs/tab-based-navigation
 */

//App Begin
const App = () => {
	return (
		//<Provider store={store}>
		<GestureHandlerRootView style={{flex: 1}}>
			<RootNavigator />
		</GestureHandlerRootView>
		//</Provider>
	);
};

export default App;
