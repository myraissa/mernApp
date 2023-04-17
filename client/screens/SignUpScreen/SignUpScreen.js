import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUp = () => {
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();
  const onSignInPressed=()=>{
    navigation.navigate('SignIn');
  
   };
   const onTermsOfUsePressed=()=>{
    console.warn('onTermsOfUsePressed');
  
   };
   const onPrivacyPressed=()=>{
    console.warn('onPrivacyPressed')
  
   };
   const onRegisterPressed=()=>{
   navigation.navigate('ConfirmEmail')
  
   };

  const onSubmit = (data) => {
    console.log(data.fname, data.lname, data.email, data.password);
    fetch('http://192.168.1.21:5000/register', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'userRegister');
      });
  };

  const handleSendAndReset = (data) => {
    onSubmit(data);
    onRegisterPressed(); 
  };
  return (
    <View style={styles.root}>
      <CustomInput
        name="fname"
        control={control}
        placeholder="First name"
        rules={{
          required: 'First name is required',
          minLength: { value: 3, message: 'First name should be at least 3 characters long' },
          maxLength: { value: 24, message: 'First name should be max 24 characters long' },
        }}
      />
      <CustomInput
        name="lname"
        control={control}
        placeholder="Last name"
        rules={{
          required: 'Last name is required',
          minLength: { value: 3, message: 'Last name should be at least 3 characters long' },
          maxLength: { value: 24, message: 'Last name should be max 24 characters long' },
        }}
      />

      <CustomInput
        name="email"
        control={control}
        placeholder="Email"
        secureTextEntry={false}
        rules={{
          required: 'Email is required',
          pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
        }}
      />

      <CustomInput
        name="password"
        control={control}
        placeholder="Password"
        secureTextEntry
        rules={{ required: 'Password is required', minLength: { value: 8, message: 'Password should be at least 8 characters long' } }}
      />

      <CustomInput
        name="password_repeat"
        control={control}
        placeholder="Repeat Password"
        secureTextEntry
        rules={{
          required: 'Password is required',
          validate: (value) => value === pwd || 'Password do not match',
        }}
      />
      <CustomButton text="Register" onPress={handleSubmit(handleSendAndReset)} />

      <Text style={styles.text}>
        By registering, you confirm that you accept our{' '}
        <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>
      </Text>

      <CustomButton text="Have an account? Sign in" onPress={onSignInPressed} type="TERITARY" />
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
    text:{
      color:'gray',
      marginVertical:10,
  
    },
    link:{
      color:'#FBD075',
  
  
    },
    });
    
    export default SignUp;