import { StyleSheet, View, ImageBackground, TouchableOpacity, Text} from 'react-native'
import React from 'react'
import FieldComponent from '../components/FieldComponent';

import FieldManagementService from '../services/FieldManagementService';
import MovementService from '../services/MovementService';

export function MainScreen(props) {
  
  
  let fieldsObjects = [];

  let x = 0, y = 0;
  FieldManagementService.getFieldScheme().forEach(bool => {
    if(x % 7 == 7){
      y++;
      x = 0;
    }

    let componentRef = React.createRef(); 

    fieldsObjects.push(<FieldComponent key={(y * 7 + x).toString()} active={bool[0].toString()} hasPin={bool[1].toString()} x={x.toString()} y={y.toString()} ref={componentRef} />);
    
    FieldManagementService.addFieldToDict(FieldManagementService.getId(x, y),componentRef);
    
    x++;
  });
  return (
    <ImageBackground source={require('../assets/stone_texture.jpg')} resizeMode="cover" style={{width: "100%", height: "100%"}}>
      <View style={styles.mainContainer}>
        <View style={styles.fieldContainer}>
          <ImageBackground source={require('../assets/wooden_texture.jpg')} resizeMode="cover">
            <View style={styles.cellContainer}>
              {fieldsObjects}
            </View>
          </ImageBackground>
        </View>
        <View style={footerStyles.buttonContainer}>
            <ImageBackground 
                source={require('../assets/wooden_texture.jpg')}
                resizeMode="cover"
                imageStyle={footerStyles.leftButton} 
                style={footerStyles.image}>
              <TouchableOpacity style={[footerStyles.configButton, footerStyles.leftButton]} onPress={() => {MovementService.undoMove()}}>
                  <Text style={footerStyles.text}>Back</Text>
              </TouchableOpacity>
            </ImageBackground>
            <ImageBackground 
                source={require('../assets/wooden_texture.jpg')}
                resizeMode="cover"  
                imageStyle={footerStyles.rightButton} 
                style={footerStyles.image}>

              <TouchableOpacity style={[footerStyles.configButton, footerStyles.rightButton]} onPress={() => {MovementService.startNewGame()}}>
                <Text style={footerStyles.text}>New Game</Text>
              </TouchableOpacity>
            </ImageBackground>
        </View>
      </View>
    </ImageBackground>
  );
}

const footerStyles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    width: "100%",
    bottom: 0,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  configButton: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  image: {
    flex: 0.4,
  },
  leftButton: {
    borderTopRightRadius: 1000,
  },
  rightButton: {
    borderTopLeftRadius: 1000,
  }

})

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cellContainer: {
    flexDirection: 'row',
    alignContent: "center",
    flexWrap: 'wrap',
    borderWidth: 10,
    borderColor: "#3d2d06",
  },
})