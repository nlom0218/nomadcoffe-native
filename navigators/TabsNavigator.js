import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Search from '../screens/Search';
import { useReactiveVar } from '@apollo/client';
import { isLogginVar } from '../apollo';
import LoggedOutNav from './LoggedOutNav';
import Me from '../screens/Me';
import StackNavFactory from './SharedStackNav';
import TabIcon from '../components/nav/TabIcon';
import { ActivityIndicator } from 'react-native';

const Tabs = createBottomTabNavigator()

const TabsNavigator = () => {
  const isLoggin = useReactiveVar(isLogginVar)
  return (<Tabs.Navigator
    tabBarOptions={{
      showLabel: false,
      activeTintColor: "black",
      style: {
        backgroundColor: "white"
      }
    }}
  >
    <Tabs.Screen name="Home"
      options={{
        tabBarIcon: ({ focused, color, size }) => <TabIcon iconName="home" color="black" focused={focused} />
      }}
    >{() => <StackNavFactory screenName="Home" />}</Tabs.Screen>
    <Tabs.Screen name="Search"
      options={{
        tabBarIcon: ({ focused, color, size }) => <TabIcon iconName="search" color="black" focused={focused} />
      }}
    >{() => <StackNavFactory screenName="Search" />}</Tabs.Screen>
    <Tabs.Screen name="Me"
      options={{
        tabBarIcon: ({ focused, color, size }) => <TabIcon iconName="person" color="black" focused={focused} />
      }}
    >
      {() => {
        return isLoggin ? <StackNavFactory screenName="Me" /> : <LoggedOutNav />
      }}
    </Tabs.Screen>
  </Tabs.Navigator>);
}

export default TabsNavigator;