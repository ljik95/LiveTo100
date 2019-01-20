import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Battle from '../screens/Battle';
import SettingsScreen from '../screens/SettingsScreen';
import { Icon } from 'native-base'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Shop',
  tabBarIcon: ({ focused }) => (
    <Icon
    style={{color: 'yellow'}}
      focused={focused}
      name='cart'
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: Battle,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Play',
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      style={{color: 'red'}}
      name='flame'
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Stats',
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      style={{color: 'green'}}
      name='pulse'
    />
  ),
};

export default createBottomTabNavigator({
  SettingsStack,
  LinksStack,
  HomeStack,
});
