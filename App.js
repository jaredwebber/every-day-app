/**
 * @format
 * @flow strict-local
 */

import React, {useRef, useEffect} from 'react';
import {useGlobalStore} from './store/activity_store';
import {AppState} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigator from './components/scenes/root_navigator';

const App = () => {
	const initialLoad = false;
	const store = useGlobalStore();

	useEffect(() => {
		store.populateStore();
	}, [initialLoad]);

	const appState = useRef(AppState.currentState);

	useEffect(() => {
		const subscription = AppState.addEventListener('change', nextAppState => {
			if (
				appState.current.match(/inactive|background/) &&
				nextAppState === 'active'
			) {
				console.log('App has come to the foreground!');
				store.tryUpdatePeriod();
			}

			appState.current = nextAppState;
			console.log('AppState', appState.current);
		});

		return () => {
			subscription.remove();
		};
	}, []);

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<RootNavigator />
		</GestureHandlerRootView>
	);
};

export default App;
