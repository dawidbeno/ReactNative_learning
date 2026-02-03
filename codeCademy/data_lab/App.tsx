import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { IceCreamFlavor } from './src/types/IceCreamFlavor';
import { FlavorItem } from './src/components/FlavorItem';
import { ButtonGrid } from './src/components/ButtonGrid';
import { MessageBanner } from './src/components/MessageBanner';
import { useIceCreamData } from './src/hooks/useIceCreamData';

const renderFlavorItem = ({ item }: { item: IceCreamFlavor }) => (
  <FlavorItem item={item} />
);

export default function App() {
  const {
    flavors,
    loading,
    lastFetch,
    dataSource,
    message,
    fetchFlavors,
    loadFromStorage,
    clearDisplay,
    clearStorage,
  } = useIceCreamData();

  return (
    // Avoiding SafeAreaView because Platform-specific Considerations doesn't teach til after this module.
    <View style={styles.container}>
      <Text style={styles.title}>Ice Cream Flavors</Text>
      
      <ButtonGrid
        onFetchFlavors={fetchFlavors}
        onLoadFromStorage={loadFromStorage}
        onClearDisplay={clearDisplay}
        onClearStorage={clearStorage}
        loading={loading}
      />

      <MessageBanner message={message} />

      {loading && <ActivityIndicator size="large" color="#007AFF" />}
      
      <View style={styles.statusContainer}>
        <View style={[
          styles.indicator, 
          { backgroundColor: dataSource === 'network' ? '#22c55e' : '#f59e0b' }
        ]} />
        <Text style={styles.statusText}>
          {flavors.length} flavors ({dataSource === 'network' ? 'fresh' : 'cached'})
        </Text>
      </View>
      
      {lastFetch && (
        <Text style={styles.timestamp}>Last fetch: {lastFetch}</Text>
      )}

      <FlatList
        data={flavors}
        renderItem={renderFlavorItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1e40af',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 8,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  list: {
    flex: 1,
    marginTop: 16,
  },
});