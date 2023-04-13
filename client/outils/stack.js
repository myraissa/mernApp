import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import OrdersScreen from '../screens/OrdersScreen';
import HomeScreen from '../screens/HomeScreen';
import FindScreen from '../screens/FindScreen';
import AddScreen from '../screens/AddScreen';

const Stack = createStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HOME" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SEARCH" component={FindScreen} />
      <Stack.Screen name="ADD" component={AddScreen} />
      <Stack.Screen name="ORDERS" component={OrdersScreen} />
      <Stack.Screen name="PROFILE" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default Stacks ;