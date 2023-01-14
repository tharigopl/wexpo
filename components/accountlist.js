import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AccountList(props) {

    const [accounts, setAccounts] = useState([])
    const token = props.navigation.getParam('token', null);   
    console.log(token + "$$$$$$$$$$");
    const getAccounts = () => {
        console.log(token);
        fetch(`http://192.168.0.95:8000/whenuneedmeapi/accounts/`, {
            method: 'GET',
            headers: {
            'Authorization': `Token ${token}`
            }
        })
        .then( res => res.json())
        .then( jsonRes => setAccounts(jsonRes))
        .catch( error => console.log(error));
    }

    useEffect(() => {
        getAccounts();
      }, []);

    const accountClicked = (account) => {
        props.navigation.navigate("Detail", {account: account, title: account.providerName})
    }

    return (
        <View style={styles.container}>             
            <FlatList 
                data = {accounts}
                renderItem = {({item}) => (
                    <TouchableOpacity onPress={ () => accountClicked(item)}>
                        <View style={styles.item}>
                            <Text style={styles.itemText}>{item.providerName}</Text>
                        </View>           
                    </TouchableOpacity>         
                    )
                }
                keyExtractor = {(item, index) => index.toString()}
            />
        <StatusBar style="auto" />
        </View>
    );
}

AccountList.navigationOptions = screenProps => ({
    title: "List of accounts",
    headerStyle:{
      backgroundColor:'orange'
    },
    headerTintColor:'black',
    headerTitleStyle:{
      fontWeight: 'bold',
      fontSize: 24
    },
    headerRight:(
      <Button style={styles.title} title="Add New" color="black"
        onPress={()=>screenProps.navigation.navigate("Edit", {account: {title:'', description:''}})}
      />
    )
  })

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#282C35'
        },
        title:{
            color:'orange'
        },
  item : {
    flex: 1,
    padding: 10,
    height: 50,
    backgroundColor: '#282C35',
  },
  itemText: {
    color: '#fff',
    fontSize : 24,
  },
  container_center_horizontal: {
    display: 'flex',   
    flexDirection: 'column',
    justifyContent: 'center', 
  }
});
