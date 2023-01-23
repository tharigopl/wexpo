import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import UserAPI from '../../service/user-api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UpdateUserC extends React.Component
{

  constructor(props){
    super(props);
    this.state = {
      user:[],
      userid:"",
      token:"",
      mrtoken:"",
      navuserid:"",  
      persons:[],
      myself:[],
      child:[],
      spouse:[],
      fname:"",
      lname:"",
      email:""
    };
  }

  componentDidMount() {
    console.log("UpdateUserC Mounted");
    // Lifecycle method when your component is mounted
    this._getStoredValues();
  }

  componentWillUnmount() {
    console.log("UpdateUserC UnMounted");
    // Lifecycle method when your component is unmounted
  }

  _handleOnButtonPress = () => {
    // Handler when your button is pressed
  }

  _getStoredValues = async () => {
    const mrtoken = await AsyncStorage.getItem("MR_Token");
    const useridstored = await AsyncStorage.getItem("useridstored");
    const user = this.props.navigation.getParam("user");
    const child = this.props.navigation.getParam("child");
    const spouse = this.props.navigation.getParam("spouse");

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
            mrtoken:mrtoken,
            user:user,
            fname:user.first_name,
            lname:user.last_name,
            email:user.email,
            child:child,
            spouse:spouse,
        }
    );
  }

  userHasChildren = () => {
    const usr = this.state.mrtoken;
    console.log(" children ", usr);
  }

  userHasSpouse = () => {
    const usr = this.state.mrtoken;
    console.log(" Spouse ", usr);
  }

  handleFirstName = (text) => {
    console.log("Inside change first name "+text);
    const { value } = event.target;
    this.setState((prevState) => ({      
      fname:value
    }));
  };

  handleLastName = (text) => {
    console.log("Inside change email name "+text);
    const { value } = event.target;
    this.setState((prevState) => ({
     lname:value
    }));
  };

  handleEmail = (text) => {
    console.log("Inside change email name "+text);
    const { value } = event.target;
    this.setState((prevState) => (      
      {
      email:value
    }));
  };

  handleTest = (text) => {
    console.log("Inside change test name "+text);
    const { value } = event.target;
    this.setState((prevState) => (      
      {
      email:value
    }));
  };

  saveUser = () => {

  }

  onSelect = data => {
    if(data.created == true){
      this.setState({child:[...this.state.child, data.child]});
    }
    else{
      
    }
    
  };

  addChild = () => {
    this.props.navigation.navigate("AddChild", {userid:this.state.userid, "create":"create", onSelect: this.onSelect});
  }

  updateChild = () => {
    console.log("Button child ", this.state.child);
    this.props.navigation.navigate("AddChild", {userid:this.state.userid, update:"update", child:this.state.child});
  }

  childClicked = () => {
    console.log("Child clicked")
  }



  render(){
    const hasChildren = this.state.child.length === 0 ? false:true;
    console.log("Has Children ", hasChildren);
    const hasSpouse = this.state.spouse.length === 0 ? false:true;
    console.log("Has Spouse ", hasSpouse);

    return (
        <View style={styles.container}> 
            <Text style={styles.text}>Update user {this.state.user.username} </Text>            
            <TextInput 
              style={styles.input}
              placeholder="First Name"            
              value = {this.state.fname || ''}
              onChangeText={text => this.handleFirstName(text)}
            />
            <TextInput 
              style={styles.input}
              placeholder="Last Name"
              id="last_name"
              onChangeText={text => this.handleLastName(text)}
              value = {this.state.lname || ''}
            />
            <TextInput 
              style={styles.input}
              placeholder="Email"
              onChange={text => this.handleEmail(text)}
              value = {this.state.email || ''}
            /> 
            <View>
            {
              hasChildren ? 
                <FlatList style={styles.flatlistchildcontainer}
                  data = {this.state.child}
                  renderItem = {({item}) => (
                      <TouchableOpacity onPress={()=>this.props.navigation.navigate("AddChild", {userid:this.state.userid, 
                      child:item,username:this.state.user.username, title:"Update Child"})}>
                          <View style={styles.item}>
                              <Text style={styles.itemText}>{item.display_name}</Text>                                                          
                          </View>     
                      </TouchableOpacity>         
                      )
                  }
                  keyExtractor = {(item, index) => index.toString()}
                /> :
                null
            }
            
            <Button style={styles.itemText} title="Add Child" color="black" onPress={()=>
              this.props.navigation.navigate("AddChild", {userid:this.state.userid, child:[],username:""})} />

            {
              hasSpouse ?
              <FlatList style={styles.flatlistchildcontainer}
                data = {this.state.spouse}
                renderItem = {({item}) => (
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("AddSpouse", {userid:this.state.userid, 
                      spouse:item,username:this.state.user.username, title:"Update Spouse"})}>
                        <View style={styles.item}>
                            <Text style={styles.itemText}>{item.display_name}</Text>                            
                        </View>     
                    </TouchableOpacity>         
                    )
                }
                keyExtractor = {(item, index) => index.toString()}
                />
                :
                null
            }       
            <Button style={styles.title} title="Add Spouse" color="black" onPress={ ()=>this.props.navigation.navigate(
              "AddSpouse", {userid:this.state.userid, spouse:[],username:""})} />     
            </View>
            <br></br>
            
            <Button onPress={(item)=>this.saveUser(item)} title="Save User"
            />
        <StatusBar style="auto" />
        </View>         
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    padding:10
  },
  flatlistchildcontainer: {
    flex: 1,
    backgroundColor: '#123a34'
  },
  scroll: {
    backgroundColor: '#AAA',
  },
  description:{
    color:'white',
    padding: 10,
    fontSize: 20
  },
  input:{
    fontSize:12,
    backgroundColor: '#fff',
    padding: 10,
    margin:10
  },
  label:{
    fontSize:12,
    color:'white',
    padding:10
  },
  item : {
    flex: 2,
    padding: 10,
    height: 50,
    backgroundColor: '#282C35',
    flexDirection: 'row',
    color: 'orange'
  },
  itemText: {
    flex: 1,
    color: 'orange',
    fontSize : 12,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'orange',
  }
  });