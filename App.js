/**
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigator from './components/scenes/root_navigator';
import {getStatisticsPublic} from './data/local_async';
import {useGlobalState} from './state/activityState';

const App = () => {
	const state = useGlobalState();
	useEffect(() => {
		getStatisticsPublic().then(response => state.updateActivities(response));
	});

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<RootNavigator />
		</GestureHandlerRootView>
	);
};

export default App;
