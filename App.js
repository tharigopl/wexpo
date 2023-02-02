import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import Auth from './components/auth';
import HomeC from './components/Home/HomeC';
import UpdateUserC from './components/UpdateUser/UpdateUserC';
import AddChild from './components/AddChild/AddChild';
import AddReward from './components/AddReward/AddReward';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#351401' },
        headerTintColor: 'white',
        sceneContainerStyle: { backgroundColor: '#3f2f25' },
        drawerContentStyle: { backgroundColor: '#351401' },
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: '#351401',
        drawerActiveBackgroundColor: '#e4baa1',
      }}
    >
        
      <Drawer.Screen 
        name="HomeC"
        component={HomeC}
        option={{
          headerShown:false,
        }}
      />  
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'All Categories',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#351401' },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: '#3f2f25' },
          }}
        >
          <Drawer.Screen 
            name="Auth"
            component={Auth}
            option={{
              headerShown:false,
            }}
          />
          <Drawer.Screen 
            name="UpdateUserC"
            component={UpdateUserC}
            option={{
              headerShown:false,
            }}
          />
          <Drawer.Screen 
            name="AddChild"
            component={AddChild}
            option={{
              headerShown:false,
            }}
          />
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />        
          <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
          <Stack.Screen
            name="MealDetail"
            component={MealDetailScreen}
            options={{
              title: 'About the Meal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

/* import { StatusBar } from 'expo-status-bar';
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
 */