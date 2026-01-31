import React, { useState } from 'react';

import { View, Text, Modal, StyleSheet, FlatList, Pressable } from 'react-native';

import { SearchBar } from './components/SearchBar';
import { FilterSwitch } from './components/FilterSwitch';
import { ProductCard } from './components/ProductCard';
import { products } from './data/product';
import { Product } from './types';
import { CartSummary } from './components/CartSummary';

export default function App(){
  const [searchText, setSearchText] = useState<string>('');
  const [showOnlySale, setShowOnlySale] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<number | null>(null);
  const [addedItems, setAddedItems] = useState<Product[]>([]);
  const [showCartSummary, setShowCartSummary] = useState(false)
  const addedItemsSet = new Set(addedItems.map(i => i.id))
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchText ? product.name.toLowerCase().includes(searchText.toLowerCase()) : true;
    const matchesSale = showOnlySale ? product.onSale : true;
    return matchesSearch && matchesSale;
  });

  const handleAddToCart = (productId: number): void => {
    const productToAdd = filteredProducts.find(p => p.id === productId)

    if (!productToAdd) {
      return
    }

    setIsLoading(productId);
    setTimeout(() => {
      setIsLoading(null);
      setAddedItems(prev => [...prev, productToAdd]);
    }, 1000);
  };

  function onClearCartHandler() {
    // todo: "Alert" confirm clearing

  }

  return (
    <View style={styles.container}>
      <Modal visible={showCartSummary}
      transparent animationType="slide"
      onRequestClose={() => setShowCartSummary(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.summaryContainer}>
            <View style={styles.summary}>
                <CartSummary items={addedItems} onClear={console.log} onClose={console.log} />
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <Text style={styles.headerText}>Codecademy Store</Text>
      </View>

      <View style={styles.content}>
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <FilterSwitch
          showOnlySale={showOnlySale}
          setShowOnlySale={setShowOnlySale}
        />

        <Pressable
          style={[styles.summaryButton, addedItems.length === 0 && styles.disabled]}
          onPress={() => setShowCartSummary(true)}
          disabled={addedItems.length === 0}>
          <Text style={styles.buttonText}>View Cart</Text>
        </Pressable>


        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              isLoading={isLoading === item.id}
              isAdded={addedItemsSet.has(item.id)}
              onAddToCart={handleAddToCart}
            />

          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4a90e2',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  productList: {
    flex: 1,
  },
  summaryButton: {
    backgroundColor: '#4C6B80',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 35, // todo: update using hitslop
    justifyContent: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  disabled: {
    backgroundColor: "#C0C6CC"
  },
  modal: {
    height: 500
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  summaryContainer: {
    height: "70%", 
    backgroundColor: "#A8D4FF",
    borderWidth: 1,
    borderRadius: 20 
  },
  summary: {
    flex: 1,
    padding: 20
  }
});
