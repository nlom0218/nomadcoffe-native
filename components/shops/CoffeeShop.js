import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from "@react-navigation/native"
import Like from './Like';

const Contanier = styled.View`
  margin-bottom: 10px;
  width: 100%;
`
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`
const Username = styled.Text`
  font-size: 16px;
  font-weight: 600;
`
const File = styled.Image`
  width: ${props => props.width};
  height: ${props => props.height};
`
const Info = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`

const Categories = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Text = styled.Text`
  margin-right: 10px;
  font-size: 14px;
`

const Category = styled.Text`
  margin-right: 5px;
  font-size: 14px;
  font-weight: 600;
`

const Caption = styled.Text`
  padding: 0px 10px;
  font-size: 14px;
`

const CoffeeShop = ({ shop }) => {
  const { width, height } = useWindowDimensions()
  const navigation = useNavigation()
  return (<Contanier>
    <Header onPress={() => navigation.navigate("Profile")}>
      <UserAvatar source={{ uri: shop.user.avatarURL }}
      />
      <Username>{shop.user.username}</Username>
    </Header>
    <File source={{ uri: shop.photos[0].url }} width={width} height={Math.ceil(height - 550)} />
    <Info>
      <Categories>
        <Text>Categories</Text>
        {shop.categories.map((item, index) =>
          <Category key={index}>{item.name}</Category>
        )}
      </Categories>
      <Like likes={shop.likes} isLiked={shop.isLiked} id={shop.id} />
    </Info>
    <Caption>{shop.name}</Caption>
  </Contanier >);
}

export default CoffeeShop;