import React from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Image, TextInput, ScrollView, StyleSheet} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import Types from "./FournituresTypes";
import { useNavigation } from "@react-navigation/native";
import TipsAndResources from "./Tips";




const images = [
    "https://www.espoir31.org/wp-content/uploads/2022/08/appel-dons2-1-1024x724.png",
    "https://cdn.nawaat.org/wp-content/uploads/2016/09/Education-reform-feat.jpg",
    "https://tuniscope.com/uploads/images/content/tunisie-rentree.jpg"
];

const WelcomeScreen = () => {
    const navigation = useNavigation();
    return(
        <SafeAreaView style={{flex: 1}}>
        <View style={ {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    }}>
                <Text style={{
                     flex: 1,
                   fontSize: 22,
                   fontWeight: 'bold',
                   color: '#051C60',
                   textAlign:'center'
                   }}>Fournitures2Give</Text>
                <TouchableOpacity onPress={() => {
                   navigation.navigate('Notification')
                }}>
                    <Ionicons name="notifications-sharp" size={26} color="#3B71F3" />
                </TouchableOpacity>
            </View>
        <ScrollView>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderWidth: 1,
                    margin: 10,
                    padding: 10,
                    borderColor: "gray",
                    borderRadius: 7,
                }}>
                <TextInput style={{fontSize: 17}} placeholder="Search for ..."/>  
                <AntDesign name="search1" size={24} color="#3B71F3"/>
             
            </View>
            <View>
                <SliderBox
                    images={images}
                    sliderBoxHeight={200}
                    dotColor="#3B71F3"
                    inactiveDotColor="#90A4AE"
                    autoplay
                    circleLoop
                    ImageComponentStyle={{ borderRadius: 6, width: '94%', marginTop: 10}}
                />
            </View>
            <Types />
            <TouchableOpacity
                style={{
                    backgroundColor: '#FF5722',
                    alignItems: 'center',
                    padding: 16,
                    borderRadius: 8,
                    margin: 10,
                }}
                onPress={() => {
                   navigation.navigate('AddFourniture')
                }}>
                <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>Donate Now !</Text>
            </TouchableOpacity>
        <TipsAndResources />

        </ScrollView>
        </SafeAreaView>
    )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    heading: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      margin: 20,
    },
    subheading: {
      fontSize: 22,
      fontWeight: "bold",
      margin: 15,
    },
    body: {
      fontSize: 16,
      margin: 10,
    },
    link: {
      fontSize: 16,
      fontWeight: "bold",
      color: "blue",
      margin: 10,
    },
  });