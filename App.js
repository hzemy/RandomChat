import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './src/Main';
import SignUp from './src/SignUp';
import Login from './src/Login';
import Home from './src/Home';
import AddFriend from './src/AddFriend';
import AddRandom from './src/AddRandom';
import ChatScreen from './src/ChatScreen';
import CreateGroup from './src/CreateGroup';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddFriend" component={AddFriend} />
        <Stack.Screen name="AddRandom" component={AddRandom} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
