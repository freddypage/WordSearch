import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Board from 'organisms/Board';
import {useFonts} from 'expo-font';
import { AppLoading } from 'expo';

export default function App() {

  const [loaded] = useFonts({
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-BoldItalic': require('./assets/fonts/OpenSans-BoldItalic.ttf'),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.overview}>Word Search</Text>
      <Board></Board>
      <StatusBar style="auto" />
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
