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

 import React, {useState, useEffect} from 'react';

 //Import Custom Styles
 import Styles from '../style_sheet';

 //Functions to update/retrieve data
 var dbAccess = require('../../data/local_async.js')

 var GLOBAL = require('../../index')

 import DropDownPicker from 'react-native-dropdown-picker';

 //Import Custom Components
 import {Button} from '../tools/button'
import { LargeSpacer, MedSpacer, SmallSpacer} from '../tools/spacers';
import SelectActivity from '../tools/select_activity';
import Header from '../tools/header';
import { checkForUnsupportedNode } from 'npm/lib/utils/unsupported';
import { out } from 'react-native/Libraries/Animated/Easing';

var curr = "temp";

function updateSelectedActivity(val){
    this.TextDisplay.setNativeProps({text:val});
}

function getActivityName(id){
    for(i in global.selectionOptions){
        if(global.selectionOptions[i].value === id){
            return global.selectionOptions[i].label;
        }
    }
}

function getActivityUnit(id){
    for(i in global.metadata){
        if(global.metadata[i].ActivityID === id){
            return global.metadata[i].Unit;
        }
    }
}

function displayStats(id){
    var frequency = 'daily';
    var formattedString = "";

    for(i in global.metadata){
        if(global.metadata[i].ActivityID === id){
            if(global.metadata[i].GoalFrequency === 'W') frequency = 'weekly';

            formattedString = 

                frequency +" stats:"+
                "\ncompleted " + global.metadata[i].TodayCount + " of "+ global.metadata[i].GoalAmount + " "+
                metadata[i].Unit + " in " + metadata[i].TodayLogs +" logs\n"+
                "current streak: "+ global.metadata[i].CurrentSteak+


                "\n\nall time stats: \n" +               
                "you've reached your " + frequency + " goal of " +
                global.metadata[i].GoalAmount + " " + global.metadata[i].Unit +"s "+
                global.metadata[i].TotalGoalsMet+" times." +
                "\nlongest streak: "+ global.metadata[i].LongestStreak + " in "+
                global.metadata[i].TotalLogs + " times logged"+
                "\nhighest goal period " + metadata[i].HighestPeriod


    

            return formattedString;
        }
    }
    return formattedString;
}


const ViewStats = () => {

    const [output, updateOutput] = useState("null");

    const [selectedActivityStats, setSelected] = useState("null");

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(global.selectionOptions);

    useEffect(() => {
        GLOBAL.refreshMetadata();
        setItems(global.selectionOptions);
    }, [global.selectionOptions])

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

            
            <View 
            style = {
                Styles.containerCenter
            }>
       
            <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={()=>{global.currentSelection=value; setSelected(displayStats(value))}}
            />

            </View>
            

            <LargeSpacer />
            <LargeSpacer />
            <LargeSpacer />
            <LargeSpacer />
            <LargeSpacer />
            <LargeSpacer />
            <LargeSpacer />
            <LargeSpacer />


            <Text>{selectedActivityStats}</Text>

            <ScrollView>
                <TextInput 
                editable={false} 
                ref={component=> this.TestDisplay=component}
                multiline = {true}
                placeholder='results display below'
                /> 
            </ScrollView>
      </View>
    );
};

export default ViewStats;