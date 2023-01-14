import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import { Pressable } from "react-native"

export default function Detail(props) {

    const account = props.navigation.getParam('account', null);
    const token = props.navigation.getParam('token', null);   

    const [t1, sett1] = useState(0);

    const rateClicked = () => {
      if(t1 > 0 && t1 < 6){
        fetch(`http://192.168.0.95:8000/whenuneedmeapi/accounts/${account.id}/rate_account/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stars: t1})
      })
      .then( res => res.json())
      .then( res => {
        sett1(0);
        Alert.alert("Rating", res.message);
      })
      .catch( error => Alert.alert("Error", error));
      }
    }
 
    return (
        <View style={styles.container}> 
            <View><Text>Details about {account.providerName}</Text>
            <Text style={styles.description}>{account.providerDesc}</Text></View>                
            <View style={styles.starContainer}>
              <FontAwesomeIcon style={account.avg_rating > 0 ? styles.orange : styles.white} icon={faStar}/>
              <FontAwesomeIcon style={account.avg_rating > 1 ? styles.orange : styles.white} icon={faStar}/>
              <FontAwesomeIcon style={account.avg_rating > 2 ? styles.orange : styles.white} icon={faStar}/>
              <FontAwesomeIcon style={account.avg_rating > 3 ? styles.orange : styles.white} icon={faStar}/>
              <FontAwesomeIcon style={account.avg_rating > 4 ? styles.orange : styles.white} icon={faStar}/>                         
              <Text style={styles.white}>[{account.no_of_ratings}]</Text>  
            </View>                        
            <View style={{borderBottomColor:'white', borderBottomWidth: 2}}></View>
            <Text style={styles.description}>Rate it!!!</Text>
            <View style={styles.starContainer}>
            <Pressable onPress={()=> sett1(1)}>
              <FontAwesomeIcon style= {t1 > 0 ? styles.purple : styles.grey} icon={faStar} size={48}/>   
            </Pressable>
            <Pressable onPress={()=> sett1(2)}>              
              <FontAwesomeIcon style= {t1 > 1 ? styles.purple : styles.grey} icon={faStar} size={48} />
            </Pressable>
            <Pressable onPress={()=> sett1(3)}>    
              <FontAwesomeIcon style= {t1 > 2 ? styles.purple : styles.grey} icon={faStar} size={48} />          
            </Pressable>
            <Pressable onPress={()=> sett1(4)}>  
              <FontAwesomeIcon style= {t1 > 3 ? styles.purple : styles.grey} icon={faStar} size={48} />            
            </Pressable>
            <Pressable onPress={()=> sett1(5)}> 
              <FontAwesomeIcon style= {t1 > 4 ? styles.purple : styles.grey} icon={faStar} size={48} />               
            </Pressable>
            </View>
            <Button title="Rate" onPress={() => rateClicked()} />
        <StatusBar style="auto" />
        </View>
    );
}

Detail.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam('title'),
  headerStyle:{
    backgroundColor:'orange'
  },
  headerTintColor:'black',
  headerTitleStyle:{
    fontWeight: 'bold',
    fontSize: 24
  },
  headerRight:(
    <Button title="Edit" color="black" 
      onPress={()=>screenProps.navigation.navigate("Edit", {account: screenProps.navigation.getParam("account"), token:token})}
    />
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    padding:10
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
  description:{
    color:'white',
    padding: 10,
    fontSize: 20
  },
  starContainer:{
    alignItems : "center",
    justifyContent: "center",
    flexDirection:"row"
  },
  orange:{
    color:'orange'
  },
  white:{
    color:'white'
  },
  purple:{
    color:'purple'
  },
  grey:{
    color:'grey'
  }
});
