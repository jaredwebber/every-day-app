/**
 * @flow strict-local
 * @format
 */

import {Text, View} from 'react-native';
import React from 'react';

//Import Custom Styles
import Styles from '../style_sheet';

const Header = () => {
	return (
		<View style={Styles.headerContainer}>
			<View style={Styles.borderHeader}>
				<Text style={Styles.titleText}>every day</Text>
			</View>
		</View>
	);
};

export default Header;
