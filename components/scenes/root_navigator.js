import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//View Components
import NumericInput from '../views/numeric_input';
import ViewStats from '../views/view_stats';
import CreateActivity from '../views/create_activity';
import Settings from '../views/settings';

import {refreshMetadata} from '../..';

const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
	switch (route.name) {
	case 'view stats':
		return <Ionicons name={'stats-chart-outline'} color={color} size={24} />;
	case 'log activity':
		return <MaterialIcons name={'track-changes'} color={color} size={24} />;
	case 'new activity':
		return <Ionicons name={'add'} color={color} size={24} />;
	case 'settings':
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
				<Tab.Screen
					name="view stats"
					component={ViewStats}
					onPress={refreshMetadata()}
				/>
				<Tab.Screen
					onPress={refreshMetadata()}
					name="log activity"
					component={NumericInput}
				/>
				<Tab.Screen
					name="new activity"
					onPress={refreshMetadata()}
					component={CreateActivity}
				/>
				<Tab.Screen
					name="settings"
					onPress={refreshMetadata()}
					component={Settings}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default RootNavigator;
