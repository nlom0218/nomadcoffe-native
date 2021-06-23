import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import CoffeeShop from '../components/shops/CoffeeShop';

const SEE_COFFEE_SHOPS = gql`
   query seeCoffeeSHopsNative($offset: Int!) {
    seeCoffeeSHopsNative(offset: $offset) {
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

const Home = () => {
  const { data, loading, refetch, fetchMore } = useQuery(SEE_COFFEE_SHOPS, {
    variables: { offset: 0 }
  })
  const renderShops = ({ item: shop }) => {
    return <CoffeeShop shop={shop} />
  }
  const [refreshing, setRefreshing] = useState(false)
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        data={data?.seeCoffeeSHopsNative}
        keyExtractor={shop => "" + shop.id}
        renderItem={renderShops}

        showsVerticalScrollIndicator={false}

        refreshing={refreshing}
        onRefresh={refetch}

        onEndReachedThreshold={0.02}
        onEndReached={() =>
          fetchMore({
            variables: { offset: data?.seeCoffeeSHopsNative?.length }
          })
        }
      />
    </ScreenLayout>
  );
}

export default Home;