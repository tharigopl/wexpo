import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import contactData from '../../mocks/contacts.json'

import Profile from './Profile'

const ProfileScreen = (screenProps) => <Profile {...contactData} />

ProfileScreen.navigationOptions = () => ({
  header: null,
})



ProfileScreen.navigationOptions = screenProps => ({
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

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ProfileScreen
