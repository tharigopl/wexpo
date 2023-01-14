import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

export default function Auth(props) {

    const account = props.navigation.getParam('account', null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ regView, setRegView] = useState(false);
    
    const [accounts, setAccounts] = useState([])

    useEffect(()=> {
        getData();
      }, [])


    const auth = (item) => {
      
        if (regView) {
            fetch(`${process.env.REACT_APP_API_URL}/whenuneedmeapi/users/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password})
            })
            .then( res => res.json())
            .then( res => {
              setRegView(false);
            })
            .catch( error => console.log(error));
          } else {
            fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ username, password})
              })
              .then( res => res.json())
              .then( res => {
                saveData(res.token);
                props.navigation.navigate("MovieList");
              })
              .catch( error => console.log(error));
          }

        fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        .then(res => res.json())
        .then(res => {
                console.log(res.err)
                if(res.token)
                saveData(res.token);
                console.log(res + "***1");    
                props.navigation.navigate("Home", {token:res.token});            
            })
        .catch( error => console.log(error));
    }

    const saveData = async (token) => {
        await AsyncStorage.setItem('MR_Token', token)
    }

    const getData = async () => {
        const token = await AsyncStorage.getItem('MR_Token');
        if(token) {
            console.log("Before " + token);
            props.navigation.navigate("Home", {token:token});
        }
        console.log("After");
    }

    const toggleView = () => {
        setRegView(!regView);
      }

        
    return (
        <View style={styles.container}> 
            <Text style={styles.label}>Username</Text>
            <TextInput 
              style={styles.input}
              placeholder="Username"
              onChangeText={text => setUsername(text)}
              value = {username}
              autoCapitalize={'none'}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput 
              style={styles.input}
              placeholder="Password"
              onChangeText={text => setPassword(text)}
              value = {password}
              secureTextEntry={true}
              autoCapitalize={'none'}
            />
            <Button onPress={()=>auth()} title={regView ? "Register" : "Login"} />
            <TouchableOpacity onPress={() => toggleView()}>
                {regView ? <Text style={styles.viewText}>Already have an account? Go back to login.</Text> : 
                <Text style={styles.viewText}>Don't have an account? Register here.</Text>}
            </TouchableOpacity>
        <StatusBar style="auto" />
        </View>
    );
}

Auth.navigationOptions = screenProps => ({
  title: "Login",
  headerStyle:{
    backgroundColor:'orange'
  },
  headerTintColor:'#fff',
  headerTitleStyle:{
    fontWeight: 'bold',
    fontSize: 24
  }
})

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
  },
  viewText: {
    color: 'white',
    fontSize: 20,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10
  }
});
