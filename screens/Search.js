import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, useWindowDimensions, View, FlatList, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import DismissKeyboard from '../components/DismissKeyboard';

const SEARCH_CATEGORY_NATIVE = gql`
  query searchCategoryNative($category: String!) {
    searchCategoryNative(category: $category) {
        id
        name
        photos {
          url
          rep
        }
    }
  }
`

const MessageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const MessageText = styled.Text`
  font-weight: 600;
  margin-top: 15px;
`

const Input = styled.TextInput`
  background-color: rgba(225, 225, 225, 0.7);
  width: ${props => Math.ceil(props.width / 1.5)}px;
  color: black;
  padding: 5px 10px;
  border-radius: 7px;
`

const Search = ({ navigation }) => {
  const numColumns = 4
  const { width } = useWindowDimensions()
  const { register, setValue, watch, handleSubmit } = useForm()
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_CATEGORY_NATIVE)
  const SearchBox = () => {
    return <Input
      width={width}
      placeholder="Search Category"
      placeholderTextColor="rgba(0,0,0,0.7)"
      autoCapitalize="none"
      returnKeyType="search"
      returnKeyLabel="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("category", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  }
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox
    })
    register("category", {
      required: true,
    })
  }, [])
  const onValid = ({ category }) => {
    console.log(category);
    startQueryFn({
      variables: {
        category
      }
    })
  }
  console.log(data);
  const renderItem = ({ item: shop }) => <TouchableOpacity onPress={() => navigation.navigate("Shop", { shopId: shop.id })}>
    <Image source={{ uri: shop.photos[0].url }} style={{ width: width / numColumns, height: 100 }} />
  </TouchableOpacity>
  return (<DismissKeyboard>
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {loading ? <MessageContainer>
        <ActivityIndicator size="large" color="black" />
        <MessageText>Searching...</MessageText>
      </MessageContainer> : null}
      {!called ? <MessageContainer>
        <MessageText>Searching by category</MessageText>
      </MessageContainer> : null}
      {data?.searchCategoryNative !== undefined ? (data?.searchCategoryNative?.length === 0 ? <MessageContainer>
        <MessageText>Could not find anything.</MessageText>
      </MessageContainer>
        : <FlatList
          numColumns={numColumns}
          data={data?.searchCategoryNative}
          keyExtractor={item => "" + item.id}
          renderItem={renderItem}
        />)
        : null}
    </View>
  </DismissKeyboard>);
}

export default Search;