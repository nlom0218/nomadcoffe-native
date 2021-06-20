import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import AuthMsg from '../components/auth/AuthMsg';
import { TextInput } from '../components/auth/AuthShared';

const CREATE_ACCOUNT = gql`
  mutation createAccount($username: String!, $email: String!, $password: String!) {
    createAccount(username: $username, email: $email, password: $password) {
      ok
      error
    }
  }
`

const CreateAccount = ({ navigation }) => {
  const { register, watch, handleSubmit, setValue, getValues } = useForm()
  const onCompleted = (result) => {
    const { createAccount: { ok, error } } = result
    if (ok) {
      navigation.navigate("Login", {
        ...getValues()
      })
    }
  }
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT, {
    onCompleted
  })
  const emailRef = useRef()
  const passwordRef = useRef()
  useEffect(() => {
    register("username", {
      required: true,
      minLength: {
        value: 5,
        message: "5자 이상 입력해 주세요."
      }
    })
    register("email", {
      required: true
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
      createAccount({
        variables: { ...data }
      })
    }
  }
  return (<AuthLayout>
    <TextInput
      value={watch("username")}
      placeholder="Username"
      placeholderTextColor="gray"
      returnKeyType="next"
      onChangeText={(text) => setValue("username", text)}
      autoCapitalize="none"
      onSubmitEditing={() => onNext(emailRef)}
    />
    <TextInput
      value={watch("email")}
      ref={emailRef}
      placeholder="Email"
      placeholderTextColor="gray"
      returnKeyType="next"
      onChangeText={(text) => setValue("email", text)}
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
    <AuthButton
      onPress={handleSubmit(onValid)}
      text="가입"
      loading={loading}
      disabled={!watch("username") || !watch("password") || !watch("email")}
    />
    <AuthMsg
      navigation={navigation}
      path="Login"
      text="계정이 있으신가요?"
      linkMsg="로그인" />
  </AuthLayout>);
}

export default CreateAccount;