/**
 * @flow strict-local
 * @format
 */

import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {useGlobalStore} from '../../store/activityStore';
import Styles from '../style_sheet';

const SelectActivity = () => {
	const globalStore = useGlobalStore();

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(
		globalStore.getSelectedActivity().ActivityID,
	);
	const [items, setItems] = useState(globalStore.getActivities());

	useEffect(() => {
		console.log('select_activity.js');
		setValue(globalStore.getSelectedActivity().ActivityID);
	}, [globalStore.getSelectedActivity().ActivityID]);

	return (
		<View style={Styles.containerCenter}>
			<DropDownPicker
				schema={{label: 'ActivityName', value: 'ActivityID'}}
				open={open}
				value={value}
				items={items !== undefined ? items : []}
				setOpen={setOpen}
				setValue={setValue}
				setItems={setItems}
				onChangeValue={() => {
					globalStore.selectActivity(value);
				}}
			/>
		</View>
	);
};

export default SelectActivity;
