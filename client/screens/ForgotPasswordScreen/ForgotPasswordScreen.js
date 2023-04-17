import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import{useForm} from 'react-hook-form';

const ForgotPasswordScreen= ()=>{
  const{handleSubmit,control}=useForm();
  const navigation=useNavigation();
 
  const onSignInPressed=()=>{
    navigation.navigate('SignIn');
  
   };
   const onSendPressed=()=>{
    navigation.navigate('NewPassword') };
 
   
  const onSubmit = (data) => {
    console.log(data.email);
    fetch("http://192.168.1.21:5000/reset_password", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: data.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
      });
  };

  const handleSendAndReset = (data) => {
    onSubmit(data);
    onSendPressed(); 
  };

    return (
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>
        <CustomInput 
   name="email"
   control={control}
   placeholder="email" 
   rules={{required:'email is required',minLength:{
   value:3,
   message:'email should be at least 3 characters long'}}}
   />

   <CustomButton text="Send" onPress={handleSubmit(handleSendAndReset)}/>
   <CustomButton
    text="Back to Sign in"
     onPress={onSignInPressed}
      type="TERITARY" />
      </View>
    );
  
}

const styles = StyleSheet.create({
  root:{
    flex:1,
    alignItems:'center',
    padding:20,
    backgroundColor: '#F9FBFC'
  },
  
  title:{
    fontSize:24,
    fontWeight:'bold',
    color:'#051C60',
    margin:10,
  },
  text:{
    color:'gray',
    marginVertical:10,

  },
  link:{
    color:'#FBD075',


  },
});

export default ForgotPasswordScreen;