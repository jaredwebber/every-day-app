/**
 * @flow strict-local
 * @format
 */

import {Image, View} from 'react-native';
import React from 'react';
import Styles from '../style_sheet';

const BackgroundImage = () => {
	return (
		<View style={Styles.containerCenter}>
			<Image
				// eslint-disable-next-line no-undef
				source={require('../../assets/Images/background.jpeg')}
				style={Styles.backgroundImage}
				resizeMode="cover"
			/>
		</View>
	);
};

export default BackgroundImage;
