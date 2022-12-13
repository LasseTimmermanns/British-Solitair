import { Text, StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { Component, useState } from 'react'

import PinService from '../services/PinService';
import FieldManagementService from '../services/FieldManagementService';


var isSelected = false;

class FieldComponent extends React.Component {
  constructor(props){
    super(props);
    this.active = (props.active === "true");
    this.x = parseInt(props.x);
    this.y = parseInt(props.y);
    

    this.state = {
      pinned: (props.hasPin === "true"),
      selected: false,
    }
  }

  setPinned = (pinned) => {
    this.state.pinned = pinned;
    this.forceUpdate();
  }

  setSelected = (selected) => {
    this.state.selected = selected;
    this.forceUpdate();
  }

  render(){
    return (
      <View style={[styles(this.active).cell,]}>
        <TouchableWithoutFeedback  
          onPress={() => {
            if(!this.state.pinned) return;
            this.setSelected(!this.state.selected);
            PinService.selectField(FieldManagementService.generateId(this.x, this.y));
          }}>
          <View style={markerStyles(this.state.pinned, this.state.selected).marker}/>
        </TouchableWithoutFeedback>
      </View>
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