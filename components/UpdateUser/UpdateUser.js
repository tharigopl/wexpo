import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import UserAPI from '../../service/user-api';

export default function UpdateUser(props) {

  const userid = props.navigation.getParam('useruserid', null);
  const user = props.navigation.getParam('user', null);
  const token = props.navigation.getParam('token', null);   
  const userState = useState
  const [username, setUsername] = useState(user.username)
  const [firstname, setFirstname] = useState(user.first_name)
  const [lastname, setLastname] = useState(user.last_name)
  const [email, setEmail] = useState(user.email)

  
  const saveUser = (item) => {
    console.log(token);
    fetch(`http://192.168.0.95:8000/whenuneedmeapi/users/${user.id}/`, {
        method: 'PUT',
        headers:{
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({first_name:firstname, last_name:lastname, email:email})
    })
    .then(res => res.json())
    .then(account => props.navigation.navigate("Home", {userid:userid}))
    .catch( error => console.log(error));
    
  }

    return (
      <View style={styles.container}> 
      <Text style={styles.label}>Update user {user.id} </Text>
      <TextInput 
        style={styles.input}
        placeholder="First Name"
        onChangeText={text => setFirstname(text)}
        value = {firstname}
      />
      <TextInput 
        style={styles.input}
        placeholder="Last Name"
        onChangeText={text => setLastname(text)}
        value = {lastname}
      />
      <TextInput 
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value = {email}
      />      
      <Button onPress={(item)=>saveUser(item)} title="Update"
      />
  <StatusBar style="auto" />
  </View>
    );
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