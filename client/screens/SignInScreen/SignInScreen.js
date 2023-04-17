import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, Image } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const SignIn = () => {
  const { control, handleSubmit } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');


  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };
  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignInPressed = () => {
    navigation.navigate('Home');
  };

  const onSubmit = (data) => {
    console.log(data.email, data.password);
    fetch('http://192.168.1.21:5000/login', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data, 'userRegister');
        if (data.status === 'ok') {
          await SecureStore.setItemAsync('token', data.data);
          alert('Login successful');
          onSignInPressed();
        } else {
          setErrorMessage('Login failed');
          alert('Verify your password!');
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Login failed');
      });
  };

  return (
    <View style={styles.root}>
      <Image
        source={require('../../Images/logo.png')}
        style={{
          justifyContent: 'center',
          width: 250,
          height: 250,
        }}
        reseizeMode="contain"
      />
      <CustomInput
        name="email"
        placeholder="Email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Invalid email address',
          },
        }}
        setValue={setEmail}
      />
      <CustomInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password should be at least 6 characters long',
          },
        }}
        setValue={setPassword}
      />
      <CustomButton text="Sign In" onPress={handleSubmit(onSubmit)} />

      <CustomButton
        text="Forgot password?"
        onPress={onForgotPasswordPressed}
        type="TERITARY"
      />

      <SocialSignInButtons />
      <CustomButton
        text="Don't have an account? Create one"
        onPress={onSignUpPressed}
        type="TERITARY"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root:{
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    padding:20,
    backgroundColor: '#F9FBFC'
  },
 
});

export default SignIn;
