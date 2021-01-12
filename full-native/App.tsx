import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AllCats from './AllCats';
import Login from './Login';
import NewCat from './NewCat';

export default function App() {
  return (
    <View style={styles.container}>
      <NewCat />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
