import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation, useRoute } from '@react-navigation/native';
import{useForm} from 'react-hook-form';
import CustomButton from'../components/CustomButton';
import { Header } from 'react-native-elements';


const LocationScreen = () => {
  const navigation=useNavigation();
  const route = useRoute();

  const {control,handleSubmit,formState:{errors}}=useForm();
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  const onAddLocationPressed = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      console.log(location.coords.latitude, location.coords.longitude);

      navigation.goBack(); // navigate back to previous screen
    route.params.setLocationData({
      type: 'Point',
      coordinates: [location.coords.longitude, location.coords.latitude],
    }); 
    } catch (error) {
      console.error(error);
    }
    
  };

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    console.log(location.coords.latitude, location.coords.longitude);
  };

  useEffect(() => {
    const userLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      console.log(location.coords.latitude, location.coords.longitude);
    };

    userLocation();
  }, []);


  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Get Location" onPress={userLocation} />
        <Button title="Add Location" onPress={onAddLocationPressed} />
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
});

export default LocationScreen;