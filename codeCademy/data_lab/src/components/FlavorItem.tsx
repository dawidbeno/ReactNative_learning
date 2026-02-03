import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IceCreamFlavor } from '../types/IceCreamFlavor';

interface FlavorItemProps {
  item: IceCreamFlavor;
}

export const FlavorItem = ({ item }: FlavorItemProps) => (
  <View style={styles.flavorItem}>
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.price}>${item.price}</Text>
  </View>
);

const styles = StyleSheet.create({
  flavorItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
  },
});