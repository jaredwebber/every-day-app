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
import Header from '../tools/header';
import BackgroundImage from '../scenes/background_image';
import SelectActivity from '../tools/select_activity';
import {SmallSpacer, MedSpacer, LargeSpacer} from '../tools/spacers';
import {Button, SplitButton} from '../tools/button';

//App Begin
const Home = () => {

  return (
    <View style = {Styles.pageContainer}>
        <BackgroundImage />


        <LargeSpacer />
            <LargeSpacer />
            <LargeSpacer />
            <LargeSpacer />

        <Button


        />

    </View>
     
  );

};

export default Home;
