import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/Screens/HomeScreen/HomeScreen';
import CardListScreen from './src/Screens/CardListScreen/CardListScreen';
import CardScreen from './src/Screens/CardScreen/CardScreen';
import CardTextScreen from './src/Screens/CardScreen/CardTextScreen';
import ImageScreen from './src/Screens/ImageScreen/ImageScreen';

import * as SecureStore from 'expo-secure-store';
import * as Device from 'expo-device';
import uuid from 'react-native-uuid';
import { useEffect } from 'react';

const Stack = createStackNavigator();

export default function App() {

  useEffect(() => {
    checkUniqueId();
  }, [])

  const checkUniqueId = async () => {
    let result = await SecureStore.getItemAsync('uniq-id');
    if(!result) await SecureStore.setItemAsync('uniq-id', `${Device.manufacturer}-${Device.osName}-${Device.modelName}-${uuid.v4()}`.replaceAll(' ', '_').replaceAll('(', '').replaceAll(')', ''))
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="card-list" component={CardListScreen} />
        <Stack.Screen name="card" component={CardScreen} />
        <Stack.Screen name="card-text" component={CardTextScreen} />
        <Stack.Screen name="fullsize-image" component={ImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
