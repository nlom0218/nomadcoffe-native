import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../screens/Home';
import Me from '../screens/Me';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import Shop from '../screens/Shop';

const Stack = createStackNavigator()

const StackNavFactory = ({ screenName }) => {
  return (<Stack.Navigator
    mode="card"
    screenOptions={{
      headerBackTitleVisible: false,
      headerTintColor: "black",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "white"
      }
    }}
  >
    {screenName === "Home" && <Stack.Screen name="Home" component={Home} options={{
      title: "Nomad Coffee"
    }} />}
    {screenName === "Search" && <Stack.Screen name="Search" component={Search} />}
    {screenName === "Me" && <Stack.Screen name="Me" component={Me} options={{
      title: "My Profile"
    }} />}
    <Stack.Screen name="Shop" component={Shop} />
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>);
}

export default StackNavFactory;