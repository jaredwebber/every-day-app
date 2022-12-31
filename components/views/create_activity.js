/**
 * @flow strict-local
 * @format
 */

import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Styles from '../style_sheet';
import {Button} from '../tools/button';
import {LargeSpacer} from '../tools/spacers';
import Header from '../tools/header';
import {Picker} from '@react-native-picker/picker';
import {useGlobalStore} from '../../store/activity_store';

function getFrequency(string) {
	if (string === 'Daily') {
		return 'D';
	}
	return 'W';
}

function displayAddedMsg(msg) {
	this.ConfirmMessageCreate.setNativeProps({placeholder: msg});
}

function isNameUnique(name, existingActivities) {
	var nameIsUnique = true;
	existingActivities.forEach(activity => {
		if (name.trim() === activity.ActivityName) nameIsUnique = false;
	});
	return nameIsUnique;
}

function validate(name, unit, goal, existingActivities) {
	var valid = true;
	try {
		if (name.trim().length === 0) valid = false;
		if (unit.trim().length === 0) valid = false;
		if (
			isNaN(goal) ||
			goal.trim().length === 0 ||
			parseInt(goal) <= 0 ||
			!isNameUnique(name, existingActivities)
		)
			valid = false;
	} catch {
		return false;
	}
	return valid;
}

const CreateActivity = () => {
	const [activityName, updateName] = useState('nullname');
	const [goalAmount, updateGoal] = useState(-1);
	const [unit, updateUnit] = useState('');
	const [frequency, updateFrequency] = useState('D');
	const [frequencyString, updateFrequencyString] = useState('Daily');

	const store = useGlobalStore();

	return (
		<View style={Styles.containerCenter}>
			<LargeSpacer />
			<LargeSpacer />

			<Header />

			<LargeSpacer />
			<LargeSpacer />
			<LargeSpacer />

			<View style={Styles.pickerContainer}>
				<Picker
					selectedValue={frequencyString}
					onValueChange={itemValue => {
						updateFrequencyString(itemValue);
						updateFrequency(getFrequency(itemValue));
					}}
					style={{height: 10, width: 200}}
					prompt="pick a frequency">
					<Picker.Item label={'Daily'} value={'Daily'} key={'D'} />
					<Picker.Item label={'Weekly'} value={'Weekly'} key={'W'} />
				</Picker>
			</View>

			<Text style={Styles.subTitleText}>Add New Activity</Text>

			<LargeSpacer />
			<LargeSpacer />
			<LargeSpacer />
			<LargeSpacer />
			<LargeSpacer />
			<LargeSpacer />
			<LargeSpacer />

			<TextInput
				style={[Styles.textInput]}
				placeholderTextColor={'#404040'}
				keyboardType="ascii-capable"
				placeholder="Enter Activity Name"
				autoCapitalize="none"
				returnKeyType="done"
				onChangeText={activityName => updateName(activityName.trim())}
				ref={input => {
					this.nameInput = input;
				}}
			/>

			<TextInput
				style={[Styles.textInput]}
				placeholderTextColor={'#404040'}
				keyboardType="ascii-capable"
				placeholder="Enter Measurement Unit" // (minutes, reps, ml, etc) - add in 'i' popup?
				autoCapitalize="none"
				returnKeyType="done"
				onChangeText={unit => updateUnit(unit)}
				ref={input => {
					this.unitInput = input;
				}}
			/>

			<TextInput
				style={[Styles.textInput]}
				placeholderTextColor={'#404040'}
				keyboardType="numeric"
				placeholder={'Enter ' + frequencyString + ' Goal Amount'}
				returnKeyType="done"
				onChangeText={goalAmount => updateGoal(goalAmount)}
				ref={input => {
					this.goalInput = input;
				}}
			/>

			<LargeSpacer />

			<Button
				text="Create Activity"
				onPress={() => {
					if (validate(activityName, unit, goalAmount, store.getActivities())) {
						store.newActivity(activityName, goalAmount, frequency, unit);
						this.goalInput.clear();
						this.unitInput.clear();
						this.nameInput.clear();
						updateGoal(null);
						updateName(null);
						updateUnit(null);
						displayAddedMsg('Added ' + activityName);
					} else {
						displayAddedMsg(
							'Make Sure All Fields Are Filled\n  And Activity Name Is Unique',
						);
					}
					setTimeout(() => displayAddedMsg(''), 3000);
				}}
			/>

			<TextInput
				editable={false}
				ref={component => (this.ConfirmMessageCreate = component)}
				multiline={true}
			/>
		</View>
	);
};

export default CreateActivity;
