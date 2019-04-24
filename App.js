
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import Present from './screen/Present';
import Login from './screen/Login';
import Forget from './screen/Forget';
import Profile from './screen/Profile';
import History from './screen/History';
import Location from './screen/Location';
import Friends from './screen/Friends';


const MainNavigator = createStackNavigator(
  {
    Present: {screen: Present},
    Login : {screen: Login},
    Forget : {screen: Forget},
    Profile : {screen: Profile},
    History : {screen: History},
    Location : {screen: Location},
    Friends : {screen: Friends},
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    initialRouteName : 'Present'
  },
);


const App = createAppContainer(MainNavigator);

export default App;

