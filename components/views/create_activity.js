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
 import { LargeSpacer, MedSpacer } from '../tools/spacers';
import Header from '../tools/header';
import { Picker } from '@react-native-picker/picker';


var frequencyVal = 'D';
function setFrequencyVal(frequency){
    if(frequency === 'daily'){
        frequencyVal = 'D';
    }
    frequencyVal = 'W';
}


const CreateActivity = () => {
    const [activityName, updateName] = useState('noName');
    const [goalAmount, updateGoal] = useState(-1);
    const [unit, updateUnit] = useState('');
    const [frequency, updateFrequency] = useState('daily');


    return (

        <View style = {Styles.containerCenter}>

            <LargeSpacer />
            <LargeSpacer />

             <Header />

             <Picker 
                selectedValue={frequency}
                onValueChange={(itemValue, itemIndex) => {updateFrequency(itemValue); setFrequencyVal(frequency)}}
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
                keyboardType='ascii-capable'
                placeholder='enter activity name'
                autoCapitalize='none'
                returnKeyType='done'
                onChangeText={activityName => updateName(activityName)}
            />

                <TextInput 
                style = {[
                    Styles.textInput
                ]}
                keyboardType='ascii-capable'
                placeholder='enter measurement unit' // (minutes, reps, ml, etc) - add in 'i' popup?
                autoCapitalize='none'
                returnKeyType='done'
                onChangeText={unit => updateUnit(unit)}
            />          

            <TextInput 
                style = {[
                    Styles.textInput
                ]}
                keyboardType='numeric'
                placeholder={'enter '+frequency+' goal amount'}
                returnKeyType='done'
                onChangeText={goalAmount => updateGoal(goalAmount)}
            />

                <LargeSpacer />

            <Button 
                text="create activity"
                onPress={()=> dbAccess.newActivityPublic(activityName,goalAmount, frequencyVal, unit)}
            />


       </View>
   );
 };
 

 
 export default CreateActivity;
 