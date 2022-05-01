/**
 * @format
 * @flow strict-local
 */

//React Components & Imports
import React from 'react';
import {View} from 'react-native';

//Custom Components
import Styles from '../style_sheet';
import BackgroundImage from '../scenes/background_image';
import {LargeSpacer} from '../tools/spacers';
import {Button} from '../tools/button';

//App Begin
const Home = () => {
	return (
		<View style={Styles.pageContainer}>
			<BackgroundImage />

			<LargeSpacer />
			<LargeSpacer />
			<LargeSpacer />
			<LargeSpacer />

			<Button />
		</View>
	);
};

export default Home;
