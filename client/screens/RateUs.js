import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';


const numStars = 5;

export default function RateUs() {
  const { handleSubmit, control }  = useForm();
  const [rating, setRating] = useState(0);

  const submitRating = (data) => {
    console.log(data.rating);
    fetch("http://192.168.1.21:5000/rating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        rating: data.rating,
        feedback: data.feedback,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'submitRating');
      });
  };

  const rate = star => {
    setRating(star);
  };

  const renderStars = () => {
    let stars = []
    for (let x = 1; x <= numStars; x++) {
      stars.push(
        <TouchableOpacity
          key={x}
          onPress={() => rate(x)}
        >
          <FontAwesome
            name={x <= rating ? 'star' : 'star-o'}
            size={32}
            color='#3B71F3'
            style={{ marginHorizontal: 6 }}
          />
        </TouchableOpacity>
      )
    }
    return stars;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Your opinion matters to us!</Text>
      <Text style={styles.text2Style}>We are always trying to improve</Text>
      <Text style={styles.text2Style}>what we do and your feedback</Text>
      <Text style={styles.text2Style}>is valuable!</Text>
      <View style={styles.starStyle}>
        {renderStars()}
      </View>
      <Controller
        control={control}
        name="feedback"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.feedbackInput}
            placeholder='Enter your feedback here'
            multiline={true}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={handleSubmit(submitRating)}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e8e8e8'
    },
    textStyle: {
        fontWeight: "bold",
       textAlign:'center',
        fontSize: 23,
        margin: 30,
        justifyContent: 'center'
    },
    text2Style: {
       
        textAlign:'center',
         fontSize: 15,
         
         justifyContent: 'center'
     },

    starStyle: {
        flexDirection: "row",
        justifyContent: 'center',
        marginTop: 30
    },

    buttonStyle:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        padding: 15,
        backgroundColor: '#3B71F3'
    },
    button2Style:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        backgroundColor: '#3B71F3'
    }
});