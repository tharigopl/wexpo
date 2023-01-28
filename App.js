import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AccountList from './components/accountlist';
import Detail from './components/detail';
import Edit from './components/edit';
import THome from './components/thome';
import QuitHome from './components/QuitHome/QuitHome';
import ProfileScreen from './components/Profile1/index';
import Home from './components/Home/Home';
import HomeC from './components/Home/HomeC';
import Auth from './components/auth';
import AddReward from './components/UpdateUser/UpdateUser';
import UpdateUser from './components/UpdateUser/UpdateUser';
import UpdateUserC from './components/UpdateUser/UpdateUserC';
import WelcomeBack from './components/WelcomeBack/WelcomeBack';
import AddChild from './components/AddChild/AddChild';
import AddSpouse from './components/AddSpouse/AddSpouse';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';
import { Provider, connect } from 'react-redux';

import { createStore, combineReducers } from 'redux';


console.log( "TEREREWRE"+process.env.PUBLIC_URL);

const AppNavigator = createStackNavigator({  
  Auth:{screen:Auth},
  HomeC:{screen:HomeC},
  Home:{screen:Home},
  ProfileScreen: {screen:ProfileScreen},
  UpdateUserC:{screen:UpdateUserC},
  AddChild:{screen:AddChild},
  AddSpouse:{screen:AddSpouse},
  UpdateUser:{screen:UpdateUser},
  THome:{screen:THome},
  AccountList:{screen:AccountList},
  Detail:{screen:Detail},
  Edit:{screen:Edit},
  AddReward:{screen:AddReward},
  QuitHome:{screen:QuitHome},
})

const App = createAppContainer(AppNavigator);

export default App;
/* export default function App() {
  return (
    <View style={styles.container_center_horizontal}>      
      <AccountList />
    </View>
  );
}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#444444',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  }
});
