/**
 * @flow strict-local
 * @format
 */

import {Text, TextInput, View, ScrollView, Linking} from 'react-native';
import React from 'react';
import Styles from '../style_sheet';
import {Button} from '../tools/button';
import {LargeSpacer} from '../tools/spacers';
import Header from '../tools/header';
import {useGlobalStore} from '../../store/activity_store';

//For Debugging Only
import { asyncGetAllData } from '../../store/async_storage';

const debugUpdateSteps =
	'go to log activity tab & select activity to update\n' +
	'use the format:\n\ndebug,Name,Goal,currentStreak,highestPeriod,totalGoalsMet,Total,totalLogs,longestStreak, unit\n\n' +
	'to insert the updated values you wish to store in that activity, any fields you dont want to change use a -' +
	'\nExample: once ive gone to the log tab, and selected the activity I want to update: id could type:\n' +
	'\ndebug,newName,-,30,180,30,3200,150,-,-' +
	'\n\nwhich would change the name of the activity to newName, the currStreak to 30, etc';

var curr = null;

const refresh = async () => {
	curr = (JSON.stringify(await asyncGetAllData())).replaceAll('\\', '');
	this.DebugDisplay.setNativeProps({text: curr});
	return curr;
};

const showDebugEditSteps = async () => {
	this.DebugDisplay.setNativeProps({text: debugUpdateSteps});
};

const Settings = () => {
	const store = useGlobalStore();

	return (
		<View style={Styles.containerCenter}>
			<LargeSpacer />
			<LargeSpacer />

			<Header />

			<Text style={[Styles.padItem, Styles.subSubTitleText]}>
				User Settings[tbd]
			</Text>

			<Text style={[Styles.padItem, Styles.subSubTitleText]}>
				(Debug) Settings
			</Text>

			<Button
				onPress={() => {
					refresh();
				}}
				text={'data dump'}
			/>

			<Button
				onPress={() => {
					store.deleteStorage();
					store.selectActivity(-1);
					refresh();
				}}
				text={'clear all data'}
			/>

			<Button
				onPress={() => {
					Linking.openURL(
						'mailto:jaredwebberdev@gmail.com?body=' +
							JSON.stringify(store.getActivities()) +
							'&subject=DataDump',
					);
				}}
				text={'export metadata'}
			/>

			<Button
				onPress={() => {
					showDebugEditSteps();
				}}
				text={'update activity log/history'}
			/>

			<ScrollView>
				<TextInput
					editable={false}
					ref={component => (this.DebugDisplay = component)}
					multiline={true}
				/>
			</ScrollView>
		</View>
	);
};

export default Settings;
