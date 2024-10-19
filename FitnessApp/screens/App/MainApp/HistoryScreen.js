import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming you have vector icons installed

function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Icon name="construction" size={100} color="#67F2D1" />
      <Text style={styles.text}>History Page is Under Development</Text>
    </View>
  );
}

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171717',
  },
  text: {
    marginTop: 20,
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'roboto-condensed',
  },
});
