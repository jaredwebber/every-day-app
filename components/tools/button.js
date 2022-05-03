/**
 * @flow strict-local
 * @format
 * 
 * Currently Unused - Requires Implementation
 * 
 */
import React from 'react';

import {Pressable, Text, View} from 'react-native';

import Styles from '../style_sheet';

// eslint-disable-next-line react/prop-types
const SplitButton = ({leftText, leftPress, rightText, rightPress}) => {
	return (
		<View style={Styles.containerCenter}>
			<View style={Styles.row}>
				<Pressable
					onPress={() => {
						leftPress;
					}}
					style={Styles.leftButton}>
					<Text style={Styles.buttonText}>{leftText}</Text>
				</Pressable>

				<Pressable
					onPress={() => {
						rightPress;
					}}
					style={Styles.rightButton}>
					<Text style={Styles.buttonText}>{rightText}</Text>
				</Pressable>
			</View>
		</View>
	);
};

// eslint-disable-next-line react/prop-types
const Button = ({text, onPress}) => {
	return (
		<Pressable onPress={onPress} style={Styles.buttonContainer}>
			<Text style={Styles.buttonText}>{text}</Text>
		</Pressable>
	);
};

export {Button, SplitButton};
