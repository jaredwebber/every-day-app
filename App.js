/**
 * @format
 * @flow strict-local
 */

//React Components & Imports
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//View Components
import Home from './components/views/home';
import NumericInput from './components/views/numeric_input';
import ViewStats from './components/views/view_stats'
import CreateActivity from './components/views/create_activity';
import Settings from './components/views/settings';

const dbAccess = require('./data/local_async.js')

var GLOBAL = require('./index')


const Tab = createBottomTabNavigator();

/*
 * https://reactnavigation.org/docs/tab-based-navigation
 */


//App Begin
const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{headerShown:false}}
        //change order of Tab.Screens if values not loading
      >
        <Tab.Screen 
          name='view stats' 
          component={ViewStats} 
          onPress={GLOBAL.refreshMetadata()}
        />
        <Tab.Screen 
          onPress={GLOBAL.refreshMetadata()}
          name='log activity' 
          component={NumericInput} 
        />
        <Tab.Screen 
          name='new activity' 
          onPress={GLOBAL.refreshMetadata()}
          component={CreateActivity} 
        />
        <Tab.Screen 
          name='settings' 
          onPress={GLOBAL.refreshMetadata()}
          component={Settings} 
        />
      </Tab.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

