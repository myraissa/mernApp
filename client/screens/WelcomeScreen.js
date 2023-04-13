import React from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const WelcomeScreen = () => {
    return(
        <SafeAreaView>
            <View>
                <Image
                        source={require('../Images/logo.png')}
                        resizeMode= 'contain'
                        style={{
                            justifyContent: 'center',
                            width: 200,
                            height: 200,}}
                />
            </View>
            <TouchableOpacity style={{backgroundColor:'white', padding:20,width:'90',borderRadius:5, flexDirection:'row',justifyContent:'space-between'}}>
                <Text>Get Started</Text>
                <AntDesign name="right" size={22} color="#3B71F3" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default WelcomeScreen;