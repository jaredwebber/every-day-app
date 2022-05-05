/**
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigator from './components/scenes/root_navigator';
import {getStatisticsPublic} from './data/local_async';
import {useGlobalStore} from './store/activityStore';

const App = () => {
	const store = useGlobalStore();
	useEffect(() => {
		getStatisticsPublic().then(response => store.updateActivities(response));
	});

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<RootNavigator />
		</GestureHandlerRootView>
	);
};

export default App;
