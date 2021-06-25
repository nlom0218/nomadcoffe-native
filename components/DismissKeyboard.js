import React from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

const DismissKeyboard = ({ children }) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} disabled={Platform.OS === "web"}>
      {children}
    </TouchableWithoutFeedback>
  );
}

export default DismissKeyboard;