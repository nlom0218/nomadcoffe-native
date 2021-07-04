import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { userLogOut } from '../apollo';
import useMe from '../hooks/useMe';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Me = () => {
  return (
    <Container>
      <TouchableOpacity onPress={userLogOut}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </Container>
  )
}

export default Me;