/**
 * @flow strict-local
 * @format
 */

import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useGlobalStore} from '../../store/activity_store';
import SelectActivity from '../tools/select_activity';
import Styles from '../style_sheet';
import {LargeSpacer} from '../tools/spacers';
import Header from '../tools/header';

const ViewStats = () => {
	const store = useGlobalStore();

	const [activity, setActivity] = useState(store.getSelectedActivity());

	useEffect(() => {
		console.log('select_activity.js');
		console.log(activity);
		setActivity(store.getSelectedActivity());
	}, [
		store.getSelectedActivity().TodayCount,
		store.getSelectedActivity.ActivityID,
	]);

	return (
		<View style={Styles.containerCenter}>
			<LargeSpacer />
			<LargeSpacer />

			<Header />

			<LargeSpacer />

			<Text style={[Styles.subTitleText]}>view your stats</Text>

			<LargeSpacer />

			<View zIndex={999} style={Styles.dropdownContainer}>
				<SelectActivity />
			</View>

			<LargeSpacer />
			{activity.ActivityID !== -1 ? (
				<View style={Styles.containerCenter}>
					<Text zIndex={-1} style={Styles.subTitleText}>
						{(activity.GoalFrequency === 'W' ? 'weekly' : 'daily') + ' stats: '}
					</Text>

					<Text zIndex={-1} style={Styles.subTitleText}>
						{activity.TodayCount +
							' of ' +
							activity.GoalAmount +
							' ' +
							activity.Unit +
							's completed\n' +
							'current streak: ' +
							activity.CurrentStreak}
					</Text>

					<Text zIndex={-1} style={Styles.subTitleText}>
						{'\n\nall time stats:'}
					</Text>

					<Text style={Styles.subSubTitleText} zIndex={-1}>
						{'total of ' +
							activity.GrandTotal +
							' ' +
							activity.Unit +
							's in ' +
							activity.TotalLogCount +
							' logs\n' +
							(activity.GoalFrequency == 'W' ? 'weekly' : 'daily') +
							' goal of ' +
							activity.GoalAmount +
							' ' +
							activity.Unit +
							's achieved ' +
							activity.TotalGoalsMet +
							' times' +
							'\nlongest ' +
							(activity.GoalFrequency === 'W' ? 'weekly' : 'daily') +
							' streak ' +
							activity.LongestStreak +
							'\nhighest goal period ' +
							activity.HighestPeriod}
					</Text>
				</View>
			) : null}
		</View>
	);
};

export default ViewStats;
