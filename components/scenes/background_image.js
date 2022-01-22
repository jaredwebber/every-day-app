/**
 * @flow strict-local
 * @format
 */

 import {Image, View} from 'react-native';
 import React from 'react';

 //Import Custom Styles
 import Styles from '../style_sheet';
 
 const Header = () => {
   return (
    <View 
        style = {
            Styles.containerCenter
        }>

      <Image 
          source={require('../../assets/Images/background.jpeg')} 
          style={Styles.backgroundImage}
          resizeMode='cover'
        />

    </View>
   );
 };
 
 export default Header;
 




