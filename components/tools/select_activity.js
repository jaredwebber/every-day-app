/**
 * @flow strict-local
 * @format
 */

import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {useGlobalStore} from '../../store/activity_store';
import Styles from '../style_sheet';

const SelectActivity = () => {
	const store = useGlobalStore();

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(store.getSelectedActivity().ActivityID);
	const [items, setItems] = useState(store.getActivities());

	useEffect(() => {
		console.log('select_activity.js');
		setValue(store.getSelectedActivity().ActivityID);
		setItems(store.getActivities());
	}, [store.getSelectedActivity().ActivityID, store.getActivities().length]);

	return (
		<View style={Styles.containerCenter}>
			<DropDownPicker
				schema={{label: 'ActivityName', value: 'ActivityID'}}
				open={open}
				value={value}
				items={(items !== undefined && items !== null) ? items : []}
				setOpen={setOpen}
				setValue={setValue}
				setItems={setItems}
				onChangeValue={() => {
					store.selectActivity(value);
				}}
			/>
		</View>
	);
};

export default SelectActivity;
