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

 import React, {useState, useEffect} from 'react';

 //Import Custom Styles
 import Styles from '../style_sheet';

 //Functions to update/retrieve data
 var dbAccess = require('../../data/local_async.js')

 //Import Custom Components
 import {Button} from '../tools/button'
 import { LargeSpacer, MedSpacer, SmallSpacer } from '../tools/spacers';
import Header from '../tools/header';
import { Picker } from '@react-native-picker/picker';
import { validatePathConfig } from '@react-navigation/native';

var GLOBAL = require('../../index')

function getFrequency(string){
    if(string === 'daily'){
        return 'D';
    }
    return 'W';
}

function displayAddedMsg(msg){
    this.ConfirmMessageCreate.setNativeProps({placeholder:msg});
}

function validate(name, unit, goal){
    var valid = true;
    try{
        if(name.trim().length === 0) valid = false;
        if(unit.trim().length === 0) valid = false;
        if(isNaN(goal) || goal.trim().length === 0 || parseInt(goal)<=0) valid = false;
    }
    catch{return false;}
    return valid;
}


const CreateActivity = () => {
    const [activityName, updateName] = useState('nullname');
    const [goalAmount, updateGoal] = useState(-1);
    const [unit, updateUnit] = useState('');
    const [frequency, updateFrequency] = useState('D');
    const [frequencyString, updateFrequencyString] = useState('daily');


    useEffect(() => {
        // write your code here, it's like componentWillMount
        GLOBAL.refreshMetadata();
        //console.log("\n\n\nin view or something\n\n\n")
    }, [])
    


    return (

        <View style = {Styles.containerCenter}>

            <LargeSpacer />
            <LargeSpacer />

             <Header />

             <Picker 
                selectedValue={frequencyString}
                onValueChange={(itemValue, itemIndex) => {updateFrequencyString(itemValue); updateFrequency(getFrequency(itemValue))}}
                style={{height: 30, width: 200}} 
                prompt='pick a frequency'
            >
                <Picker.Item label={"Daily"} value={"daily"}  key={'D'}/>
                <Picker.Item label={"Weekly"} value={"weekly"} key={'W'}/>

             </Picker>

            <Text
            style={Styles.subTitleText}
            >
                add new activity
            </Text>


            
             <LargeSpacer />
             <LargeSpacer />
             <LargeSpacer />
             <LargeSpacer />
             <LargeSpacer />
             <MedSpacer />

            <TextInput 
                style = {[
                    Styles.textInput
                ]}
                placeholderTextColor={"#404040"}
                keyboardType='ascii-capable'
                placeholder='enter activity name'
                autoCapitalize='none'
                returnKeyType='done'
                onChangeText={activityName => updateName(activityName.trim())}
                ref={input => { this.nameInput = input }}
            />

                <TextInput 
                style = {[
                    Styles.textInput
                ]}
                placeholderTextColor={"#404040"}
                keyboardType='ascii-capable'
                placeholder='enter measurement unit' // (minutes, reps, ml, etc) - add in 'i' popup?
                autoCapitalize='none'
                returnKeyType='done'
                onChangeText={unit => updateUnit(unit)}
                ref={input => { this.unitInput = input }}
            />          

            <TextInput 
                style = {[
                    Styles.textInput
                ]}
                placeholderTextColor={"#404040"}
                keyboardType='numeric'
                placeholder={'enter '+frequencyString+' goal amount'}
                returnKeyType='done'
                onChangeText={goalAmount => updateGoal(goalAmount)}
                ref={input => { this.goalInput = input }}
            />

                <LargeSpacer />

            <Button 
                text="create activity"
                onPress={()=> {
                    if(validate(activityName, unit, goalAmount)){
                        dbAccess.newActivityPublic(activityName,goalAmount, frequency, unit);
                        this.goalInput.clear();
                        this.unitInput.clear();
                        this.nameInput.clear();
                        updateGoal(null);
                        updateName(null);
                        updateUnit(null);
                        displayAddedMsg("added "+activityName);
                    }else{
                        displayAddedMsg("make sure all fields are filled")
                    }
                }}
            />

                <TextInput 
                editable={false} 
                ref={component=> this.ConfirmMessageCreate=component}
                multiline = {true}
                />          


       </View>
   );
 };
 

 
 export default CreateActivity;
 