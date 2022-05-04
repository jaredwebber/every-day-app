/**
 * @flow strict-local
 * @format
 */

import {Text, View} from 'react-native';

import React, {useState, useEffect} from 'react';
import { useGlobalState } from '../../state/activityState';

//Import Custom Styles
import Styles from '../style_sheet';

import {
	selectionOptions,
	metadata,
	refreshMetadata,
	updateCurrentSelection,
} from '../../index';

import DropDownPicker from 'react-native-dropdown-picker';

//Import Custom Components
import {LargeSpacer} from '../tools/spacers';
import Header from '../tools/header';
//import SelectActivity from '../tools/select_activity';

function displayStats(id) {
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
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState(selectionOptions);

	const [periodTitle, setPeriodTitle] = useState('');
	const [periodData, setPeriodData] = useState('');

	const [allTimeTitle, setAllTimeTitle] = useState('');
	const [allTimeData, setAllTimeData] = useState('');

	useEffect(() => {
		refreshMetadata();
		setItems(selectionOptions);
	}, [selectionOptions]);


	const state = useGlobalState();

	console.log(state.getSelectedActivity());

	return (
		<View style={Styles.containerCenter}>
			<LargeSpacer />
			<LargeSpacer />

			<Header />

			<LargeSpacer />

			<Text style={[Styles.subTitleText]}>view your stats</Text>

			{/* <SelectActivity /> */}

			<LargeSpacer />

			<View zIndex={999} style={Styles.dropdownContainer}>
				<DropDownPicker
					open={open}
					value={value}
					items={items}
					setOpen={setOpen}
					setValue={setValue}
					setItems={setItems}
					onChangeValue={() => {
						updateCurrentSelection(value);
						var arr = displayStats(value);
						setPeriodTitle(arr[0]);
						setPeriodData(arr[1]);
						setAllTimeTitle(arr[2]);
						setAllTimeData(arr[3]);
						state.selectActivity(value);
					}}
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
