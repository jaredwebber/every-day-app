/**
 * @flow strict-local
 * @format
 */

 import {Text, View} from 'react-native';
 import React, {useState} from 'react';

 import {Picker} from '@react-native-picker/picker';

 //Import Custom Styles
 import Styles from '../style_sheet';

 //Import Custom Components
 import {Button, SplitButton} from './button'
 import {SmallSpacer, MedSpacer, LargeSpacer} from './spacers';


 const SelectActivity = (onChangeFunc) => {
    const [selectedActivity, setSelected] = useState();
   return (
    <View 
        style = {
            Styles.containerCenter
        }>
       
        <Picker 
            selectedValue={selectedActivity}
            onValueChange={(itemValue, itemIndex) => {setSelected(itemValue)}}
            style={{height: 30, width: 200}} 
            prompt='pick an activity'
        >

            <Picker.Item label={"label"} value={"1"} />
            <Picker.Item label={"label"} value={"2"} />
            <Picker.Item label={"label"} value={"3"} />
            <Picker.Item label={"label"} value={"4"} />
            <Picker.Item label={"label"} value={"5"} />
            <Picker.Item label={"label"} value={"6"} />

        </Picker>


    </View>
   );
 }
 
 export default SelectActivity;
 