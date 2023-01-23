import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import UserAPI from '../../service/user-api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AddChild extends React.Component
{

  constructor(props){
    super(props);
    this.state = {
      userid:"",
      mrtoken:"",
      displayName:"",            
      firstName:"",            
      lastName:"",   
      child:[],         
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
    console.log("AddChild");
    const mrtoken = await AsyncStorage.getItem("MR_Token");
    const useridstored = await AsyncStorage.getItem("useridstored");
    const child = this.props.navigation.getParam("child");
    console.log("Add Child ", child.display_name)

    await this.setState(
        {
            userid:useridstored,
            mrtoken:mrtoken,
            child:child,
            displayName:child.display_name,
            firstName:child.first,
            lastName:child.last,
        }
    );

    console.log(this.state.child)
  }
  
  saveChild = async () => {
    var data = {
        display_name: this.state.displayName,
        user:this.state.userid,
        first:this.state.firstName,
        last:this.state.lastName,
        personType:"3"
        }
    console.log("Save Child", data.personType)

    if(this.state.child.length == 0){
      const jRes = await UserAPI.createPerson(this.state.userid, data, this.state.mrtoken)
        .then( jsonRes => {            
            console.log("Getting person id ###"+jsonRes[0]);
            this.props.navigation.state.params.onSelect({ create: true, child: jsonRes[0] });
            this.props.navigation.navigate("UpdateUserC", {child:jsonRes[0]});
        })
        .catch( error => console.log(error));
    }else{
      const jRes = await UserAPI.updatePerson(this.state.child.id, data, this.state.mrtoken)
        .then( jsonRes => {            
            console.log("Getting person id ###"+jsonRes[0]);
            this.props.navigation.state.params.onSelect({ create: false, child: jsonRes[0]});
            this.props.navigation.navigate("UpdateUserC", {child:jsonRes[0]});
        })
        .catch( error => console.log(error));
    }
    
    
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
            <Button onPress={(item)=>this.saveChild(item)} title={this.state.child ? "Edit" : "Add"} />
        <StatusBar style="auto" />
        </View>    
      </ScrollView>       
    );
  }
}

AddChild.navigationOptions = screenProps => ({
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