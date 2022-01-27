/**
 * @flow strict-local
 * @format
 */

 import {Node, useDebugValue} from 'react';
 import {
    Pressable,
    RefreshControl,
    Text, 
    TextInput,  
    View
} from 'react-native';

 import React, {useState, useEffect} from 'react';

 //Import Custom Styles
 import Styles from '../style_sheet';

 //Functions to update/retrieve data
 var dbAccess = require('../../data/local_async.js')

 //Import Custom Components
 import {Button} from '../tools/button'
 import { LargeSpacer } from '../tools/spacers';
import SelectActivity from '../tools/select_activity';
import Header from '../tools/header';

import DropDownPicker from 'react-native-dropdown-picker';
import { validatePathConfig } from '@react-navigation/native';


var GLOBAL = require('../../index')

var CurrentDate = [];//updated by getDate() function

function getMonth(){
    var curr = new Date();
    const MONTHS = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
    ]
    return MONTHS[curr.getMonth()];
}

function getDay(){
    var curr = new Date();
    CurrentDate[0] = curr.getDate();
    if(CurrentDate[0] === 1 || CurrentDate[0] === 21){
        CurrentDate[1] = "st";
    }else if(CurrentDate[0] === 2 || CurrentDate[0] === 22){
        CurrentDate[1] = "nd";
    }else if(CurrentDate[0] === 3 || CurrentDate[0] === 23){
        CurrentDate[1] = "rd";
    }else if(CurrentDate[0] > 3 || CurrentDate[0] < 21 || CurrentDate[0] >23){
        CurrentDate[1] = "th";
    }
}

function displayAddedMsg(unit, count){
    this._MyComponent.setNativeProps({placeholder:"logged "+count+" "+unit});
}

function getActivityName(id){
    if(id === undefined || global.metadata === null) return 'activity'
    for(i in global.selectionOptions){
        if(global.selectionOptions[i].value === id){
            return global.selectionOptions[i].label;
        }
    }
}

function getActivityUnit(id){
    if(id === undefined || global.metadata === null) return 'activity'
    for(i in global.metadata){
        if(global.metadata[i].ActivityID === id){
            return global.metadata[i].Unit;
        }
    }
}

function validate(val){
    return !isNaN(val) && val.trim().length !== 0; 
}

const NumericInput = () => {
    getDay();

    const [activityUnit, updateUnit] = useState('-');
    const [activityName, updateName] = useState("-");


    const [inputValue, updateInputValue] = useState(null);


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
        <LargeSpacer />
        <LargeSpacer />

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
        onChangeValue={()=>{
            global.currentSelection=value; 
            updateName(getActivityName(value));
            updateUnit(getActivityUnit(value));
        }}
        />

        </View>

        <LargeSpacer />
        <LargeSpacer />
        <LargeSpacer />


            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start'
                }}>
            <Text
                style = {[
                    Styles.padItem, 
                    Styles.subTitleText
                ]}>
                log {activityName} for {getMonth()} {CurrentDate[0]}
                
                
            </Text>
            <Text style={{lineHeight:40, fontWeight:'600'}}>
                    
                    {CurrentDate[1]}
                </Text>
                </View>


            <TextInput 
                style = {[
                    Styles.textInput
                ]}
                keyboardType='numeric'
                placeholder={'number of '+activityUnit}
                returnKeyType='done'
                onChangeText={inputValue => updateInputValue(inputValue)}
                ref={input => { this.logInput = input }}
            />

            <Button 
                text={"log "+activityName} 
                onPress={()=> {
                    if(validate(inputValue)){
                        dbAccess.logActivityPublic(global.currentSelection, inputValue);
                        logInput.clear();
                        displayAddedMsg(activityName, inputValue);
                    }else{
                        //do anything?? - popup/message
                    }
                }}
            />

                <TextInput 
                editable={false} 
                ref={component=> this._MyComponent=component}
                multiline = {true}
                />  


       </View>
   );
 };
 

 
 export default NumericInput;
 