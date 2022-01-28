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
    ScrollView,
    Linking
} from 'react-native';

 import React, {useState, useEffect} from 'react';

 //Import Custom Styles
 import Styles from '../style_sheet';

 //Functions to update/retrieve data
 var dbAccess = require('../../data/local_async.js')

 //Import Custom Components
 import {Button} from '../tools/button'
import { LargeSpacer } from '../tools/spacers';
import Header from '../tools/header';

import ViewStats from '../views/view_stats';

var GLOBAL = require('../../App')

const debugUpdateSteps = "go to log activity tab & select activity to update\n"+
        "use the format:\n\ndebug,Name,Goal,currentStreak,highestPeriod,totalGoalsMet,Total,totalLogs,longestStreak, unit\n\n"+
        "to insert the updated values you wish to store in that activity, any fields you dont want to change use a -"+
        "\nExample: once ive gone to the log tab, and selected the activity I want to update: id could type:\n"+
        "\ndebug,newName,-,30,180,30,3200,150,-,-"+
        "\n\nwhich would change the name of the activity to newName, the currStreak to 30, etc";

 var curr = null;

 const refresh = async() =>{
     curr = await dbAccess.DUMP_DATA_DEBUG();
     this.DebugDisplay.setNativeProps({text:curr});
     return curr;
 }

 const showDebugEditSteps = async() =>{
    this.DebugDisplay.setNativeProps({text:debugUpdateSteps});
 }

const Settings = () => {
    const [output, updateOutput] = useState("null");

    return (

        <View style = {Styles.containerCenter}>

            <LargeSpacer />
            <LargeSpacer />

            <Header />

            <Text
                style = {[
                    Styles.padItem, 
                    Styles.subSubTitleText
                ]}>
                User Settings[tbd]
                
            </Text>

            <Text
                style = {[
                    Styles.padItem, 
                    Styles.subSubTitleText
                ]}>
                (Debug) Settings
                
            </Text>

            <Button 
                onPress={()=>{refresh();}}
                text={"data dump"}
            />

            <Button 
                onPress={()=>{dbAccess.CLEAR_DATA_DEBUG(); refresh();}}
                text={"clear all data"}
            />

            < Button 
                onPress={()=>{Linking.openURL('mailto:jaredwebberdev@gmail.ca?body='+ JSON.stringify(global.metadata)+'&subject=DataDump'); console.log(global.metadata)}}
                text={"export metadata"}
            />  

            < Button 
                onPress={()=>{showDebugEditSteps()}}
                text={"update activity log/history"}
            />  

            <ScrollView>
                <TextInput 
                editable={false} 
                ref={component=> this.DebugDisplay=component}
                multiline = {true}
                /> 
            </ScrollView>
      </View>
    );
};

export default Settings;