/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

//Old Data Storage Globals
import { getStatisticsPublic } from './data/local_async';

export var metadata = null;
export var selectionOptions = [];
export var currentSelection = null;

export const refreshMetadata = async () => {
	var metadataPulled = await getStatisticsPublic();
	metadata = metadataPulled;
	if (metadata == null || metadata == undefined) currentSelection = null;
	parseActivityOptions(metadata);
};

export const updateCurrentSelection = (newVal) => {
	currentSelection = newVal;
};

function kvPair(label, value) {
	this.label = label;
	this.value = value;
}

function parseActivityOptions(metadata) {
	var build = new Array();
	for (var i in metadata) {
		build.push(new kvPair(metadata[i].ActivityName, metadata[i].ActivityID));
	}
	selectionOptions = build;
}
