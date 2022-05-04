/**
 * @flow strict-local
 * @format
 */

import {View} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { useGlobalState } from '../../state/activityState';

//Import Custom Styles
import Styles from '../style_sheet';

function kvPair(label, value) {
	this.label = label;
	this.value = value;
}

function parseActivityOptions(metadata) {
	var build = new Array();
	for (var i in metadata) {
		build.push(new kvPair(metadata[i].ActivityName, metadata[i].ActivityID));
	}
	return build;
}


const SelectActivity = () => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);

	const globalState = useGlobalState();
	/* DETERMINE HOW TO FILTER activityOptions
		USE activityOptions.ActivityID and activityOptions.ActivityName
		FOR DROPDOWN OPTIONS
	*/
	const activityOptions = globalState.getActivities();

	return (
		<View style={Styles.containerCenter}>
			<DropDownPicker
				open={open}
				value={globalState.getSelectedActivity()}
				items={parseActivityOptions(globalState.getActivities())}
				setOpen={setOpen}
				setValue={setValue}
				onChangeValue={() => {
					globalState.selectActivity(value);
					//updateCurrentSelection(value);
				}}
			/>
		</View>
	);
};

export default SelectActivity;
