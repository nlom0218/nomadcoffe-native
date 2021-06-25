import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import DismissKeyboard from '../DismissKeyboard';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0px 40px;
  background-color: white
`

const Logo = styled.Image`
  width: 100%;
  height: 160px;
  margin-bottom: 20px;
`

const AuthLayout = ({ children }) => {
  return (
    <DismissKeyboard>
      <Container>
        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? "20" : "-150"}
        >
          <Logo source={require("../../assets/nomadcoffee-logo.png")} resizeMode="contain" />
        </KeyboardAvoidingView>
        {children}
      </Container>
    </DismissKeyboard>
  );
}

export default AuthLayout;