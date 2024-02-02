import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Multiplayer from './screens/Multiplayer';
import PlayWithBot from './screens/PlayWithBot';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#20a92b',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 29,
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerTitle: 'Tic Tac To',
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Multiplayer" component={Multiplayer} />
        <Stack.Screen name="PlayWithBot" component={PlayWithBot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
