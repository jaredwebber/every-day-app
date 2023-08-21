/**
 * @flow strict-local
 * @format
 */

import {Text, TextInput, View, ScrollView, Linking} from 'react-native';
import React from 'react';
import Styles from '../style_sheet';
import {Button} from '../tools/button';
import {LargeSpacer, MedSpacer} from '../tools/spacers';
import Header from '../tools/header';
import {useGlobalStore} from '../../store/activity_store';

//For Debugging Only
import {asyncGetAllData} from '../../store/async_storage';

const debugUpdateSteps =
  'go to log activity tab & select activity to update\n' +
  'use the format:\n\ndebug,ActivityName,GoalAmount,CurrentStreak,HighestPeriod,TotalGoalsMet,GrandTotal,TotalLogCount,' +
  'TodayCount,LastGoalInit,TodayLogs,LongestStreak,GoalFrequency,Unit\n\n' +
  'to insert the updated values you wish to store in that activity, any fields you dont want to change use a -';

var curr = null;

const refresh = async () => {
	curr = JSON.stringify(await asyncGetAllData()).replaceAll('\\', '');
	this.DebugDisplay.setNativeProps({text: curr});
	return curr;
};

const showDebugEditSteps = async () => {
	this.DebugDisplay.setNativeProps({text: debugUpdateSteps});
};

const showDebugDeleteDataSteps = async () => {
	this.DebugDisplay.setNativeProps({
		text: 'Enter \'DELETE_ALL_DATA\' in log activity tab',
	});
};

const showDebugDeleteActivitySteps = async () => {
	this.DebugDisplay.setNativeProps({
		text: 'Select activity to delete and enter \'DELETE_SELECTED\' in log activity tab',
	});
};

const Settings = () => {
	const store = useGlobalStore();

	return (
		<View style={Styles.containerCenter}>
			<LargeSpacer />
			<LargeSpacer />

			<Header />

			<Text style={[Styles.padItem, Styles.subSubTitleText]}>
				User Settings
			</Text>

			<Button
				onPress={() => {
					refresh();
				}}
				text={'Data Dump'}
			/>

			<Button
				onPress={() => {
					Linking.openURL(
						'mailto:?body=' +
						JSON.stringify(store.getActivities()) +
						'&subject=DataDump',
					);
				}}
				text={'Export Metadata'}
			/>

			<MedSpacer />
			<Text style={[Styles.subSubTitleText]}>View Instructions To:</Text>

			<Button
				onPress={() => {
					showDebugEditSteps();
				}}
				text={'Update Activity History'}
			/>

			<Button
				onPress={() => {
					showDebugDeleteDataSteps();
				}}
				text={'Delete All Data'}
			/>

			<Button
				onPress={() => {
					showDebugDeleteActivitySteps();
				}}
				text={'Delete Selected Activity'}
			/>

			<LargeSpacer />

			<ScrollView>
				<TextInput
					editable={false}
					ref={component => (this.DebugDisplay = component)}
					multiline={true}
				/>
			</ScrollView>
			<Text 
				onPress={() => {
					Linking.openURL(
						'https://www.flaticon.com/free-icons/cartoon',
					);
				}} 
				style={{color: '#0000EE'}}>App icon created by Freepik - Flaticon</Text>
		</View>
	);
};

export default Settings;
