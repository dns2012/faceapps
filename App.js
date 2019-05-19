
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import Present from './screens/Present';
import Login from './screens/Login';
import Forget from './screens/Forget';
import Profile from './screens/Profile';
import History from './screens/History';
import Location from './screens/Location';
import Friends from './screens/Friends';


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
    initialRouteName : 'Location'
  },
);


const App = createAppContainer(MainNavigator);

export default App;

