import React from 'react';
import { TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0px 40px;
  background-color: #fcfaf4;
`

const Logo = styled.Image`
  width: 100%;
  height: 160px;
  margin-bottom: 20px;
`

const AuthLayout = ({ children }) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} disabled={Platform.OS === "web"}>
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
    </TouchableWithoutFeedback>
  );
}

export default AuthLayout;