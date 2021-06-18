import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import { useReactiveVar } from '@apollo/client';
import { isLogginVar } from '../apollo';
import LoggedOutNav from './loggedOutNav';

const Tabs = createBottomTabNavigator()

const TabsNavigator = () => {
  const isLoggin = useReactiveVar(isLogginVar)
  return (<Tabs.Navigator>
    <Tabs.Screen name="Home" component={Home} />
    <Tabs.Screen name="Search" component={Search} />
    <Tabs.Screen name="Profile" component={isLoggin ? Profile : LoggedOutNav} />
  </Tabs.Navigator>);
}

export default TabsNavigator;