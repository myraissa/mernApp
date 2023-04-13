import { CardStyleInterpolators } from '@react-navigation/stack';
import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useForm } from 'react-hook-form';
import { Header } from 'react-native-elements';


const ChangePassword = ({navigation}) => {
    const { control, handleSubmit } = useForm();
    
    return (
      <View>
        <Header
        leftComponent={{ icon: 'arrow-back', color: '#000', onPress: () => navigation.goBack() }}
        centerComponent={{ text: 'Change password', style: { color: '#000', fontSize: 18 } }}
        containerStyle={{ backgroundColor: '#e3adb5' }}
      />
      
        <View style={{justifyContent: 'center',alignItems: 'center',padding: 20}}>
          
          <CustomInput
        name="password"
        control={control}
        placeholder="New Password"
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
      <View style={{padding : 30}}>
      <CustomButton text="Submit"/>
      </View>          
            
        </View>
        </View>
    );


};
export default ChangePassword  ;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e8e8e8',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
      },
});
