import React, { useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import styled from "styled-components/native"
import { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

const Container = styled.View`
  flex: 1;
  background-color: black;
`

const Top = styled.View`
  flex: 1;
  background-color: white;
`

const Bottom = styled.View`
  flex: 1;
  background-color: white;
`;

const ImageContainer = styled.TouchableOpacity`
`

const Image = styled.Image`
`

const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`

const HeaderRightText = styled.Text`
  color: #0095F6;
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
`

const SelectPhoto = ({ navigation }) => {
  const [ok, setOk] = useState(false)
  const [photos, setPhotos] = useState([])
  const [chosenPhoto, setChosenPhoto] = useState("")
  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync()
    setPhotos(photos)
    setChosenPhoto(photos[0]?.uri)
  }
  const getPermissions = async () => {
    const { accessPrivileges, canAskAgain, status } = await MediaLibrary.getPermissionsAsync()
    if (canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync()
      if (accessPrivileges !== "none") {
        setOk(true)
        getPhotos()
      }
    } else if (accessPrivileges !== "none" || status === "granted") {
      setOk(true)
      getPhotos()
    }
  }
  const HeaderRight = () => <TouchableOpacity onPress={() => navigation.navigate("UploadForm", {
    file: chosenPhoto
  })}>
    <HeaderRightText>Next</HeaderRightText>
  </TouchableOpacity>
  useEffect(() => {
    getPermissions()
  }, [])
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight
    })
  }, [chosenPhoto])
  const choosePhoto = (uri) => {
    setChosenPhoto(uri)
  }
  const numColumns = 4
  const { width } = useWindowDimensions()
  const renderItem = ({ item: photo }) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image source={{ uri: photo.uri }} style={{ width: width / numColumns, height: 100 }} />
      <IconContainer>
        <Ionicons name="checkmark-circle" size={18} color={photo.uri === chosenPhoto ? "#0095F6" : "white"} />
      </IconContainer>
    </ImageContainer>
  )
  return (<Container>
    <StatusBar hidden={false} />
    <Top >
      {chosenPhoto !== "" ? <Image source={{ uri: chosenPhoto }} style={{ width, height: "100%" }} /> : null}
    </Top>

    <Bottom >
      <FlatList
        data={photos}
        keyExtractor={photo => photo.id}
        numColumns={numColumns}
        renderItem={renderItem}
      />
    </Bottom>
  </Container>);
}

export default SelectPhoto;