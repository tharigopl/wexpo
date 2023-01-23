import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import UserAPI from '../../service/user-api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AddSpouse extends React.Component
{

  constructor(props){
    super(props);
    this.state = {
      userid:"",
      mrtoken:"",
      displayName:"",            
      firstName:"",            
      lastName:"",   
      spouse:[],         
    };
  }

  componentDidMount() {
    // Lifecycle method when your component is mounted
    this._getStoredValues();
  }

  componentWillUnmount() {
    // Lifecycle method when your component is unmounted
  }

  _handleOnButtonPress = () => {
    // Handler when your button is pressed
  }

  _getStoredValues = async () => {
    console.log("UpdateUserC");
    const mrtoken = await AsyncStorage.getItem("MR_Token");
    const useridstored = await AsyncStorage.getItem("useridstored");
    const spouse = this.props.navigation.getParam("spouse");

    await this.setState(
        {
            userid:useridstored,
            mrtoken:mrtoken,
            spouse:spouse, 
            displayName:spouse.display_name,
            firstName:spouse.first,
            lastName:spouse.last           
        }
    );

    console.log(this.state.child)
  }
  
  saveSpouse = async () => {
    var data = {
        display_name: this.state.displayName,
        user:this.state.userid,
        first:this.state.firstName,
        last:this.state.lastName,
        personType:"2"
        }
    console.log("Save Spouse", data.personType)
    const jRes = await UserAPI.createPerson(this.state.userid, data, this.state.mrtoken)
    .then( jsonRes => {            
        console.log("Getting person id ###"+jsonRes[0])        
    })
    .catch( error => console.log(error));
    this.props.navigation.navigate("UpdateUserC");
  }

  handleDisplayName = (text) => {
    console.log("Inside change email name "+text);
    const { value } = event.target;
    this.setState((prevState) => ({
      displayName:value
    }));
  };

  handleLastName = (text) => {
    console.log("Inside change email name "+text);
    const { value } = event.target;
    this.setState((prevState) => ({
      lastName:value
    }));
  };

  handleFirstName = (text) => {
    console.log("Inside change email name "+text);
    const { value } = event.target;
    this.setState((prevState) => ({
      firstName:value
    }));
  };

  render(){
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>                        
            <TextInput 
              style={styles.input}
              placeholder="Display Name"            
              value = {this.state.displayName || ''}
              onChangeText={text => this.handleDisplayName(text)}
            />
            <TextInput 
              style={styles.input}
              placeholder="Last Name"
              onChangeText={text => this.handleLastName(text)}
              value = {this.state.lastName || ''}
            />
            <TextInput 
              style={styles.input}
              placeholder="First Name"
              onChange={text => this.handleFirstName(text)}
              value = {this.state.firstName || ''}
            />              
            <Button onPress={(item)=>this.saveSpouse(item)} title="Save Spouse"
            />
        <StatusBar style="auto" />
        </View>    
      </ScrollView>       
    );
  }
}

AddSpouse.navigationOptions = screenProps => ({
    title: screenProps.navigation.getParam('title'),
    headerStyle:{
      backgroundColor:'orange'
    },
    headerTintColor:'black',
    headerTitleStyle:{
      fontWeight: 'bold',
      fontSize: 24
    }/* ,
    headerRight:(
      <Button title="Save" color="black" 
        onPress={()=>screenProps.navigation.navigate("Save", {account: screenProps.navigation.getParam("user"), token:token})}
      />
    ) */
  })


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    padding:10
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  description:{
    color:'white',
    padding: 10,
    fontSize: 20
  },
  input:{
    fontSize:24,
    backgroundColor: '#fff',
    padding: 10,
    margin:10
  },
  label:{
    fontSize:24,
    color:'white',
    padding:10
  }
  });