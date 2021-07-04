import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import UploadForm from '../screens/UploadForm';
import TabsNavigator from './TabsNavigator';
import UploadNav from './UploadNav';
import { Ionicons } from "@expo/vector-icons"

const Stack = createStackNavigator()

const LoggedInNav = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen name="Tabs" options={{ headerShown: false }} component={TabsNavigator} />
      <Stack.Screen name="Upload" options={{ headerShown: false }} component={UploadNav} />
      <Stack.Screen name="UploadForm" options={{
        headerTitleAlign: "center",
        title: "Upload",
        headerBackTitleVisible: false,
        headerBackImage: ({ tintColor }) => <Ionicons color={tintColor} name="close" size={28} />
      }} component={UploadForm} />
    </Stack.Navigator>

  );
}

export default LoggedInNav;