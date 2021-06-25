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
import { ActivityIndicator, Image } from 'react-native';
import useMe from '../hooks/useMe';

const Tabs = createBottomTabNavigator()

const TabsNavigator = () => {
  const isLoggin = useReactiveVar(isLogginVar)
  const { data } = useMe()
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
        tabBarIcon: ({ focused, color, size }) => (
          data?.me?.avatarURL ? <Image source={{ uri: data.me.avatarURL }}
            style={{ height: 30, width: 30, borderRadius: 15, ...(focused && { borderColor: "black", borderWidth: 1 }) }}
          /> : <TabIcon iconName="person" color="black" focused={focused} />
        )
      }}
    >
      {() => {
        return isLoggin ? <StackNavFactory screenName="Me" /> : <LoggedOutNav />
      }}
    </Tabs.Screen>
  </Tabs.Navigator>);
}

export default TabsNavigator;