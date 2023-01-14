import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View, TextInput } from 'react-native';

export default function AddReward(props) {
    return (
        <View style={addRewardStyles.container}> 
            <View><Text>Dishwasher Duty!</Text></View>
            <TextInput placeholder="Rate per Hour" />                                   
        </View>
    );
}

const addRewardStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container_center_horizontal: {
      display: 'flex',    
      flexDirection: 'row',
      justifyContent: 'center', 
    },
    text: {
      flex: 1,
      fontSize: 17,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#444444',
      marginTop: 3,
      marginRight: 5,
      marginLeft: 5,
    }
  });