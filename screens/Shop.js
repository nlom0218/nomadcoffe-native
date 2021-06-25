import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import CoffeeShop from '../components/shops/CoffeeShop';

const SEE_COFFEESHOP = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
        id
        name
        photos {
          url
          rep
        }
        user {
          id
          username
          avatarURL
        }
        categories {
          id
          name
        }
        likes
        isLiked
    }
  }
`

const Shop = ({ navigation, route }) => {
  const { data, loading, refetch } = useQuery(SEE_COFFEESHOP, {
    variables: { id: route?.params?.shopId }
  })
  const [refreshing, setRefreshing] = useState()
  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center"
        }}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        }
      >
        <CoffeeShop shop={data?.seeCoffeeShop} />
      </ScrollView>
    </ScreenLayout>
  );
}

export default Shop;