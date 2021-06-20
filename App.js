import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import TabsNavigator from './navigators/TabsNavigator';
import { AppearanceProvider } from 'react-native-appearance';
import { ApolloProvider } from '@apollo/client';
import { client, isLogginVar, tokenVar } from "./apollo"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [loading, setLoading] = useState(true)

  const preloadAssets = () => {
    const fontToLoad = [Ionicons.font]
    const fontPromise = fontToLoad.map(font => Font.loadAsync(font))
    const imagesToLoad = [require("./assets/nomadcoffee-logo.png")]
    const imagesPromise = imagesToLoad.map(image => Asset.loadAsync(image))
    return Promise.all([...fontPromise, ...imagesPromise])
  }
  const preload = async () => {
    const token = await AsyncStorage.getItem("token")
    if (token) {
      isLogginVar(true)
      tokenVar(token)
    }
    return preloadAssets()
  }
  if (loading) {
    return <AppLoading
      startAsync={preload}
      onFinish={() => setLoading(false)}
      onError={console.warn}
    />
  }

  return (
    <ApolloProvider client={client}>
      <AppearanceProvider>
        <NavigationContainer>
          <TabsNavigator />
        </NavigationContainer>
      </AppearanceProvider>
    </ApolloProvider>
  );
}