/**
 * @flow strict-local
 * @format
 */
 import React, {Component} from 'react';

 import {
    Pressable,
    Text, 
    View
} from 'react-native';

import Styles from '../style_sheet';


const Button = ({text, onPress}) =>{
    return(
        <Pressable 
            onPress={onPress}
            style={Styles.buttonContainer}
            >
            <Text 
                style={Styles.buttonText}
                >
                {text}
            </Text>
        </Pressable>
    );
};

export default Button;

