import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SelectPhoto from '../screens/SelectPhoto';
import TakePhoto from '../screens/TakePhoto';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from "@expo/vector-icons"

const Tab = createMaterialTopTabNavigator()
const Stack = createStackNavigator()

const UploadNav = () => {
  return (<Tab.Navigator tabBarPosition="bottom"
    tabBarOptions={{
      style: {
        backgroundColor: "white",
      },
      activeTintColor: "black",
      indicatorStyle: {
        backgroundColor: "brown",
        top: 0
      }
    }}
  >
    <Tab.Screen name="Select" >
      {() => <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerTintColor: "black",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "white",
            shadowOpacity: 0.3,
          },
          indicatorStyle: {
            backgroundColor: "white",
            top: 0
          },
          headerBackImage: ({ tintColor }) => <Ionicons color={tintColor} name="close" size={28} />
        }}
      >
        <Stack.Screen name="Select" component={SelectPhoto}
          options={{ title: "Choose a Photo" }}
        />
      </Stack.Navigator>}
    </Tab.Screen>
    <Tab.Screen name="Take" component={TakePhoto} />
  </Tab.Navigator>);
}

export default UploadNav;