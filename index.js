/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';

import configureStore from './redux/store';

AppRegistry.registerComponent(appName, () => App);

const store = configureStore();

const RNRedux = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);

export const metadataKey = '@metadata';

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
