/**
 * @format
 * @flow strict-local
 */

//React Components & Imports
import React from 'react';
import type {Node} from 'react';
import {
  View,
  SafeAreaView
} from 'react-native';

//Custom Views
import CompleteView from './components/views/complete';
import HardcodedView from './components/views/hardcoded';

//App Begin
const App: () => Node = () => {

  return (
    <HardcodedView />
  );

};

export default App;

