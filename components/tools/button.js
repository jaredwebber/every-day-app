/**
 * @flow strict-local
 * @format
 */
 import React, {Component, useState} from 'react';

 import {
    Pressable,
    Text, 
    View
} from 'react-native';

import Styles from '../style_sheet';


const SplitButton = ({leftText, leftPress, rightText, rightPress}) =>{

    return(

        <View style={Styles.containerCenter}>
            <View style={Styles.row}>
                <Pressable 
                    onPress={()=>{
                        leftPress; 
                        console.log("left");
                        }
                    }

                    style={Styles.leftButton}
                    >
                    <Text 
                        style={Styles.buttonText}
                        >
                        {leftText}
                    </Text>
                </Pressable>

                <Pressable 
                    onPress={()=>{
                        rightPress; 
                        console.log("right");
                    }}
                    style={Styles.rightButton}    
                >
                    <Text 
                        style={Styles.buttonText}
                        >
                        {rightText}
                    </Text>
                </Pressable>

            </View>
        </View>
    );     
}

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
}


export {
    Button,
    SplitButton
};