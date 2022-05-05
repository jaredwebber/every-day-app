/**
 * @flow strict-local
 * @format
 */

import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {useGlobalStore} from '../../store/activityStore';
import PropTypes from 'prop-types';

//Import Custom Styles
import Styles from '../style_sheet';

const SelectActivity = ({onChange}) => {
	const store = useGlobalStore();

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(store.getSelectedActivity());
	const [items, setItems] = useState(store.getActivityOptions());

	useEffect(() => {
		setValue(store.getSelectedActivity());
	}, [store.getSelectedActivity]);

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
					store.selectActivity(value);
					onChange(value);
				}}
			/>
		</View>
	);
};

SelectActivity.propTypes = {
	onChange: PropTypes.func,
};

export default SelectActivity;
