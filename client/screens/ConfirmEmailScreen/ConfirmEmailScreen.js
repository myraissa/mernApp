import React,{useState} from 'react';
import {View,Text,StyleSheet,ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import{useForm} from 'react-hook-form';

const ConfirmEmailScreen= ()=>{
 const{control,handleSubmit}=useForm();
 const navigation=useNavigation();
 

 const onSignInPressed=()=>{
  navigation.navigate('SignIn');

 };

 const onResendPressed=()=>{
  console.warn('onResendPressed');

 };
 const onConfirmPressed=()=>{
  navigation.navigate('Home');
  
 };

 return( 

 <View style={styles.root}>
  <Text style={styles.title}>Confirm your Email</Text>
  <Text style={styles.text}>Hi there !</Text>
  <Text style={styles.text}>Welcome to fourniturres2give!{"\n"} {"\n"}We're excited you're joining us.</Text>
  <Text style={styles.text}>Ready to get started?{"\n"} Please check your email inbox to confirm your email address before you can sign in at any time.</Text>
  
   <CustomButton
    text="Back to Sign in"
     onPress={onSignInPressed}
      type="TERITARY" /> 
 </View>
 );
} 

const styles =StyleSheet.create({
  root:{
    flex:1,
    alignItems:'center',
    padding:20,
    backgroundColor: '#F9FBFC',
    justifyContent: 'center',
  },
  
  title:{
    fontSize:24,
    fontWeight:'bold',
    color:'#051C60',
    margin:10,
  },
  text:{
    
    fontSize: 16,
    textAlign: 'center',
    color:'black',
    marginVertical:10,

  },

})
export default ConfirmEmailScreen ;