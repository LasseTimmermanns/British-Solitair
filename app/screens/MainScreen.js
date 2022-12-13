import { StyleSheet, View, ImageBackground} from 'react-native'
import React from 'react'
import FieldComponent from '../components/FieldComponent';

import FieldManagementService from '../services/FieldManagementService';

export function MainScreen(props) {
  
  const fieldsScheme = 
  [ [false, false], [false, false], [true, true], [true, true], [true, true], [false, false], [false, false],
    [false, false], [false, false], [true, true], [true, true], [true, true], [false, false], [false, false],
    [true, true],   [true, true],   [true, true], [true, true], [true, true],   [true, true],   [true, true],
    [true, true],   [true, true],   [true, true], [true, false], [true, true],  [true, true],   [true, true],
    [true, true],   [true, true],   [true, true], [true, true], [true, true],   [true, true],   [true, true],
    [false, false], [false, false], [true, true], [true, true], [true, true], [false, false], [false, false],
    [false, false], [false, false], [true, true], [true, true], [true, true], [false, false], [false, false]];

  let fieldsObjects = [];

  let x = 0, y = 0;
  fieldsScheme.forEach(bool => {
    if(x % 7 == 7){
      y++;
      x = 0;
    }

    let componentRef = React.createRef(); 

    fieldsObjects.push(<FieldComponent key={(y * 7 + x).toString()} active={bool[0].toString()} hasPin={bool[1].toString()} x={x.toString()} y={y.toString()} ref={componentRef} />);
    
    FieldManagementService.addFieldToDict(FieldManagementService.generateId(x, y),componentRef);
    
    x++;
  });
  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={require('../assets/wooden_texture.jpg')} resizeMode="cover" style={styles.image}>
        
        <View style={styles.fieldContainer}>
          {fieldsObjects}
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldContainer: {
    flexDirection: 'row',
    alignContent: "center",
    flexWrap: 'wrap',
    borderWidth: 10,
    borderColor: "#3d2d06",
  }
})