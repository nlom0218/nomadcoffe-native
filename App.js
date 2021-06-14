import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import styled from 'styled-components';


const Logo = styled.Image`
  max-width: 100%;
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
`

export default function App() {
  const [loading, setLoading] = useState(true)

  const startAsync = () => {
    const fontToLoad = [Ionicons.font]
    const fontPromise = fontToLoad.map(font => Font.loadAsync(font))
    const imagesToLoad = [require("./assets/nomadcoffee-logo.png")]
    const imagesPromise = imagesToLoad.map(image => Asset.loadAsync(image))
    return Promise.all([...fontPromise, ...imagesPromise])
  }
  if (loading) {
    return <AppLoading
      startAsync={startAsync}
      onFinish={() => setLoading(false)}
      onError={console.warn}
    />
  }

  return (
    <View style={styles.container}>
      <Logo source={require("./assets/nomadcoffee-logo.png")} resizeMode="contain" />
      <Text>WelCome NomadCoffee</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
