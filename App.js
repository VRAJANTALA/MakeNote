import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RootNavigation from './src/Navigation/RootNavigation';
export const deviceWidth = Dimensions.get('screen').width;
export const deviceHeight = Dimensions.get('screen').height;

const App = () => {
  return <RootNavigation></RootNavigation>;
};

export default App;

const styles = StyleSheet.create({});
