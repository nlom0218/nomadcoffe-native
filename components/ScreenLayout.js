import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from "styled-components/native";

export const Contanier = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: white;
`

const ScreenLayout = ({ loading, children }) => {
  return (<Contanier>
    {loading ? <ActivityIndicator color="black" /> : children}
  </Contanier>);
}

export default ScreenLayout;