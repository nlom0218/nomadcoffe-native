import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useReactiveVar } from '@apollo/client';
import { isLogginVar } from '../apollo';
import LoggedOutNav from './LoggedOutNav';
import StackNavFactory from './SharedStackNav';
import TabIcon from '../components/nav/TabIcon';
import { Image } from 'react-native';
import useMe from '../hooks/useMe';
import Camera from '../screens/Camera';

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
      options={{ tabBarIcon: ({ focused, color, size }) => <TabIcon iconName="home" color="black" focused={focused} /> }}
    >{() => <StackNavFactory screenName="Home" />}</Tabs.Screen>
    <Tabs.Screen name="Search"
      options={{ tabBarIcon: ({ focused, color, size }) => <TabIcon iconName="search" color="black" focused={focused} /> }}
    >{() => <StackNavFactory screenName="Search" />}</Tabs.Screen>
    <Tabs.Screen name="Camera"
      component={Camera}
      listeners={({ navigation }) => {
        return {
          tabPress: (e) => {
            e.preventDefault()
            navigation.navigate("Upload")
          }
        }
      }}
      options={{ tabBarIcon: ({ focused, color, size }) => <TabIcon iconName="camera" color="black" focused={focused} /> }}
    />
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