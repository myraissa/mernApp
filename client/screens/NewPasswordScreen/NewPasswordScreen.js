import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

const NewPasswordScreen = ({ route }) => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const { code: verificationCode, email } = route.params || {};

  const [enteredCode, setEnteredCode] = useState('');

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };

  const onSubmit = (data) => {
    console.log(data.code, data.password);
    fetch("http://192.168.1.13:5000/ChangePassword", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: data.code,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
      });
  };

  return (
    <View style={style.root}>
      <Text style={style.title}>Reset your password</Text>

      <CustomInput
        name="code"
        control={control}
        placeholder="code"
        value={enteredCode}
        onChangeText={setEnteredCode}
        rules={{ required: 'code is required' }}
      />

      <CustomInput
        name="password"
        control={control}
        placeholder="Enter your new password"
        rules={{
          required: 'password is required',
          minLength: {
            value: 8,
            message: 'Password should at least 8 characters long',
          },
        }}
      />

      <CustomButton text="Submit" onPress={handleSubmit(onSubmit)} />

      <CustomButton text="Back to Sign in" onPress={onSignInPressed} type="TERITARY" />
    </View>
  );
};

const style = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9FBFC',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FBD075',
  },
});

export default NewPasswordScreen;
