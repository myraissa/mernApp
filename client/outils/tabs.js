import React ,{useEffect, useRef, useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet,  View, Image, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import FindScreen from '../screens/FindScreen';
import AddScreen from '../screens/AddScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { Entypo } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { color } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 
const Tab = createBottomTabNavigator();



  


const Tabs = () => { 
    return(
        <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
         headerShown: false,
            tabBarStyle: {
                height: 50,
              backgroundColor: '#D6E5FA'
            }
          }}
       >
            <Tab.Screen name='HOME' component={WelcomeScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Entypo name="home" size={30} style={{ color: focused ? '#3B71F3' : '#748c94' }} />
                        
                    </View>
                )
            }} />
            <Tab.Screen name='Search' component={FindScreen} options={{
                
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                       <Feather name="search" size={30} style={{color : focused ? '#3B71F3' : '#748c94'}} />  
                    </View>
                ),
               
                 tabBarOnPress: () => {
                      navigation.navigate('Search', { from: 'Drawer' });
                    }
                 
            }} />
            <Tab.Screen name='Add' component={AddScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Octicons name="diff-added" size={30} style={{color : focused ? '#3B71F3' : '#748c94'}} />
                    </View>
                ),
               
            }}/>
            <Tab.Screen name='Orders' component={OrdersScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                       <Feather name="bookmark" size={30} style={{color : focused ? '#3B71F3' : '#748c94'}} />
                       
                    </View>
                )
            }}/>
            <Tab.Screen name='Profile' component={ProfileScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                       <Ionicons name="person-circle-outline" size={30} style={{color : focused ? '#3B71F3' : '#748c94'}} />
                       
                    </View>
                ),
               
                    tabBarOnPress: () => {
                      navigation.navigate('Profile', { from: 'Drawer' });
                    }
                  
            }}/>
            
            

        </Tab.Navigator>
         
    );
}
const styles = StyleSheet.create({
    shadow : {
        shadowColor: '#7F5DF0',
        textShadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },

    button : {
        backgroundColor : 'red' ,
         borderRadius: 50,
          width:50,
          height:50,
          alignItems: 'center',
          justifyContent: 'center'
    },
    buttonPressed : {
        backgroundColor : 'blue' ,
    }
  
});

export default Tabs ;