import { Camera } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components/native"
import { Ionicons } from "@expo/vector-icons"
import { Alert, Image, StatusBar, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import * as MediaLibrary from "expo-media-library"
import { useIsFocused } from "@react-navigation/core";

const Container = styled.View`
  flex: 1;
  background-color: black;
`

const Actions = styled.View`
  flex: 0.35;
  padding: 0px 50px;
  align-items: center;
  justify-content: space-around;
  
`

const TackPhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255,255,255,0.5);
  border: 2px solid rgba(255,255,255,0.8);
  border-radius: 50px;
`

const SliderContainer = styled.View``

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const ActionsContainer = styled.View`
  flex-direction: row;
`

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`

const PhotoActions = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`

const PhotoAction = styled.TouchableOpacity`
  background-color: white;
  padding: 5px 10px;
  border-radius: 4px;
`

const PhotoActionText = styled.Text`
  font-weight: 600;

`


const TakePhoto = ({ navigation }) => {
  const camera = useRef()
  const [takenPhoto, setTakenPhoto] = useState("")
  const [ok, setOk] = useState(false)
  const [zoom, setZoom] = useState(0)
  const [cameraReady, setCameraReady] = useState(false)
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const getPermissions = async () => {
    const { granted } = await Camera.requestPermissionsAsync()
    setOk(granted)
  }
  useEffect(() => {
    getPermissions()
  }, [])
  const onCameraSwith = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back)
    } else {
      setCameraType(Camera.Constants.Type.front)
    }
  }
  const onZoomonValueChange = (e) => {
    setZoom(e)
  }
  const onFlashChange = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on)
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto)
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off)
    }
  }
  const goToUpload = async (save) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhoto)
    }
    navigation.navigate("UploadForm", {
      file: takenPhoto
    })
  }
  const onUpload = () => {
    Alert.alert("Save Photo?", "Save photo & upload or just upload", [
      {
        text: "Save & Upload",
        onPress: () => goToUpload(true)
      },
      {
        text: "Just Upload",
        onPress: () => goToUpload(false)
      }
    ])
  }
  const onCameraReady = () => setCameraReady(true)
  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true
      })
      setTakenPhoto(uri)
    }
  }
  const onDismiss = () => setTakenPhoto("")
  const isFocused = useIsFocused()
  return (<Container>
    {isFocused ? <StatusBar hidden={true} /> : null}
    {takenPhoto === "" ? <Camera
      type={cameraType}
      style={{ flex: 1 }}
      zoom={zoom}
      flashMode={flashMode}
      ref={camera}
      onCameraReady={onCameraReady}
    >
      <CloseButton onPress={() => navigation.navigate("Home")}>
        <Ionicons name="close" color="white" size={30} />
      </CloseButton>
    </Camera> : <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />}
    {takenPhoto === "" ? <Actions>
      <SliderContainer>
        <Slider
          style={{ width: 200, height: 20 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="rgba(255,255,255,0.7)"
          onValueChange={onZoomonValueChange}
        />
      </SliderContainer>
      <ButtonsContainer>
        <TouchableOpacity onPress={onFlashChange} >
          <Ionicons
            color="white"
            size={30}
            name={
              flashMode === Camera.Constants.FlashMode.off ? "flash-off"
                : flashMode === Camera.Constants.FlashMode.on ? "flash"
                  : flashMode === Camera.Constants.FlashMode.auto ? "eye"
                    : null
            }
          />
        </TouchableOpacity>
        <TackPhotoBtn
          onPress={takePhoto}
        />
        <TouchableOpacity onPress={onCameraSwith}>
          <Ionicons
            color="white"
            size={30}
            name="camera-reverse"
          />
        </TouchableOpacity>
      </ButtonsContainer>
    </Actions> :
      <Actions>
        <PhotoActions>
          <PhotoAction onPress={onDismiss}><PhotoActionText>Dismiss</PhotoActionText></PhotoAction>
          <PhotoAction onPress={onUpload}><PhotoActionText>Upload</PhotoActionText></PhotoAction>
        </PhotoActions>
      </Actions>
    }
  </Container>);
}

export default TakePhoto;