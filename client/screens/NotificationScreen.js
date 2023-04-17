import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = () => {
  const [hasNotifications, setHasNotifications] = useState(false);
  const navigation = useNavigation();

  const handleNotificationClick = () => {
    alert('Button Clicked!');
  };

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Ionicons name="arrow-back" size={24} color="gray" onPress={() => navigation.goBack()} />

    </View>
    {hasNotifications ? (
      <>
        <Text>You have notifications!</Text>
        <Button title="View Notifications" onPress={handleNotificationClick} />
      </>
    ) : (
      <Text style={{flex: 1,
        textAlign: 'center',}}>No notifications at the moment.</Text>
    )}
  </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
