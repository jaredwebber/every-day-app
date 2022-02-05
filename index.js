/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import dbAccess from './data/local_async'

AppRegistry.registerComponent(appName, () => App);

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
