/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';

import configureStore from './store'

AppRegistry.registerComponent(appName, () => App);

const store = configureStore();

const RNRedux = () => (
    <Provider store= { store }>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);

//Old Data Storage Globals
import dbAccess from './data/local_async'

global.metadata = null;
global.selectionOptions = [];
global.currentSelection = null;

module.exports.refreshMetadata = async() =>{
    var metadata = await dbAccess.getStatisticsPublic();
    global.metadata = metadata;
    if(metadata == null || metadata == undefined) global.currentSelection = null;
    parseActivityOptions(metadata);
}

function kvPair(label, value){
    this.label = label;
    this.value = value;
}

function parseActivityOptions(metadata){
    var build = new Array();
    for(i in metadata){
        //console.warn(new kvPair(metadata[i].ActivityName, metadata[i].ActivityID))
        build.push(new kvPair(metadata[i].ActivityName, metadata[i].ActivityID))
    }
    global.selectionOptions = build;
}

