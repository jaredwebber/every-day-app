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
    var formattedString = new Array();;

    for(i in global.metadata){
        if(global.metadata[i].ActivityID === id){
            if(global.metadata[i].GoalFrequency === 'W') frequency = 'weekly';

            formattedString.push(frequency +" stats:");

            formattedString.push(
                global.metadata[i].TodayCount + " of "+ global.metadata[i].GoalAmount + " "+
                metadata[i].Unit + "s completed\n"+
                "current streak: "+ global.metadata[i].CurrentStreak
            );

            formattedString.push("\n\nall time stats:");

            formattedString.push(
                "total of "+global.metadata[i].GrandTotal +" "+global.metadata[i].Unit+"s in "+
                global.metadata[i].TotalLogCount + " logs"+
                "\n" + frequency + " goal of " +
                global.metadata[i].GoalAmount + " " + global.metadata[i].Unit +"s achieved "+
                global.metadata[i].TotalGoalsMet+" times" +
                "\nlongest "+frequency+" streak "+ global.metadata[i].LongestStreak +
                "\nhighest goal period " + metadata[i].HighestPeriod
            );

            return formattedString;
        }
    }
    return formattedString;
}


const ViewStats = () => {

    const [output, updateOutput] = useState("null");

    const [selectedActivityStats, setSelected] = useState("");

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(global.selectionOptions);

    const [periodTitle, setPeriodTitle] = useState("");
    const [periodData, setPeriodData] = useState("");

    const [allTimeTitle, setAllTimeTitle] = useState("");
    const [allTimeData, setAllTimeData] = useState("");


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

            <LargeSpacer />

            
            <View 
            zIndex={999}
            style = {
                Styles.dropdownContainer
            }>
       
            <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={()=>{
                global.currentSelection=value; 
                var arr = displayStats(value)
                setPeriodTitle(arr[0]);
                setPeriodData(arr[1]);
                setAllTimeTitle(arr[2]);
                setAllTimeData(arr[3]);
            }}
            />

            </View>
            

            <LargeSpacer />

            <View style={Styles.containerCenter}>
                <Text
                zIndex={-1}
                style={Styles.subTitleText}
                >{periodTitle}</Text>

                <Text
                zIndex={-1}
                style={Styles.subTitleText}
                >{periodData}</Text>

                <Text
                zIndex={-1}
                style={Styles.subTitleText}
                >{allTimeTitle}</Text>

                <Text
                style={Styles.subSubTitleText}
                zIndex={-1}
                >{allTimeData}</Text>
            </View>
      </View>
    );
};

export default ViewStats;