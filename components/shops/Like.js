import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
import styled from 'styled-components/native';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const TOGGLE_SHOP_LIKE = gql`
  mutation toggleShopLike($shopId: Int!) {
    toggleShopLike(shopId: $shopId) {
      ok
      error
    }
  }
`

const Contanier = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`

const Likes = styled.Text`
  margin-left: 5px;
  font-size: 14px;
`

const Like = ({ likes, isLiked, id }) => {
  const updataToggleShopLike = (cache, result) => {
    const { data: { toggleShopLike: { ok } } } = result
    if (ok) {
      const CoffeeShop = `CoffeeShop:${id}`
      cache.modify({
        id: CoffeeShop,
        fields: {
          isLiked(prev) {
            return !prev
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1
            } else {
              return prev + 1
            }
          }
        }
      })
    }
  }

  const [toggleShopLike, { loading }] = useMutation(TOGGLE_SHOP_LIKE, {
    variables: { shopId: id },
    update: updataToggleShopLike
  })
  return (
    <Contanier>
      <TouchableOpacity onPress={toggleShopLike}>
        <Ionicons name={isLiked ? "heart" : "heart-outline"} size={22} color="tomato" />
      </TouchableOpacity>
      <Likes>{likes === 1 ? `${likes} like` : `${likes} likes`}</Likes>
    </Contanier>
  );
}

export default Like;