import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import CustomButton from '../components/CustomButton/CustomButton';
import CustomInput from '../components/CustomInput';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { fname, lname, email, password } = this.state;
    console.log(fname, lname, email, password);
  
    try {
      const response = await fetch("http://192.168.1.21:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      const data = await response.json();
      console.log(data, "userRegister");
    } catch (error) {
      this.setState({ error: 'Network error. Please try again later.' });
    }
  };
  

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <CustomInput
   name="username" 
   control={control}
   placeholder="Username" 
   rules={{required:'username is required',
   minLength:{value:3,message:'username should be at least 3 characters long'},
   maxLength:{value:24,message:'username should be max 24 characters long'}
   }}
   />

   <CustomInput 

   name="email"
   control={control}
   placeholder="Email" 
   rules={{required:'Email is required',
   pattern:{value:EMAIL_REGEX,message:'Email is invalid'}
   }}
   />

   <CustomInput 
   name="password"
   control={control}
   placeholder="Password" 
   secureTextEntry 
   rules={{required:'Password is required',
   minLength:{value:8,message:'Password should be at least 8 characters long'}
   }}  
   />

   <CustomInput 
   name="password-repeat"
   control={control}
   placeholder="Repeat Password" 
   secureTextEntry
    rules={{
      validate :value=>value==pwd|| 'Password do not match',
    }}
   />


   <CustomButton 
   text="Register" 
   onPress={handleSubmit(onRegisterPressed)}  />
   <Text style={style.text} >
    By registering, you confirm that you accept our{' '}
    <Text style={style.link} onPress={onTermsOfUsePressed}> Terms of Use </Text>
     and{' '} <Text style={style.link} onPress={onPrivacyPressed} >Privacy Policy </Text> 
     </Text>
     <CustomButton
    text="Have an account? Sign in"
     onPress={onSignInPressed}
      type="TERITARY" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
  },
  input: {
    width: '80%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SignUp;