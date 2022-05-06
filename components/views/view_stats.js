/**
 * @flow strict-local
 * @format
 */

import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useGlobalStore} from '../../store/activity_store';
import SelectActivity from '../tools/select_activity';
import Styles from '../style_sheet';
import {LargeSpacer, SmallSpacer} from '../tools/spacers';
import Header from '../tools/header';
import ProgressBar from 'react-native-progress/Bar';

const ViewStats = () => {
	const store = useGlobalStore();

	const [activity, setActivity] = useState(store.getSelectedActivity());

	useEffect(() => {
		console.log('select_activity.js');
		setActivity(store.getSelectedActivity());
	}, [
		store.getSelectedActivity().TodayCount,
		store.getSelectedActivity().ActivityID,
	]);

	return (
		<View style={Styles.containerCenter}>
			<LargeSpacer />
			<LargeSpacer />

			<Header />

			<LargeSpacer />

			<Text style={[Styles.subTitleText]}>view your stats</Text>

			<SmallSpacer />

			<View zIndex={999} style={Styles.dropdownContainer}>
				<SelectActivity />
			</View>

			<LargeSpacer />
			{activity.ActivityID !== -1 ? (
				<View>
					<View style={Styles.bottomRule}>
						<Text zIndex={-1} style={Styles.subTitleText}>
							{activity.GoalFrequency === 'W' ? 'this week' : 'today'}
						</Text>
					</View>

					<Text zIndex={-1} style={Styles.subSubTitleText}>
						{activity.TodayCount +
							' of ' +
							activity.GoalAmount +
							' ' +
							activity.Unit +
							's'}
					</Text>

					<View style={Styles.containerCenter}>
						<Text style={Styles.bodyText}>
							{(
								parseFloat(activity.TodayCount / activity.GoalAmount) * 100
							).toFixed(0) + '%'}
						</Text>
						<ProgressBar
							color={
								activity.TodayCount >= activity.GoalAmount ? 'green' : 'blue'
							}
							progress={
								activity.TodayCount > activity.GoalAmount
									? 1
									: activity.TodayCount / activity.GoalAmount
							}
							borderRadius={90}
							width={250}
							height={25}
						/>
					</View>

					<View style={Styles.bottomRule}>
						<Text zIndex={-1} style={Styles.subTitleText}>
							{'\n\nall time'}
						</Text>
					</View>

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
							'\ncurrent streak: ' +
							activity.CurrentStreak +
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
