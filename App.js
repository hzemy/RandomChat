import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Login from "./src/Login";
import Signup from "./src/Signup";
import Main from "./src/Main";
import Home from "./src/Home"
import ChatScreen from "./src/ChatScreen";
import AddFriend from "./src/AddFriend";
import CreateGroup from "./src/CreateGroup";
import AddRandom from "./src/AddRandom";

const AppNavigator = createStackNavigator(
    {
        Home: Home,
        Login: Login,
        Signup: Signup,
        Main: Main,
        ChatScreen: ChatScreen,
        AddFriend: AddFriend,
        CreateGroup: CreateGroup,
        AddRandom: AddRandom,

    },
    {
        initialRouteName: "Main"
    }
);

export default createAppContainer(AppNavigator);