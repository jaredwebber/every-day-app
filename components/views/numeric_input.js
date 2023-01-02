/**
 * @flow strict-local
 * @format
 */

import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Styles from '../style_sheet';
import {Button} from '../tools/button';
import {LargeSpacer, SmallSpacer} from '../tools/spacers';
import Header from '../tools/header';
import {useGlobalStore} from '../../store/activity_store';
import SelectActivity from '../tools/select_activity';

var CurrentDate = []; //updated by getDate() function

function getMonth() {
	var curr = new Date();
	const MONTHS = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	return MONTHS[curr.getMonth()];
}

function getDay() {
	var curr = new Date();
	CurrentDate[0] = curr.getDate();
	if (CurrentDate[0] === 1 || CurrentDate[0] === 21 || CurrentDate[0] == 31) {
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

const NumericInput = () => {
	getDay();

	const [inputValue, updateInputValue] = useState(null);

	const store = useGlobalStore();
	const selectedActivity = store.getSelectedActivity();

	function validate(val) {
		try {
			return (
				!isNaN(val) &&
				val.trim().length !== 0 &&
				selectedActivity.ActivityID != -1 &&
				parseInt(val) > 0
			);
		} catch {
			return false;
		}
	}

	// debug,-,-,-,2,-,-,-,5,1/1/2023,-,-,-,-
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
			var items = val.split(',');
			for (var i = 1; i < items.length; i++) {
				updateArr.push(items[i].trim());
			}
			store.debugUpdate(updateArr);
		} catch (error) {
			console.warn(error);
		}
	};

	function debugDelete(inputValue) {
		if (inputValue == 'DELETE_ALL_DATA') {
			store.deleteStorage();
			store.selectActivity(-1);
			return true;
		}
		return false;
	}

	return (
		<View style={Styles.containerCenter}>
			<LargeSpacer />
			<LargeSpacer />

			<Header />

			<LargeSpacer />
			<Text style={[Styles.subTitleText]}> </Text>
			<SmallSpacer />

			<View zIndex={999} style={Styles.dropdownContainer}>
				<SelectActivity />
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
					Log{' '}
					{selectedActivity.ActivityID !== -1
						? selectedActivity.ActivityName
						: 'Activity'}{' '}
					for {getMonth()} {CurrentDate[0]}
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
				placeholder={
					'Number of ' +
					(selectedActivity.ActivityID !== -1
						? selectedActivity.Unit + 's'
						: 'Activity')
				}
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
				text={
					'Log ' +
					(selectedActivity.ActivityID !== -1
						? selectedActivity.ActivityName
						: 'Activity')
				}
				onPress={() => {
					if (debugUpdate(selectedActivity.ActivityID, inputValue)) {
						this.logInput.clear();
						displayAddedMsg('Debug: Attempted to Update Activity');
					} else if (debugDelete(inputValue)) {
						this.logInput.clear();
						displayAddedMsg('Debug: Deleted All Data');
					} else {
						if (validate(inputValue)) {
							store.logActivity(inputValue);
							this.logInput.clear();
							updateInputValue('');
							displayAddedMsg(
								'Logged ' +
									inputValue +
									' ' +
									selectedActivity.Unit +
									(inputValue > 1 ? 's' : ''),
							);
						} else {
							displayAddedMsg(
								'Make Sure All Fields Are Filled & Number Is Entered',
							);
						}
					}
					setTimeout(() => displayAddedMsg(''), 3000);
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
