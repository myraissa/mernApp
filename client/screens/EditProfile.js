import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { FontAwesome5 } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { Header } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfile() {
 
  const [fname, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null)
  const [userData, setUserData] = useState({});

  const navigation = useNavigation();
  const {register, setValue, handleSubmit} = useForm();

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  

const onSubmit = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    const response = await fetch('http://192.168.1.13:5000/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        token: token,
        fname: fname,
        lname: lastName,
        email: email,
      }),
    });
    const responseData = await response.json();
    console.log(responseData);
    Alert.alert('Profile Updated', 'Your profile has been updated successfully!', [
      {
        text: 'OK',
         onPress: async () => {
          const updatedUserData = {...userData, fname, lastName, email};
          setUserData(updatedUserData);
          navigation.goBack();
      },
    }
    
    ]);

  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'An error occurred while updating your profile. Please try again later.');
  }
};

 
  const handleDeleteAccount = () => {
    Alert.alert("Delete Account", "Are you sure you want to delete your account?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          fetch("http://192.168.1.13:5000/Delete", {
            method: "DELETE",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              email: email,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data, "userDeleted");
              // After successfully deleting the account, clear the user's token and navigate back to the login screen
              SecureStore.deleteItemAsync("token").then(() => navigation.navigate("Login"));
            });
        },
      },
    ]);
  };
  
  
  

  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = await SecureStore.getItemAsync('token');
        const response = await fetch('http://192.168.1.13:5000/userData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            token: token,
          }),
        });
        const data = await response.json();
        console.log(data, 'userData');
        setUserData(data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserData();
  }, []);

  useEffect(() => {
    setFirstName(userData.fname || '');
    setLastName(userData.lname || '');
    setEmail(userData.email || '');
  }, [userData]);

  return (
    <View>
    <Header
        leftComponent={{ icon: 'arrow-back', color: '#000', onPress: () => navigation.goBack() }}
        centerComponent={{ text: 'Edit Profile', style: { color: '#000', fontSize: 18 } }}
        containerStyle={{ backgroundColor: '#e3adb5' }}
      />
    <View style={{justifyContent: 'center'}}>
      <View style={{justifyContent:'center', alignItems:'center', paddingTop:50, paddingBottom:60}}>
      <TouchableOpacity onPress={handlePickImage}>
        {image ? (
          <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
        ) : (
          <FontAwesome5 name="user" size={80} color="gray" />
        )}
      </TouchableOpacity>

      </View>
     
      <View style={{ flexDirection: 'row' , marginBottom: 30}}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>First Name :</Text>
          </View>

          <TextInput
            style={styles.input}
            value={fname}
            onChangeText={(value) => {
              setValue('fname', value);
              setFirstName(value);
            }}
            placeholder="Enter your first name"
            placeholderTextColor="#A9A9A9"
          />
        </View>

        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Last Name :</Text>
          </View>

          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={(value) => {
              setValue('lname', value);
              setLastName(value);
            }}
            placeholder="Enter your last name"
            placeholderTextColor="#A9A9A9"
          />
        </View>
      </View>

      <View style={styles.container1}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Email :</Text>
        </View>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(value) => {
            setValue('email', value);
            setEmail(value);
          }}
          placeholder="Enter your email"
          placeholderTextColor="#A9A9A9"
        />
      </View>





      <View style={{margin: 100}}>
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} >
      <Text style={{
        fontWeight:'bold',
        color:'white',
        textAlign: 'center',}}>Update</Text>
       </TouchableOpacity>
      <View style={{ marginVertical: 10 }} />
      <TouchableOpacity style={styles.button} onPress={handleDeleteAccount} >
      <Text style={styles.text}>Delete Account</Text>
    </TouchableOpacity>
      </View>   
      
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '40%',
    height: 45,
    borderColor: '#e8e8e8',
    margin: 10,
    borderRadius: 10,
    marginBottom: 5,
    paddingHorizontal: 10,
    marginVertical: 8,
  },

  container1: {
    width: '70%',
    height: 45,
    borderColor: '#e8e8e8',
    borderRadius: 10,
    marginBottom: 5,
    paddingHorizontal: 10,
    marginVertical: 8,
    margin: 10,
  },
  
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#A9A9A9',
    paddingBottom: 5,
    fontSize: 16,
    margin: 10,
  },
  button: {
    backgroundColor: '#3B71F3',
    width:'100%',
    padding:15,
    marginVertical:5,
    alignItems:'center',
    borderRadius:5,
  },
  text: {
    fontWeight:'bold',
    color:'#FA8072',
    textAlign: 'center',
  },
});