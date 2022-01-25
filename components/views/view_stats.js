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

const ViewStats = () => {

    const [output, updateOutput] = useState("null");

    const [selectedActivity, setSelected] = useState("null");

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
            onChangeValue={()=>{global.currentSelection=value; setSelected(value)}}
            />

            </View>
            

            <LargeSpacer />

            <Text>{selectedActivity}</Text>

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