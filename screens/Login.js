import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { userLogIn } from '../apollo';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import AuthMsg from '../components/auth/AuthMsg';
import { TextInput } from '../components/auth/AuthShared';

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`

const Login = ({ navigation, route: { params } }) => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      username: params?.username,
      password: params?.password
    }
  })
  const onCompleted = async (result) => {
    const { login: { ok, token, error } } = result
    if (ok) {
      await userLogIn(token)
    }
  }
  const [loginMutation, { loading }] = useMutation(LOGIN, {
    onCompleted
  })
  const passwordRef = useRef()
  useEffect(() => {
    register("username", {
      required: true,
      minLength: {
        value: 5,
        message: "5자 이상 입력해 주세요."
      }
    })
    register("password", {
      required: true
    })
  }, [register])
  const onNext = (nextOne) => {
    nextOne?.current?.focus()
  }
  const onValid = (data) => {
    if (!loading) {
      loginMutation({
        variables: { ...data }
      })
    }
  }
  return (
    <AuthLayout>
      <TextInput
        value={watch("username")}
        placeholder="Username"
        placeholderTextColor="gray"
        returnKeyType="next"
        onChangeText={(text) => setValue("username", text)}
        autoCapitalize="none"
        onSubmitEditing={() => onNext(passwordRef)}
      />
      <TextInput
        value={watch("password")}
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        autoCapitalize="none"
        returnKeyType="done"
        lastOne={true}
        onChangeText={(text) => setValue("password", text)}
        onSubmitEditing={handleSubmit(onValid)}
      />
      <AuthButton onPress={handleSubmit(onValid)}
        text="로그인"
        loading={loading}
        disabled={!watch("username") || !watch("password")}
      />
      <AuthMsg
        navigation={navigation}
        path="CreateAccount"
        text="계정이 없으신가요?"
        linkMsg="가입하기"
      />
    </AuthLayout>
  );
}

export default Login;