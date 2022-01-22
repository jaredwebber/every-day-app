/**
 * @flow strict-local
 * @format
 */

import {View} from 'react-native';
import React from 'react';

//Import Custom Styles
import Styles from '../style_sheet';

const SmallSpacer = () => {
  return (
  <View style={Styles.smallSpacer} /> 
  );
};

const MedSpacer = () => {
  return (
    <View style={Styles.medSpacer} /> 
  );
};

const LargeSpacer = () => {
  return (
    <View style={Styles.largeSpacer} /> 
  );
};
 
export {
   SmallSpacer, 
   MedSpacer, 
   LargeSpacer
} ;
 