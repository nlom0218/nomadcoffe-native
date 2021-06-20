import styled from "styled-components/native"
import React from 'react';
import { ActivityIndicator } from "react-native";

const Button = styled.TouchableOpacity`
  background-color: #895b35;
  width: 100%;
  padding: 10px 0px;
  border-radius: 5px;
  opacity: ${props => props.disabled ? 0.5 : 1};
`

const ButtonText = styled.Text`
  text-align: center;
  color: white;
  font-weight: 600;
`

const AuthButton = ({ text, loading, disabled }) => {
  return (<Button disabled={disabled}>
    {loading ?
      <ActivityIndicator color="white" />
      :
      <ButtonText>{text}</ButtonText>
    }
  </Button>);
}

export default AuthButton;