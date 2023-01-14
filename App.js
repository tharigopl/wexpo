import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AccountList from './components/accountlist';
import Detail from './components/detail';
import Edit from './components/edit';
import THome from './components/thome';
import QuitHome from './components/QuitHome/QuitHome';
import Home from './components/Home/Home';
import Auth from './components/auth';
import AddReward from './components/AddReward/AddReward';
import WelcomeBack from './components/WelcomeBack/WelcomeBack';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const AppNavigator = createStackNavigator({  
  Auth:{screen:Auth},
  Home:{screen:Home},
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
