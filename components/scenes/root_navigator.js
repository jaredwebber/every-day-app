/**
 * @flow strict-local
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NumericInput from '../views/numeric_input';
import ViewStats from '../views/view_stats';
import CreateActivity from '../views/create_activity';
import Settings from '../views/settings';

const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
	switch (route.name) {
	case 'View Stats':
		return <Ionicons name={'stats-chart-outline'} color={color} size={24} />;
	case 'Log Activity':
		return <MaterialIcons name={'track-changes'} color={color} size={24} />;
	case 'New Activity':
		return <Ionicons name={'add'} color={color} size={24} />;
	case 'Settings':
		return <Ionicons name={'settings-outline'} color={color} size={24} />;
	default:
		break;
	}
};

const RootNavigator = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="BooksList"
				screenOptions={({route}) => ({
					tabBarIcon: ({color}) => screenOptions(route, color),
					headerShown: false,
					showLabel: false,
					inactiveTintColor: '#2D3038',
					activeTintColor: '#FFFFFF',
					style: {
						height: '10%',
						backgroundColor: '#1E1B26',
					},
				})}>
				<Tab.Screen name='New Activity' component={CreateActivity} />
				<Tab.Screen name='View Stats' component={ViewStats} />
				<Tab.Screen name='Log Activity' component={NumericInput} />
				<Tab.Screen name='Settings' component={Settings} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default RootNavigator;
