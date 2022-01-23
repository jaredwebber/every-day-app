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
    View
} from 'react-native';

 import React, {useState} from 'react';

 //Import Custom Styles
 import Styles from '../style_sheet';

 //Functions to update/retrieve data
 var dbAccess = require('../../data/local_async.js')

 //Import Custom Components
 import {Button} from '../tools/button'

 
var ActivityName = "pushups";//get from selection/db
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

const NumericInput = () => {
    const [inputValue, updateInputValue] = useState('');
    getDay();
    return (

        <View style = {Styles.containerCenter}>
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
                log {ActivityName} for {getMonth()} {CurrentDate[0]}
                
                
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
                placeholder='enter number here'
                returnKeyType='done'
                onChangeText={inputValue => updateInputValue(inputValue)}
            />

            <Button 
                text={"log "+ActivityName} 
                onPress={()=> dbAccess.logActivityPublic("ActivityID",inputValue)}
            />


       </View>
   );
 };
 

 
 export default NumericInput;
 