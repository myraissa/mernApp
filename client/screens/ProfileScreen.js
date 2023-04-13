import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity, Button, Text, Image, ScrollView } from 'react-native';
import { Avatar, Caption, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, Feather } from '@expo/vector-icons'; 
import { AntDesign, MaterialIcons ,Octicons} from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import {  useRoute } from '@react-navigation/native';


export default function ProfileScreen () {
  

  const navigation = useNavigation();

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const handleSignIn =() =>{
    navigation.navigate('SignIn')
  };
  const handleHistory =() =>{
    navigation.navigate('HistoryScreen')
  };

  const AboutUs = () =>{
    navigation.navigate('AboutUs');
  }

  const RateUs = () => {
    navigation.navigate('RateUs');
  }
  const [image, setImage] = useState(null);


  const [userData, setUserData] = useState({});
  const route = useRoute();
  const updatedUserData = route.params?.userData;
  useEffect(() => {
    if (updatedUserData) {
      setUserData(updatedUserData);
    }
  }, [updatedUserData]);
  
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

  return (
    <ScrollView>
    <View style={styles.container}>
      

      <View style={styles.header}>
        <View style={{flexDirection: 'row', paddingLeft : 20}}>
      {image ? <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius:100, justifyContent: 'center'}} />: <FontAwesome5 name="user" size={80} color="gray" />} 
      <View style={styles.test} >
        <Title style={styles.title}>{userData.fname + " " + userData.lname}</Title>
        <Caption style={styles.caption}>{userData.email}</Caption>
      </View>
      </View>

      <View style={{
        alignItems:'center',
        paddingTop : 10
      }}>


      <TouchableOpacity style={{
        backgroundColor :'#3B71F3',
        height:40,
        width:'90%',
        justifyContent:'center',
        borderRadius: 8,
        alignItems:'center' }}
        onPress={handleEditProfile}>
        <Text style={{fontSize: 15, color:'white',fontWeight: 'bold'}}>Edit Account </Text>
      </TouchableOpacity>

      </View>

      </View>



      <View style={{marginTop: 30}}>
     <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
      <Feather name="shopping-bag" size={24} color="#3B71F3" />
      <Text style={styles.text}>My Orders</Text>
      <AntDesign style={styles.icon} name="right" size={24} color="black" />
      </TouchableOpacity>
      
      
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
      <Feather name="unlock" size={24} color="#3B71F3" />
      <Text style={styles.text}>Change password</Text>
      <AntDesign style={styles.icon} name="right" size={24} color="black" />
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} onPress={handleHistory}>
      <Octicons name="history" size={24} color="#3B71F3" />
      <Text style={styles.text}>purchase history</Text>
      <AntDesign style={styles.icon} name="right" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={RateUs}>
      <AntDesign name="staro" size={24} color="#3B71F3" />
      <Text style={styles.text}>Rate app</Text>
      <AntDesign style={styles.icon} name="right" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={AboutUs}>
      <Octicons name="note" size={24} color="#3B71F3" />
      <Text style={styles.text}>About app</Text>
      <AntDesign style={styles.icon} name="right" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <AntDesign name="logout" size={24} color="#3B71F3" />
      <Text style={styles.text}>Log out</Text>
      </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection:'column',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    borderRadius: 10,
    
  },
   test : {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft : 20
   },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#3B71F3'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    marginTop: 5,
  },
  button: {
    marginBottom: 2,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 15,
    height:50
 
  },
  text: {
    marginLeft: 20,
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonText: {
    
  },
  icon: {
    position: 'absolute',
    right: 20,
    marginTop: 10
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E96590',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70
  }
  
});
