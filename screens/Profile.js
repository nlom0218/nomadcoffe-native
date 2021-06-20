import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { userLogOut } from '../apollo';
import AuthLayout from '../components/auth/AuthLayout';

const Profile = () => {
  return (
    <AuthLayout>
      <TouchableOpacity onPress={userLogOut}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </AuthLayout>
  )
}

export default Profile;