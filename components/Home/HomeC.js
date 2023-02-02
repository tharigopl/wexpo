import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ImageBackground, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserAPI from '../../service/user-api';
import HomeGridTile from './HomeGridTile';


export default class HomeC extends React.Component {

    
    

    constructor(props) {
        // Where you initialize some data
        super(props);
        this.state = {
            user:[],
            myself:[],
            child:[],
            spouse:[],
            userid:"",
            token:"",
            mrtoken:"",
            navuserid:"",            
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
        console.log("TEST TEST");
        const mrtoken = await AsyncStorage.getItem("MR_Token");
        const useridstored = await AsyncStorage.getItem("useridstored");
        console.log("mrtoken "+ mrtoken);
        console.log("useridstored"+ useridstored);

        const jRes = await UserAPI.getUser(useridstored)
        .then( jsonRes => {            
            console.log("Getting user id"+jsonRes.id);
            this.setState({user:jsonRes})
        })
        .catch( error => console.log(error));

        const jRes1 = await UserAPI.getUserPersons(useridstored,mrtoken)
            .then( jsonRes => {          
            if (jsonRes== undefined) {        
               
                console.log("No children",this.state.hasChildren)
            } else {
                console.log("Getting person ###"+jsonRes)  
                jsonRes.forEach(element => {
                console.log(" Element pType ", element.personType);
                console.log(" Element detail", element.detail);
                if (element.personType == 1) {
                    console.log("My self",element);
                    this.setState({myself:element});
                } else if (element.personType == 2) {
                    console.log("spouse",element);
                    this.setState({spouse:[...this.state.spouse, element]});
                } else {
                    console.log("Child1", element);
                    this.setState({child:[...this.state.child, element]});
                } 
                }); 
            }       
            })
            .catch( error => console.log(error));

        await this.setState(
            {
                userid:useridstored,
                mrtoken:mrtoken
            }
        )
      }
 
    updateProfileClicked = () => {
        this.props.navigation.navigate("ProfileScreen", {user:this.state.user, userid:this.state.userid, token:this.state.mrtoken});
    }

    updateUserClicked = () => {
        this.props.navigation.navigate("UpdateUserC", {user:this.state.user, userid:this.state.userid, token:this.state.mrtoken, child:this.state.child, myself:this.state.myself, spouse:this.state.spouse});
    }

    addRewardsClicked = () => {
        //props.navigation.navigate("AddReward", {token:token});
    }

    accountsClicked = () => {
        this.props.navigation.navigate("AccountList" , {token:this.state.mrtoken});
    }

    quitSmokingClicked = () => {
        //props.navigation.navigate("QuitHome", {token:token})
    }

    pressHandler = (itemData) => {
        console.log("Inside Press Handler", item.title);
    }

    render(){
        return (
            
            <View> 
                <Text>TEST</Text>
                <HomeGridTile title='UpdateUser111' color="yellow" onPress={this.pressHandler}  />
                {/* <View style={homeStyles.container_center_horizontal}>
                    <TouchableOpacity onPress={ () => this.updateUserClicked()}>
                        <View style={homeStyles.baninkgbg}>   
                            
                            <Text style={homeStyles.addRewardText}>Update User</Text>                  
                        </View>
                    </TouchableOpacity>  
                    <TouchableOpacity onPress={ () => this.updateProfileClicked()}>
                        <View style={homeStyles.baninkgbg}>
                        
                            <Text style={homeStyles.addRewardText}>Update Profile</Text>                  
                        </View>
                    </TouchableOpacity> 
                    <TouchableOpacity onPress={ () => addRewardsClicked()}>
                        <View style={homeStyles.baninkgbg}>
                        
                            <Text style={homeStyles.addRewardText}>Add Reward</Text>                  
                        </View>
                    </TouchableOpacity>  
                    <View ></View>       
                    <TouchableOpacity onPress={ () => this.accountsClicked()}>
                        <View style={homeStyles.baninkgbg}>
                        
                            <Text style={homeStyles.addRewardText}>Accounts</Text>                  
                        </View>
                    </TouchableOpacity>  
                    <TouchableOpacity onPress={ () => quitSmokingClicked()}>
                        <View style={homeStyles.baninkgbg}>
                        
                            <Text style={homeStyles.addRewardText}>Quit Smoking</Text>                  
                        </View>
                    </TouchableOpacity>  
                </View>   */}
            </View>            
        );
    }
}

HomeC.navigationOptions = screenProps => ({
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
      flexDirection: 'column',
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