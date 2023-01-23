import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

export default function Edit(props) {

    const account = props.navigation.getParam('account', null);
    const token = props.navigation.getParam('token', null);   

    const [description, setDescription] = useState(account.providerDesc)
    const [name, setName] = useState(account.providerName)
    const [providerSecKey, setproviderSecKey] = useState(account.providerSecKey)
    const [providerApiKey, setproviderApiKey] = useState(account.providerApiKey)
    const [providerApiEndPoint, setproviderApiEndPoint] = useState(account.providerApiEndPoint)
    console.log("Edit Save Token 1 ", token);
    console.log("Edit Save account ", account);
    const saveAccount = (item) => {
      console.log("Edit Save Token ", token);
      if(account.id){

        fetch(`http://192.168.0.95:8000/whenuneedmeapi/accounts/${account.id}/`, {
            method: 'PUT',
            headers:{
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({providerName:name, providerDesc:description, providerSecKey:providerSecKey, providerApiKey:providerApiKey, providerApiEndPoint:providerApiEndPoint})
        })
        .then(res => res.json())
        .then(account => props.navigation.navigate("Detail", {account:account, title:account.providerName}))
        .catch( error => console.log(error));
      } 
      else {
        fetch(`http://192.168.0.95:8000/whenuneedmeapi/accounts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ providerName:name, providerDesc:description, providerSecKey:providerSecKey, providerApiKey:providerApiKey, providerApiEndPoint:providerApiEndPoint})
        })
        .then( res => res.json())
        .then( account => {
          
          props.navigation.navigate("AccountList")
        })
        .catch( error => console.log(error));
      }
    }

    const [accounts, setAccounts] = useState([])

    return (
        <View style={styles.container}> 
            <Text style={styles.label}>Edit Account {account.providerName} </Text>
            <TextInput 
              style={styles.input}
              placeholder="Provider Name"
              onChangeText={text => setName(text)}
              value = {name || ''}
            />
            <TextInput 
              style={styles.input}
              placeholder="Provider Description"
              onChangeText={text => setDescription(text)}
              value = {description || ''}
            />
            <TextInput 
              style={styles.input}
              placeholder="Provider SecKey"
              onChangeText={text => setproviderSecKey(text)}
              value = {providerSecKey || ''}
            />
            <TextInput 
              style={styles.input}
              placeholder="Provider ApiKey"
              onChangeText={text => setproviderApiKey(text)}
              value = {providerApiKey || ''}
            />
            <TextInput 
              style={styles.input}
              placeholder="Provider ApiEndPoint"
              onChangeText={text => setproviderApiEndPoint(text)}
              value = {providerApiEndPoint || ''}
            />
            <Button onPress={(item)=>saveAccount(item)} title={account.id ? "Edit" : "Add"} 
            />
        <StatusBar style="auto" />
        </View>
    );
}

Edit.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam('title'),
  headerStyle:{
    backgroundColor:'orange'
  },
  headerTintColor:'#fff',
  headerTitleStyle:{
    fontWeight: 'bold',
    fontSize: 24
  },
  headerRight:(
    <Button title="Remove" color="black"
    onPress={() => removeClicked(screenProps)}
  />
  ),  
})

const removeClicked = (props) => {
  const account = props.navigation.getParam("account")
  console.log(account);
  console.log("Edit account removed Token ", token);
  fetch(`http://192.168.0.95:8000/whenuneedmeapi/accounts/${account.id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token 85dc577f5d9648bf5113f358c21c4230b31e4ff0`,
        'Content-Type': 'application/json'
      }
      })
      .then( res => {
        props.navigation.navigate("AccountList")
      })
      .catch( error => console.log(error));
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    padding:10
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
