import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ProductCardProps } from '../types/index';
import { logger } from '../utils/logger';

export function ProductCard({ product, isLoading, isAdded, onAddToCart }: ProductCardProps) {
  return (
    <View style={styles.productCard}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      {product.onSale && <Text style={styles.saleTag}>SALE</Text>}

      {/* todo: PRESSABLE add cart button*/}
      {/* todo: ACTIVITY INDICATOR conditionally render activity indicator */}
      
    </View>
  )
}

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
  productPrice: {
    fontSize: 15,
    color: '#333',
    marginLeft: 10,
  },
  saleTag: {
    color: '#e74c3c',
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    margin: 10,
    minHeight: 46,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  }
});
