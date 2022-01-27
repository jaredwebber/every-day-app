/**
 * @flow strict-local
 * @format
 */

 import {Text, View} from 'react-native';
 import React, {useState, useEffect} from 'react';

 import {Picker} from '@react-native-picker/picker';

 import DropDownPicker from 'react-native-dropdown-picker';



 //Import Custom Styles
 import Styles from '../style_sheet';

 //Import Custom Components
 import {Button, SplitButton} from './button'
 import {SmallSpacer, MedSpacer, LargeSpacer} from './spacers';

 import dbAccess from '../../data/local_async'

 import GLOBAL from '../../index'

 const SelectActivity = () => {
    const [selectedActivity, setSelected] = useState();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(global.selectionOptions);

  useEffect(() => {
    GLOBAL.refreshMetadata();
    setItems(global.selectionOptions);
}, [global.selectionOptions])

   return (
    <View 
        style = {
            Styles.containerCenter
        }>
       
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={()=>{global.currentSelection=value;}}
    />

    </View>
   );
 }
 
 export default SelectActivity;


 