/**
 * @flow strict-local
 * @format
 */

 import type {Node} from 'react';
 import {
     Button,
    Pressable,
    RefreshControl,
    Text, 
    TextInput,  
    View
} from 'react-native';

 import React, {useState} from 'react';

 //Import Custom Styles
 import Styles from '../style_sheet';

 import updateDailyActivity from '../../data/db-access'

 
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
    if(curr === 1 || curr === 21){
        CurrentDate[1] = "st";
    }else if(curr === 2 || curr === 22){
        CurrentDate[1] = "nd";
    }else if(curr === 3 || curr === 23){
        CurrentDate[1] = "rd";
    }else if(curr > 3 || curr < 21 || curr >23){
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

            <Pressable 
                onPress={updateDailyActivity}
                style={Styles.buttonContainer}
                >
                <Text 
                    style={Styles.buttonText}
                    >
                    log {ActivityName}
                </Text>
            </Pressable>

       </View>
   );
 };
 

 
 export default NumericInput;
 