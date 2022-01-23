/**
 * @flow strict-local
 * @format
 */

 import type {Node} from 'react';
 import {Text, View} from 'react-native';
 import React from 'react';

 //Import Custom Styles
 import Styles from '../style_sheet';

 //Import Custom Components
 import {Button, SplitButton} from '../tools/button'
 import {SmallSpacer, MedSpacer, LargeSpacer} from '../tools/spacers';

 
 const SelectActivity = () => {
   return (
    <View 
        style = {
            Styles.headerContainer
        }>
          <View style={Styles.row}  >
        
        <Text 
            style = {
                Styles.subSubTitleText
            }>  
            select activity
        </Text>

        <Button 
            text="+" 
            onPress={()=> console.log("select activity button")}
        />
        </View>
    </View>
   );
 }
 
 export default SelectActivity;
 