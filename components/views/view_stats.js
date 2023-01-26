/**
 * @flow strict-local
 * @format
 */

import React, {useEffect, useState} from 'react';
import {useGlobalStore} from '../../store/activity_store';
import SelectActivity from '../tools/select_activity';
import Styles from '../style_sheet';
import {LargeSpacer, SmallSpacer} from '../tools/spacers';
import Header from '../tools/header';
import ProgressBar from 'react-native-progress/Bar';
import {DataTable} from 'react-native-paper';

const ViewStats = () => {
	const store = useGlobalStore();

	const [activity, setActivity] = useState(store.getSelectedActivity());

	useEffect(() => {
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

			<Text style={[Styles.subTitleText]}>View Your Stats</Text>

			<SmallSpacer />

			<View zIndex={999} style={Styles.dropdownContainer}>
				<SelectActivity />
			</View>
			<LargeSpacer />
			{activity.ActivityID !== -1 ? (
				<View>
					<View style={Styles.bottomRule}>
						<Text zIndex={-1} style={Styles.subTitleText}>
							{activity.GoalFrequency === 'W' ? 'This Week' : 'Today'}
						</Text>
					</View>
					<LargeSpacer />
					<SmallSpacer />
					<View style={Styles.containerCenter}>
						<Text style={Styles.floatDown} zIndex={999}>
							{(
								parseFloat(activity.TodayCount / activity.GoalAmount) * 100
							).toFixed(0) + '%'}
						</Text>
						<ProgressBar
							color={
								activity.TodayCount >= activity.GoalAmount
									? '#00C764'
									: '#1273DE'
							}
							progress={
								activity.TodayCount > activity.GoalAmount
									? 1
									: activity.TodayCount / activity.GoalAmount
							}
							height={Styles.progressBar.height}
							width={Styles.progressBar.width}
							borderRadius={Styles.progressBar.borderRadius}
							zIndex={-1}
						/>
						<Text zIndex={-1} style={Styles.bodyText}>
							{activity.TodayCount +
								' of ' +
								activity.GoalAmount +
								' ' +
								activity.Unit +
								's in ' +
								activity.TodayLogs +
								' log' +
								(activity.TodayLogs == 1 ? '' : 's')}
						</Text>
					</View>
					<View style={Styles.bottomRule}>
						<Text zIndex={-1} style={Styles.subTitleText}>
							{'\n\nAll Time'}
						</Text>
					</View>
					<DataTable.Row>
						<DataTable.Cell style={Styles.firstColumn}>
							Total {activity.Unit}s
						</DataTable.Cell>
						<DataTable.Cell numeric>{activity.GrandTotal}</DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell style={Styles.firstColumn}>
							Total Logs
						</DataTable.Cell>
						<DataTable.Cell numeric>{activity.TotalLogCount}</DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell style={Styles.firstColumn}>
							Total Goals Met
						</DataTable.Cell>
						<DataTable.Cell numeric>{activity.TotalGoalsMet}</DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell style={Styles.firstColumn}>
							Current {activity.GoalFrequency == 'W' ? 'Weekly' : 'Daily'}{' '}
							Streak
						</DataTable.Cell>
						<DataTable.Cell numeric>{activity.CurrentStreak}</DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell style={Styles.firstColumn}>
							Longest {activity.GoalFrequency == 'W' ? 'Weekly' : 'Daily'}{' '}
							Streak
						</DataTable.Cell>
						<DataTable.Cell numeric>{activity.LongestStreak}</DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell style={Styles.firstColumn}>
							Highest Single {activity.GoalFrequency == 'W' ? 'Week' : 'Day'}
						</DataTable.Cell>
						<DataTable.Cell numeric>{activity.HighestPeriod}</DataTable.Cell>
					</DataTable.Row>
				</View>
			) : null}
		</View>
	);
};

export default ViewStats;
