import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const HistoryScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Orders Screen</Text>
            <Button
            title='Click Here'
            onPress={() => alert('Button Clicked!')
            }/>
                
            
        </View>
    );


};
export default HistoryScreen ;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e8e8e8'
    },
});