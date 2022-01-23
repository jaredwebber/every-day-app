/**
 * @format
 * @flow strict-local
 */

//React Components & Imports
import React from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  ScrollView
} from 'react-native';

//Custom Components
import Styles from '../style_sheet';
import NumericInput from '../scenes/numeric_input';
import Header from '../tools/header';
import BackgroundImage from '../scenes/background_image';
import SelectActivity from '../scenes/select_activity';
import {SmallSpacer, MedSpacer, LargeSpacer} from '../tools/spacers';
import {Button, SplitButton} from '../tools/button';

import CreateActivity from '../scenes/create_activity';
import { useState } from 'react';

const dbAccess = require('../../data/local_async');

var curr = null;

const updateStats = async() =>{
  curr = JSON.stringify(await dbAccess.getStatisticsPublic());
  this._MyComponent.setNativeProps({text:curr});
}

//App Begin
const HardcodedView = () => {
  const [output, updateOutput] = useState("null");

  return (
    <View 
        style={Styles.pageContainer}
    >
        <BackgroundImage />

        <MedSpacer />
        
        <Header />

        <LargeSpacer />
        <LargeSpacer />


        <NumericInput />
        <LargeSpacer />

        <CreateActivity />


        <LargeSpacer />

        <Button 
        onPress={()=>{dbAccess.DUMP_DATA_DEBUG(); updateStats();}}
        text={"dump"}
        />

<ScrollView>
    <TextInput 
    editable={false} 
    ref={component=> this._MyComponent=component}
    multiline = {true}
    /> 
    </ScrollView>


    </View>
  );

};

export default HardcodedView;
