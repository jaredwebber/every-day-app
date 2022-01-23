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
import Button from '../tools/button'


const ViewStats = () => {

return (

    <View style = {Styles.containerCenter}>

        <Text
            style = {[
                Styles.padItem, 
                Styles.subTitleText
            ]}>
            current {ActivityName} stats
            
        </Text>


    </View>
    );
};
 

 
export default ViewStats;
 