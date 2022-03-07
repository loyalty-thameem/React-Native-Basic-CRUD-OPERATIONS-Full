import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// Intha Native Stack navigator vera. ithe use pannina ithila work aagala import { createNativeStackNavigator } from '@react-navigation/stack';
//ithu work aaguthu
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './screens/MainScreen';
// ithu work aagala const Stack = createNativeStackNavigator();
// ithu work aaguthu
const Stack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
