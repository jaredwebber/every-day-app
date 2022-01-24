/**
 * @flow strict-local
 * @format
 */

 import type {Node} from 'react';
 import {
    Pressable,
    RefreshControl,
    Text, 
    TextInput,  
    View,
    ScrollView
} from 'react-native';

 import React, {useState} from 'react';

 //Import Custom Styles
 import Styles from '../style_sheet';

 //Functions to update/retrieve data
 var dbAccess = require('../../data/local_async.js')

 //Import Custom Components
 import {Button} from '../tools/button'
import { LargeSpacer, MedSpacer } from '../tools/spacers';
import SelectActivity from '../tools/select_activity';
import Header from '../tools/header';
import { checkForUnsupportedNode } from 'npm/lib/utils/unsupported';

 var curr = null;

const updateStats = async() =>{
    curr = await dbAccess.getStatisticsPublic();
    updateSelectedActivity();
}

function updateSelectedActivity(){
    this._MyComponent.setNativeProps({text:curr});
}


const ViewStats = () => {

    const [output, updateOutput] = useState("null");

    return (

        <View style = {Styles.containerCenter}>

            <LargeSpacer />
            <LargeSpacer />

            <Header />

            <LargeSpacer />

            <Text
                style = {[
                    Styles.subTitleText
                ]}>
                view your stats
            </Text>

            

            <SelectActivity />

            <LargeSpacer />
            <LargeSpacer />
            <LargeSpacer />
            <LargeSpacer />
            <LargeSpacer />
            <LargeSpacer />
            <LargeSpacer />
            <LargeSpacer />
            <LargeSpacer />

            <ScrollView>
                <TextInput 
                editable={false} 
                ref={component=> this._MyComponent=component}
                multiline = {true}
                placeholder='results display below'
                /> 
            </ScrollView>
      </View>
    );
};

export default ViewStats;