import { Text, StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { Component, useState } from 'react'

import PinService from '../services/PinService';
import FieldManagementService from '../services/FieldManagementService';
import MovementService from '../services/MovementService';

class FieldComponent extends React.Component {
  constructor(props){
    super(props);
    this.active = (props.active === "true");
    this.x = parseInt(props.x);
    this.y = parseInt(props.y);
    this.id = FieldManagementService.getId(this.x, this.y);
    

    this.state = {
      pinned: (props.hasPin === "true"),
      selected: false,
    }
  }

  setPinned = (pinned) => {
    this.state.pinned = pinned;
    this.forceUpdate();
  }

  isPinned = () => {
    return this.state.pinned;
  }

  setSelected = (selected) => {
    this.state.selected = selected;
    this.forceUpdate();
  }

  //Method to check if a pin wants to go here
  checkIfPinSets = () => {

    //When cell is pinned nobody can go here
    if(this.state.pinned) return false;

    //Check if cell between has pin
    function betweenHasPin(selectedFieldId, currentFieldId) {
      const betweenRef = FieldManagementService.getComponentRef(FieldManagementService.getFieldBetween(selectedFieldId, currentFieldId)).current;
      return betweenRef.isPinned();
    }

    //Check if selected is two cells away 
    function positionFits(selectedFieldId, currentFieldId) {
      let possibleCellIds = MovementService.getPossibleFieldsFromId(selectedFieldId);
      return possibleCellIds.includes(currentFieldId);
    }

    let selectedFieldId = PinService.getSelectedFieldId();
    return positionFits(selectedFieldId, this.id) && betweenHasPin(selectedFieldId, this.id);
  } 

  select = () => {
    PinService.selectField(this.id);
    this.setSelected(!this.state.selected);
  }

  onPress = () => {
    if(this.state.pinned) this.select();
    //if(!this.state.pinned) PinService.unselectField();

    if(this.checkIfPinSets()){
      MovementService.registerMove(PinService.getSelectedFieldId(), this.id);
    }
    
  }

  render(){
    return (
      <TouchableWithoutFeedback  
          onPress={() => {this.onPress()}}>

          <View style={[styles(this.active).cell,]}>
              <View style={markerStyles(this.state.pinned, this.state.selected).marker}/>
          </View>
          
        </TouchableWithoutFeedback>
    )
  }
}

const styles = (active) => StyleSheet.create({
    cell: {
        width:  (1/7) * 100 + "%",
        height: (1/7) * 100 + "%",
        padding: "3.5%",
        aspectRatio: 1,
        opacity: active == true ? 1 : 0,
    }
});

const markerStyles = (hasPin, selected) => StyleSheet.create({
  marker: {
    borderRadius: 10000,
    backgroundColor: hasPin == true ? "red" : "#3d2d06",
    flex: 1,
    opacity: selected ? 0.4 : 1,
    borderWidth: 3,
    borderColor: "#3d2d06",
  }
})

export default FieldComponent;