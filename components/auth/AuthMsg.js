import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const MsgContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  flex-direction: row;
`

const Msg = styled.Text`
  margin-right: 10px;
  color: #211700;
  font-size: 14px;
`

const Link = styled.TouchableOpacity`
`

const LinkText = styled.Text`
  color: #211700;
  font-size: 14px;
  font-weight: 600;
`

const AuthMsg = ({ navigation, path, text, linkMsg }) => {
  return (<MsgContainer>
    <Msg>{text}</Msg>
    <Link onPress={() => navigation.navigate(path)}>
      <LinkText>{linkMsg}</LinkText>
    </Link>
  </MsgContainer>);
}

export default AuthMsg;