/**
 * @flow strict-local
 * @format
 */

import {Text, TextInput, View} from 'react-native';

import React, {useState} from 'react';

//Import Custom Styles
import Styles from '../style_sheet';

//Functions to update/retrieve data
import {DEBUGupdate} from '../../data/local_async.js';
//Import Custom Components
import {Button} from '../tools/button';
import {LargeSpacer} from '../tools/spacers';
import Header from '../tools/header';
import {useGlobalState} from '../../state/activityState';

import SelectActivity from '../tools/select_activity';

var CurrentDate = []; //updated by getDate() function

function getMonth() {
	var curr = new Date();
	const MONTHS = [
		'january',
		'february',
		'march',
		'april',
		'may',
		'june',
		'july',
		'august',
		'september',
		'october',
		'november',
		'december',
	];
	return MONTHS[curr.getMonth()];
}

function getDay() {
	var curr = new Date();
	CurrentDate[0] = curr.getDate();
	if (CurrentDate[0] === 1 || CurrentDate[0] === 21) {
		CurrentDate[1] = 'st';
	} else if (CurrentDate[0] === 2 || CurrentDate[0] === 22) {
		CurrentDate[1] = 'nd';
	} else if (CurrentDate[0] === 3 || CurrentDate[0] === 23) {
		CurrentDate[1] = 'rd';
	} else if (CurrentDate[0] > 3 || CurrentDate[0] < 21 || CurrentDate[0] > 23) {
		CurrentDate[1] = 'th';
	}
}

function displayAddedMsg(msg) {
	this._MyComponent.setNativeProps({placeholder: msg});
}

function getActivityName(id, selectionOptions, metadata) {
	if (id === undefined || metadata === null) return 'activity';
	for (var i in selectionOptions) {
		if (selectionOptions[i].value === id) {
			return selectionOptions[i].label;
		}
	}
}

function debugUpdate(id, val) {
	if (val && val.substring(0, 5) === 'debug') {
		debugUpdateActivity(id, val);
		return true;
	}
	return false;
}

const debugUpdateActivity = async (id, val) => {
	try {
		var updateArr = new Array();

		updateArr.push(id);
		//debug,name,goal,currStreak,highestPeriod,totalGoalsMet,Total,TotalLogs,longestStreak, unit
		var items = val.split(',');
		for (var i = 1; i < items.length; i++) {
			updateArr.push(items[i].trim());
		}
		console.warn(updateArr);
		await DEBUGupdate(updateArr);
	} catch (error) {
		console.warn(error);
	}
};

const NumericInput = () => {
	getDay();

	const [activityUnit, updateUnit] = useState('activity');
	const [activityName, updateName] = useState('activity');

	const [inputValue, updateInputValue] = useState(null);

	const state = useGlobalState();

	function validate(val) {
		try {
			return (
				!isNaN(val) &&
				val.trim().length !== 0 &&
				state.getSelectedActivity() != -1 &&
				parseInt(val) > 0
			);
		} catch {
			return false;
		}
	}

	return (
		<View style={Styles.containerCenter}>
			<LargeSpacer />
			<LargeSpacer />

			<Header />

			<LargeSpacer />
			<LargeSpacer />
			<LargeSpacer />

			<View style={Styles.dropdownContainer}>
				<SelectActivity
					onChange={id => {
						if (id !== null && id !== 'null') {
							updateName(
								getActivityName(
									id,
									state.getActivityOptions(),
									state.getActivities(),
								),
							);
							updateUnit(getActivityName(id));
						}
					}}
				/>
			</View>

			<LargeSpacer />
			<LargeSpacer />
			<LargeSpacer />

			<View
				zIndex={-1}
				style={{
					flexDirection: 'row',
					alignItems: 'flex-start',
				}}>
				<Text style={[Styles.padItem, Styles.subTitleText]}>
					log {activityName} for {getMonth()} {CurrentDate[0]}
				</Text>
				<Text style={{lineHeight: 40, fontWeight: '600'}}>
					{CurrentDate[1]}
				</Text>
			</View>

			<TextInput
				style={[Styles.textInput]}
				placeholderTextColor={'#404040'}
				//keyboardType='numeric'
				keyboardType="default" //to be switched to numeric once debug update is changed
				placeholder={'number of ' + activityUnit}
				autoCorrect={false}
				autoCapitalize="none"
				returnKeyType="done"
				onChangeText={inputValue => updateInputValue(inputValue)}
				ref={input => {
					this.logInput = input;
				}}
			/>

			<LargeSpacer />

			<Button
				text={'log ' + activityName}
				onPress={() => {
					if (!debugUpdate(state.getSelectedActivity(), inputValue)) {
						if (validate(inputValue)) {
							state.logActivity(inputValue);
							this.logInput.clear();
							updateInputValue('');
							displayAddedMsg('logged ' + inputValue + ' ' + activityUnit);
						} else {
							displayAddedMsg(
								'make sure all fields are filled & number is entered',
							);
						}
					} else {
						this.logInput.clear();
						displayAddedMsg('debug: attempted to update activity');
					}
				}}
			/>

			<TextInput
				editable={false}
				ref={component => (this._MyComponent = component)}
				multiline={true}
			/>
		</View>
	);
};

export default NumericInput;
