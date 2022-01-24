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
      >
        <Tab.Screen 
          name='View Stats' 
          component={ViewStats} 
        />
        <Tab.Screen 

          name='Log Activity' 
          component={NumericInput} 
        />
        <Tab.Screen 
          name='New Activity' 
          
          component={CreateActivity} 
        />
        <Tab.Screen 
          name='Settings' 
          
          component={Settings} 
        />
      </Tab.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

