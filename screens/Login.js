import React from 'react';
import styled from 'styled-components/native';
import AuthLayout from '../components/auth/AuthLayout';

const TextInput = styled.TextInput`
  width: 100%;
  background-color: rgba(225, 225, 225, 0.15);
  padding: 15px 8px;
  border-radius: 4px;
  color: white;
`

const Login = () => {
  return (
    <AuthLayout>
      <TextInput
        placeholder="Username"
      />
      <TextInput
        placeholder="Password"
      />
    </AuthLayout>
  );
}

export default Login;