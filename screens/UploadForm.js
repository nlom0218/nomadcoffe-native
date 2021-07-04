import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import styled from 'styled-components/native';
import { TextInput } from '../components/auth/AuthShared';
import DismissKeyboard from '../components/DismissKeyboard';
import { ReactNativeFile } from "apollo-upload-client"

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 0px 50px;
`

const Photo = styled.Image`
  height: 30px;
`

const CategoriesContainer = styled.View`
  margin-top: 30px;
`

const HeaderRightText = styled.Text`
  color: #0095F6;
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
`

// const Categories = styled.TextInput`
//   background-color: gray;
// `

const UPLOAD_IN_NATIVE = gql`
  mutation uploadInNative($name: String!, $photo: Upload!, $categories: String) {
    uploadInNative(name: $name, photo: $photo, categories: $categories) {
      ok
      error
    }
  }
`

const UploadForm = ({ route, navigation }) => {
  const file = new ReactNativeFile({
    uri: route.params.file,
    name: `1.jpeg`,
    type: "image/jpeg",
  })
  const categories = useRef()
  const { register, handleSubmit, setValue } = useForm()
  const [uploadInNative, { loading }] = useMutation(UPLOAD_IN_NATIVE)
  useEffect(() => {
    register("categories")
    register("name")
  }, [register])
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null })
    })
  }, [loading])
  const HeaderRight = () => <TouchableOpacity onPress={handleSubmit(onValid)}>
    <HeaderRightText>Next</HeaderRightText>
  </TouchableOpacity>
  const HeaderRightLoading = () => <ActivityIndicator size="small" color="black" style={{ marginRight: 10 }} />
  const onValid = ({ categories, name }) => {
    uploadInNative({
      variables: {
        categories,
        name,
        photo: file
      }
    })
  }
  const onNext = (nextOne) => {
    nextOne?.current?.focus()
  }
  return (
    <DismissKeyboard>
      <Container>
        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? "20" : "-150"}
        >
        </KeyboardAvoidingView>
        <Photo scource={{ uri: route.params.file }} />
        <CategoriesContainer>
          <TextInput
            placeholderTextColor="gray"
            placeholder="Write a title"
            onChangeText={text => setValue("name", text)}
            onSubmitEditing={handleSubmit(onValid)}
            returnKeyType="next"
            onSubmitEditing={() => onNext(categories)}
          />
          <TextInput
            placeholderTextColor="gray"
            placeholder="Write a Categories"
            onChangeText={text => setValue("categories", text)}
            onSubmitEditing={handleSubmit(onValid)}
            returnKeyType="done"
            ref={categories}
          />
        </CategoriesContainer>
      </Container>
    </DismissKeyboard>);
}

export default UploadForm;