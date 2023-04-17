import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import CustomButton from '../components/CustomButton/CustomButton';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
const categories = [

  { label: 'Adhesives', value: 'Adhesives' },
  { label: 'Aprons', value: 'Aprons' },
  { label: 'Backpacks', value: 'Backpacks' },
  { label: 'Books', value: 'Books' },
  { label: 'Calculators', value: 'Calculators' },
  { label: 'Chalk', value: 'Chalk' },
  { label: 'Chalkboard erasers', value: 'Chalkboard erasers' },
  { label: 'Compass', value: 'Compass' },
  { label: 'Dictionaries', value: 'Dictionaries' },
  { label: 'Drawing supplies', value: 'Drawing supplies' },
  { label: 'Erasers', value: 'Erasers' },
  { label: 'Folders', value: 'Folders' },
  { label: 'Notebooks', value: 'Notebooks' },
  { label: 'Papers', value: 'Papers' },
  { label: 'Pencil', value: 'Pencil' },
  { label: 'Pen', value: 'Pen' },
  { label: 'Rulers', value: 'Rulers' },
  { label: 'Scissors', value: 'Scissors' },
  { label: 'Slateboards', value: 'Slateboards' },
];

const availabilities = [
  { label: 'Daytime on weekdays', value: 'Daytime on weekdays' },
  { label: 'I am flexible', value: 'I am flexible' },
  { label: 'Weekends', value: 'Weekends' },
  { label: 'Weekday evenings', value: 'Weekday evenings' },
]

const AddScreen = () => {
  const [imageAsset, setImageAsset] = useState('');
  const [name, setName] = useState('');
  const [availability, setAvailability] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  
 
  const imageToBase64 = async (uri) => {
    console.log(uri);
    let reader = new FileReader();
    reader.readAsDataURL(uri.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImageAsset(reader.result);
    };
    reader.onerror = error => {
      console.log("Error : ",error);
    }
  }

  
  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = Asset.fromURI(result.uri);
      await asset.downloadAsync();
      const base64Image = await imageToBase64(result.uri);
      setImageAsset({ uri: result.uri, base64: base64Image });
    }
  };
  const handleAddFourniture = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        console.error('User token not found');
        return;
      }
      
      const response = await fetch('http://192.168.1.21:5000/Fourniture', {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          name,
          availability,
          description,
          category,
          token,
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <ScrollView>
    <View style={styles.imageContainer}>
      {imageAsset ? ( <Image source={{ uri: imageAsset }} style={styles.image}  /> ):(
       <TouchableOpacity style={styles.imagePlaceholder} onPress={handlePickImage}>
       <Text style={styles.imagePlaceholderText}>Pick an image from your gallery</Text>
     </TouchableOpacity>)}
      <View style={styles.imageButtonsContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={handlePickImage}>
          <Text style={styles.imageButtonText}>Pick from gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
      <View style={styles.container}>
        <Text style={styles.label}>Title of your ad</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} value={description} onChangeText={setDescription} />
     
        </View> 

      <View style={{paddingHorizontal : 20}}>
        <Text style={styles.label}>Category</Text>
        <SelectList
          data={categories}
          value={category}
          setSelected={(val) => setCategory(val)}
          dropdownStyle={styles.dropdownStyle}
        />
        <Text style={styles.label}>
        Availability
        </Text>
     
       <SelectList
       data={availabilities}
       value={availability}
       setSelected={(val) => setAvailability(val)}
       dropdownStyle={styles.dropdownStyle}
     />
     </View>
     <View style={styles.container}>
     <CustomButton
       text="Add Furniture"
       onPress={handleAddFourniture}
       style={styles.button}
     />
     </View>

</ScrollView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
margin: 20,
alignItems: 'center',
},
label: {
  fontSize: 13,
  fontWeight: 'bold',
  color: '#3B71F3',
  lineHeight: 24,
  textAlign: 'center',
  fontFamily: 'Helvetica Neue',
},
input: {
width: '100%',
height:40,
borderWidth: 1,
borderColor: 'gray',
borderRadius: 10,
paddingLeft: 5,
paddingRight: 10,
marginBottom: 20,
},
dropdownStyle: {
height: 200,
borderWidth: 1,
borderColor: 'gray',
borderRadius: 5,
paddingLeft: 10,
paddingRight: 10,
marginBottom: 20,
},
button: {
marginTop: 40,
},
imageContainer: {
  alignItems: 'center',
  marginVertical: 20,
},
image: {
  width: 150,
  height: 150,
  marginBottom: 10,
  borderRadius: 100,
  resizeMode: 'cover',
},
imagePlaceholder: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderStyle: 'dashed',
  borderRadius: 100,
  width: 200,
  height: 200,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 10,
},
imagePlaceholderText: {
  color: '#ccc',
},
imageButtonsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
},
imageButton: {
  backgroundColor: 'white',
  padding: 10,
  borderRadius: 18,
  borderColor:'#3B71F3',
borderWidth:2,
},
imageButtonText: {
  fontSize: 13,
  fontWeight: 'bold',
  color: '#3B71F3',
  lineHeight: 24,
  textAlign: 'center',
  fontFamily: 'Helvetica Neue',
}
});

export default AddScreen;
