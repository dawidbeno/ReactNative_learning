import React, { useState } from 'react';

import { View, Text, StyleSheet } from 'react-native';

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
      {/* todo: MODAL wrap in modal*/}
      <>
        {/* <View style={styles.modalContainer}>
          <View style={styles.summaryContainer}>
            <View style={styles.summary}>
            </View>
          </View>
        </View> */}
      </>
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

        {/* todo: PRESSABLE view cart */}


        {/* todo: FLATLIST create flatlist */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    // todo: MODAL center
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
