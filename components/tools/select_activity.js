/**
 * @flow strict-local
 * @format
 */

import {View} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {useGlobalState} from '../../state/activityState';
import PropTypes from 'prop-types';

//Import Custom Styles
import Styles from '../style_sheet';

const SelectActivity = ({onChange}) => {
	const state = useGlobalState();

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(state.getSelectedActivity());
	const [items, setItems] = useState(state.getActivityOptions());

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
					state.selectActivity(value);
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
