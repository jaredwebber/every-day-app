/**
 * @flow strict-local
 * @format
 */

 import type {Node} from 'react';
 import {Text, View} from 'react-native';
 import React from 'react';

 //Import Custom Styles
 import Styles from '../style_sheet';
 
 const SelectActivity = (): Node => {
   return (
    <View 
        style = {
            Styles.headerContainer
        }>

        <Text 
            style = {
                Styles.bodyText
            }>  
            selection of which activity to log/adjust
        </Text>

    </View>
   );
 };
 
 export default SelectActivity;
 