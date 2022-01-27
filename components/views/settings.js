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
    View,
    ScrollView,
    Linking
} from 'react-native';

 import React, {useState, useEffect} from 'react';

 //Import Custom Styles
 import Styles from '../style_sheet';

 //Functions to update/retrieve data
 var dbAccess = require('../../data/local_async.js')

 //Import Custom Components
 import {Button} from '../tools/button'
import { LargeSpacer } from '../tools/spacers';
import Header from '../tools/header';

import ViewStats from '../views/view_stats';

var GLOBAL = require('../../App')


 var curr = null;

 const refresh = async() =>{
     curr = await dbAccess.DUMP_DATA_DEBUG();
     this.DebugDisplay.setNativeProps({text:curr});
     return curr;
 }


 function sendEmail(){
    
 }

const Settings = () => {
    const [output, updateOutput] = useState("null");

    return (

        <View style = {Styles.containerCenter}>

            <LargeSpacer />
            <LargeSpacer />

            <Header />

            <Text
                style = {[
                    Styles.padItem, 
                    Styles.subTitleText
                ]}>
                User Settings
                [tbd]
                
            </Text>

            <LargeSpacer />
            <LargeSpacer />
            <LargeSpacer />
            <LargeSpacer />


            <Text
                style = {[
                    Styles.padItem, 
                    Styles.subSubTitleText
                ]}>
                (Debug) Settings
                
            </Text>

            <Button 
                onPress={()=>{refresh();}}
                text={"data dump"}
            />

            <Button 
                onPress={()=>{dbAccess.CLEAR_DATA_DEBUG(); refresh();}}
                text={"clear all data"}
            />

            < Button 
                onPress={()=>{Linking.openURL('mailto:jaredwebberdev@gmail.ca?body='+ JSON.stringify(global.metadata)+'&subject=DataDump'); console.log(global.metadata)}}
                text={"export metadata"}
            />  

            < Button 
                onPress={console.log("allow import of json")}
                text={"import data (not yet)"}
            />  

            <ScrollView>
                <TextInput 
                editable={false} 
                ref={component=> this.DebugDisplay=component}
                multiline = {true}
                /> 
            </ScrollView>
      </View>
    );
};

export default Settings;