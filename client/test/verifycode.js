import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SixDigitPage = () => {
  const [number, setNumber] = useState('');

  const handleSubmit = () => {
    console.log(number);
    // Do something with the entered number, such as sending it to the server
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verify Code</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
         
          onChangeText={(text) => setNumber(text)}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
      
          onChangeText={(text) => setNumber(text)}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
    
          onChangeText={(text) => setNumber(text)}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
       
          onChangeText={(text) => setNumber(text)}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
   
          onChangeText={(text) => setNumber(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  row: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 60,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
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

export default SixDigitPage;