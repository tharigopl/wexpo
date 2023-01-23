import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ImageBackground, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserAPI from '../../service/user-api';


export default function Home(props) {

    let token = null;
    const userid = props.navigation.getParam('userid', null);
    const token2 = props.navigation.getParam('token', null);
    const [user, setUser] = useState([])
    let useridstored = null;
    const [userstored, setUserstored] = useState([])

    const getData = async () => {
        const token1 = await AsyncStorage.getItem("MR_Token");
        useridstored = await AsyncStorage.getItem("useridstored");
        token = token1;
        if(token) {            
            console.log("Auth successful");
            console.log("useridstored "+useridstored);
            setUserstored(useridstored);
        }
        else{
            props.navigation.navigate("Auth");
        }
      }



    useEffect(() => {
        getData();

        console.log("Home use Effect"+userid)
        UserAPI.getUser(userid)
        .then( jsonRes => {
            setUser(jsonRes);
            console.log("Getting user id"+jsonRes.id)
        })
        .catch( error => console.log(error));
      }, []);

    const updateProfileClicked = () => {
        console.log(userid+"   Navigation "+user.id)
        props.navigation.navigate("ProfileScreen", {user:user, userid:userid, token:token2});
    }

    const updateUserClicked = () => {
        console.log(userid+"   Navigation "+user.id)
        props.navigation.navigate("UpdateUser", {user:user, userid:userid, token:token2});
    }

    const addRewardsClicked = () => {
        props.navigation.navigate("AddReward", {token:token});
    }

    const accountsClicked = () => {
        props.navigation.navigate("AccountList" , {token:token});
    }

    const quitSmokingClicked = () => {
        props.navigation.navigate("QuitHome", {token:token})
    }

    return (
        <View style={homeStyles.container}> 
            <View><Text style={homeStyles.text}>WHEN YOU NEED ME 1 ! {userstored}</Text><Text>REDUX {this.props.count}</Text></View>   
            <View style={homeStyles.container_center_horizontal}>
                <TouchableOpacity onPress={ () => updateUserClicked()}>
                    <View style={homeStyles.baninkgbg}>   
                        <Image style={homeStyles.baninkg_app_icon_artboard_1} source={require("../../assets/baninkg-app-iconartboard-1@2x.png")} />                     
                        <Text style={homeStyles.addRewardText}>Update User</Text>                  
                    </View>
                </TouchableOpacity>  
                <TouchableOpacity onPress={ () => updateProfileClicked()}>
                    <View style={homeStyles.baninkgbg}>
                    <Image style={homeStyles.baninkg_app_icon_artboard_1} source={require("../../assets/baninkg-app-iconartboard-1@2x.png")} />                           
                        <Text style={homeStyles.addRewardText}>Update Profile</Text>                  
                    </View>
                </TouchableOpacity> 
                <TouchableOpacity onPress={ () => addRewardsClicked()}>
                    <View style={homeStyles.baninkgbg}>
                    <Image style={homeStyles.baninkg_app_icon_artboard_1} source={require("../../assets/baninkg-app-iconartboard-1@2x.png")} />   
                        <Text style={homeStyles.addRewardText}>Add Reward</Text>                  
                    </View>
                </TouchableOpacity>  
                <View ></View>       
                <TouchableOpacity onPress={ () => accountsClicked()}>
                    <View style={homeStyles.baninkgbg}>
                    <Image style={homeStyles.baninkg_app_icon_artboard_1} source={require("../../assets/baninkg-app-iconartboard-1@2x.png")} />   
                        <Text style={homeStyles.addRewardText}>Accounts</Text>                  
                    </View>
                </TouchableOpacity>  
                <TouchableOpacity onPress={ () => quitSmokingClicked()}>
                    <View style={homeStyles.baninkgbg}>
                    <Image style={homeStyles.baninkg_app_icon_artboard_1} source={require("../../assets/baninkg-app-iconartboard-1@2x.png")} />   
                        <Text style={homeStyles.addRewardText}>Quit Smoking</Text>                  
                    </View>
                </TouchableOpacity>  
            </View>  
        </View>            
    );
}

Home.navigationOptions = screenProps => ({
    title: "When You Need Me",
    headerStyle:{
      backgroundColor:'orange'
    },
    headerTintColor:'black',
    headerTitleStyle:{
      fontWeight: 'bold',
      fontSize: 24
    },
    headerRight:(
      <Button title="Logout" color="black" 
        onPress={()=>logout(screenProps)}
      />
    )
    
  })

  const logout = (screenProps) => {
        console.log("Logout");
        removeItemValue();
        screenProps.navigation.navigate("Auth");
    }  

    const removeItemValue = async() => {
        try {
            await AsyncStorage.removeItem('MR_Token');            
        }
        catch(exception) {
            return false;
        }
    }

const homeStyles = StyleSheet.create({
    baninkgbg:{
        backgroundColor:"orange",
        borderRadius:8,
        width:85,
        alignItems:'center',
        margin:3
    },
    baninkg_appcontainer:{
        borderRadius:8,
        overflow: 'hidden',
        width: 85
    },
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
      color: 'orange',
      marginTop: 3,
      marginRight: 5,
      marginLeft: 5,
    },
      baninkg_app_icon_artboard_1:{
        height:48,
        width:48,
        padding:20
      },

      addRewardText:{
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
      } 
  });