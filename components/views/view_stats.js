/* eslint-disable no-unused-vars */
/**
 * @flow strict-local
 * @format
 */

import {Text, View} from 'react-native';

// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import {useGlobalState} from '../../state/activityState';
import SelectActivity from '../tools/select_activity';

//Import Custom Styles
import Styles from '../style_sheet';

//Import Custom Components
import {LargeSpacer} from '../tools/spacers';
import Header from '../tools/header';

function displayStats(id, metadata) {
	var frequency = 'daily';
	var formattedString = new Array();

	for (var i in metadata) {
		if (metadata[i].ActivityID === id) {
			if (metadata[i].GoalFrequency === 'W') frequency = 'weekly';

			formattedString.push(frequency + ' stats:');

			formattedString.push(
				metadata[i].TodayCount +
					' of ' +
					metadata[i].GoalAmount +
					' ' +
					metadata[i].Unit +
					's completed\n' +
					'current streak: ' +
					metadata[i].CurrentStreak,
			);

			formattedString.push('\n\nall time stats:');

			formattedString.push(
				'total of ' +
					metadata[i].GrandTotal +
					' ' +
					metadata[i].Unit +
					's in ' +
					metadata[i].TotalLogCount +
					' logs' +
					'\n' +
					frequency +
					' goal of ' +
					metadata[i].GoalAmount +
					' ' +
					metadata[i].Unit +
					's achieved ' +
					metadata[i].TotalGoalsMet +
					' times' +
					'\nlongest ' +
					frequency +
					' streak ' +
					metadata[i].LongestStreak +
					'\nhighest goal period ' +
					metadata[i].HighestPeriod,
			);

			return formattedString;
		}
	}
	return formattedString;
}

const ViewStats = () => {
	const [periodTitle, setPeriodTitle] = useState('');
	const [periodData, setPeriodData] = useState('');

	const [allTimeTitle, setAllTimeTitle] = useState('');
	const [allTimeData, setAllTimeData] = useState('');

	const state = useGlobalState();

	return (
		<View style={Styles.containerCenter}>
			<LargeSpacer />
			<LargeSpacer />

			<Header />

			<LargeSpacer />

			<Text style={[Styles.subTitleText]}>view your stats</Text>

			<LargeSpacer />

			<View zIndex={999} style={Styles.dropdownContainer}>
				<SelectActivity
					/*onChange={value => {
						var arr = displayStats(value, state.getActivities());
						setPeriodTitle(arr[0]);
						setPeriodData(arr[1]);
						setAllTimeTitle(arr[2]);
						setAllTimeData(arr[3]);
					}}*/
					onChange={val => console.log(val)}
				/>
			</View>

			<LargeSpacer />

			<View style={Styles.containerCenter}>
				<Text zIndex={-1} style={Styles.subTitleText}>
					{periodTitle}
				</Text>

				<Text zIndex={-1} style={Styles.subTitleText}>
					{periodData}
				</Text>

				<Text zIndex={-1} style={Styles.subTitleText}>
					{allTimeTitle}
				</Text>

				<Text style={Styles.subSubTitleText} zIndex={-1}>
					{allTimeData}
				</Text>
			</View>
		</View>
	);
};

export default ViewStats;
