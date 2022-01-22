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

//Custom Components
import Styles from './components/style_sheet';
import NumericInput from './components/scenes/numeric_input';
import Header from './components/tools/header';
import BackgroundImage from './components/scenes/background_image';
import SelectActivity from './components/scenes/select_activity';
import {SmallSpacer, MedSpacer, LargeSpacer} from './components/tools/spacers';


//App Begin
const App: () => Node = () => {


  return (
    <View style = {Styles.pageContainer}>
        <BackgroundImage />
        
        <Header />

        <LargeSpacer />
        <LargeSpacer />
        <LargeSpacer />

        <SelectActivity />

        <LargeSpacer />
        <LargeSpacer />
        <LargeSpacer />
        <LargeSpacer />


        <NumericInput />



    </View>
  );

};

export default App;
