import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Home = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={styles.btn}
          onPress={() => navigation.navigate('Multiplayer')}>
          <Text style={styles.btnText}>Multiplayer</Text>
        </Pressable>
        <Pressable
          style={styles.btn}
          onPress={() => navigation.navigate('PlayWithBot')}>
          <Text style={styles.btnText}>Play With Bot</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d4716',
  },
  heading: {
    fontSize: 28,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  btn: {
    width: '80%',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#13881f',
    marginVertical: 18,
    borderRadius: 8,
  },
  btnText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default Home;
