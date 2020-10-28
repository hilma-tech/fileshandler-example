import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImageUploader from './ImageUploader';
import ImageUploaderClass from './ImageUploaderClass';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageUploader />
      <ImageUploaderClass />
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
