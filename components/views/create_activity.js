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
	if (string === 'daily') {
		return 'D';
	}
	return 'W';
}

function displayAddedMsg(msg) {
	this.ConfirmMessageCreate.setNativeProps({placeholder: msg});
}

function validate(name, unit, goal) {
	var valid = true;
	try {
		if (name.trim().length === 0) valid = false;
		if (unit.trim().length === 0) valid = false;
		if (isNaN(goal) || goal.trim().length === 0 || parseInt(goal) <= 0)
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
	const [frequencyString, updateFrequencyString] = useState('daily');

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
					<Picker.Item label={'Daily'} value={'daily'} key={'D'} />
					<Picker.Item label={'Weekly'} value={'weekly'} key={'W'} />
				</Picker>
			</View>

			<Text style={Styles.subTitleText}>add new activity</Text>

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
				placeholder="enter activity name"
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
				placeholder="enter measurement unit" // (minutes, reps, ml, etc) - add in 'i' popup?
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
				placeholder={'enter ' + frequencyString + ' goal amount'}
				returnKeyType="done"
				onChangeText={goalAmount => updateGoal(goalAmount)}
				ref={input => {
					this.goalInput = input;
				}}
			/>

			<LargeSpacer />

			<Button
				text="create activity"
				onPress={() => {
					if (validate(activityName, unit, goalAmount)) {
						store.newActivity(activityName, goalAmount, frequency, unit);
						this.goalInput.clear();
						this.unitInput.clear();
						this.nameInput.clear();
						updateGoal(null);
						updateName(null);
						updateUnit(null);
						displayAddedMsg('added ' + activityName);
					} else {
						displayAddedMsg('make sure all fields are filled');
					}
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
