/**
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigator from './components/scenes/root_navigator';
import {useGlobalStore} from './store/activity_store';

const App = () => {
	const initialLoad = false;
	const store = useGlobalStore();

	useEffect(() => {
		store.populateStore();
	}, [initialLoad]);

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<RootNavigator />
		</GestureHandlerRootView>
	);
};

export default App;
