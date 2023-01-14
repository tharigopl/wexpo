import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View, TextInput } from 'react-native';

export default function QuitHome(props) {
    return (
        <View style={quitHomeStyles.container}> 
            <View><Text>Congratulations! This is it.</Text></View>
            <Text>Today</Text>
            <TextInput style={styles.text} placeholder="Cigarettes smokes per day" />                       
            <TextInput placeholder="Cigarettes in a pack" />  
            <TextInput placeholder="Years of smoking" />  
            <TextInput placeholder="Price per pack" />  
            <TextInput placeholder="Currency" />  
            <TextInput secureTextEntry={true} placeholder="Password" />                                           
        </View>
    );
}

const quitHomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#282C35'
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