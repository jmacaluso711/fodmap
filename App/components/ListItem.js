import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap'
  },
  textTag: {
    fontSize: 12,
    padding: 5,
    position: 'absolute',
    right: 20,
  },
  textHigh: {
    color: '#FFF5F5',
    backgroundColor: '#F56565'
  },
  textLow: {
    color: '#F0FFF4',
    backgroundColor: '#68D391'
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#A0AEC0'
  }
})

export const Separator = () => <View style={styles.separator}></View>

const ListItem = ({name, fodMap}) => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.text]}>{name}</Text>
      <Text style={[styles.text, styles.textTag, fodMap === 'high' ? styles.textHigh : styles.textLow]}>{fodMap}</Text>
      <View style={styles.typeBar}></View>
    </View>
  )
}

export default ListItem;