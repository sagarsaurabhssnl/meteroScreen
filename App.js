import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';

import HomeScreen from "./screens/Home";
import IssLocationScreen from "./screens/IssLocation";
import MeteorScreen from "./screens/Meteors";

export default function App() {
  const Meteors = createStackNavigator();
  return (
    <NavigationContainer>
      <Meteors.Navigator>
        <Meteors.Screen name={"HOMESCREEN"} component={HomeScreen} options={option} />
        <Meteors.Screen name={"ISS LOCATION"} component={IssLocationScreen} options={option} />
        <Meteors.Screen name={"METEORS"} component={MeteorScreen} options={option} />
      </Meteors.Navigator>
    </NavigationContainer>
  );
}

var option = {
  headerStyle: {
    backgroundColor: "#212121",
  },
  headerTitleStyle: {
    fontWeight: "bold",
    color: "#fff",
  },
  headerTintColor: "#fff",
};
