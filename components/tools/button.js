/**
 * @flow strict-local
 * @format
 */

import React from 'react';
import {Pressable, Text} from 'react-native';
import Styles from '../style_sheet';
import PropTypes from 'prop-types';

const Button = ({text, onPress}) => {
	return (
		<Pressable onPress={onPress} style={Styles.buttonContainer}>
			<Text style={Styles.buttonText}>{text}</Text>
		</Pressable>
	);
};

Button.propTypes = {
	text: PropTypes.string,
	onPress: PropTypes.func,
};

export {Button};
