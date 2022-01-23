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

 

const CreateActivity = () => {
    const [activityName, updateName] = useState('noName');
    const [goalAmount, updateGoal] = useState(-1);

    return (

        <View style = {Styles.containerCenter}>
            <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start'
          }}>

            <Text
            style={Styles.subTitleText}
            >
                add new daily activity
            </Text>

            </View>


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
                keyboardType='numeric'
                placeholder='enter daily goal'
                returnKeyType='done'
                onChangeText={goalAmount => updateGoal(goalAmount)}
            />

            <Button 
                text="create activity"
                onPress={()=> dbAccess.newActivityPublic(activityName,goalAmount)}
            />


       </View>
   );
 };
 

 
 export default CreateActivity;
 