import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const AboutUs = ({navigation}) => {
    return (
        <View style={styles.container} >
            
            <Image 
                        source={require('../Images/logo.png')}
                        resizeMode= 'contain'
                        style={{
                            justifyContent: 'center',
                            
                            width: 200,
                            height: 200,
                            
                        }}
              />
        
              <Text style={styles.textStyle} >
                Fourniture2give is designed to meet specific needs and make the process 
                of collecting school supplies easier and more efficient. 
                </Text>
                <Text></Text>
              <Text style={styles.textStyle}>
                This app makes it easy for students and their families to find and request 
                the supplies they need while owners can track inventory and easily respond to 
                requests by managing and distributing them.

              </Text>



            
                
            
        </View>
    );


};
export default AboutUs ;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', 
        backgroundColor: '#e8e8e8'
    },
    textStyle : {
       marginLeft: 30,
       marginRight:30,
        fontSize: 15
    }
});