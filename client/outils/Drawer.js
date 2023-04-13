import React from 'react';
import { createDrawerNavigator, DrawerContent, DrawerItem , DrawerItemList } from '@react-navigation/drawer';
import { StyleSheet, Button , View} from 'react-native';
import Tabs from './tabs';
import AboutUs from '../screens/AboutUs';
import RateUs from '../screens/RateUs';
import ProfileScreen from '../screens/ProfileScreen';
import { useNavigation } from '@react-navigation/native'; 

import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    
    >
      <Drawer.Screen name="Fournitures2give" component={Tabs} />
      
      <Drawer.Screen name="Rate Us" component={RateUs}
      options={{ 
        headerLeft: () => (
          <GoBackButton />),
      }}/>

      <Drawer.Screen name="Profile" component={ProfileScreen} 
     
      options={{ 
      
        headerLeft: () => (
          <GoBackButton />),
      }}/>

      <Drawer.Screen name="About Us" component={AboutUs}
      options={{ 
        headerLeft: () => (
          <GoBackButton />),
      }}/>
     
    </Drawer.Navigator>
  
  );
  
}
function GoBackButton() {
  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation prop
  return (
    <Button
      onPress={() => {
        navigation.goBack();
      }}
      title="Go Back"
    />
  );
}

export default DrawerNavigator;


const styles = StyleSheet.create({
  root:{
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    padding:20,
    backgroundColor: '#F9FBFC'
  },
 
});