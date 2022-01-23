/**
 * @format
 * @flow strict-local
 */

//React Components & Imports
import React from 'react';
import {
  View,
  SafeAreaView
} from 'react-native';

//Custom Components
import Styles from '../style_sheet';
import NumericInput from '../scenes/numeric_input';
import Header from '../tools/header';
import BackgroundImage from '../scenes/background_image';
import SelectActivity from '../scenes/select_activity';
import {SmallSpacer, MedSpacer, LargeSpacer} from '../tools/spacers';
import {Button, SplitButton} from '../tools/button';

//App Begin
const HardcodedView = () => {

  return (
    <View 
        style={Styles.pageContainer}
    >
        <BackgroundImage />
        
        <Header />

        <LargeSpacer />
        <LargeSpacer />
        <LargeSpacer />
        
        <LargeSpacer />
        <LargeSpacer />


        <NumericInput />

    </View>
  );

};

export default HardcodedView;
