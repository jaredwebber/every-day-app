/**
 * @flow strict-local
 * @format
 */

import {View} from 'react-native';
import React, {useState, useEffect} from 'react';

import DropDownPicker from 'react-native-dropdown-picker';

//Import Custom Styles
import Styles from '../style_sheet';

import {selectionOptions, refreshMetadata, updateCurrentSelection} from '../../index';

const SelectActivity = () => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState(selectionOptions);

	useEffect(() => {
		refreshMetadata();
		setItems(selectionOptions);
	}, [selectionOptions]);

	return (
		<View style={Styles.containerCenter}>
			<DropDownPicker
				open={open}
				value={value}
				items={items}
				setOpen={setOpen}
				setValue={setValue}
				setItems={setItems}
				onChangeValue={() => {
					updateCurrentSelection(value);
				}}
			/>
		</View>
	);
};

export default SelectActivity;
