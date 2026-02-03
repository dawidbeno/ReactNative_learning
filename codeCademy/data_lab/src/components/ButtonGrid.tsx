import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface ButtonGridProps {
  onFetchFlavors: () => void;
  onLoadFromStorage: () => void;
  onClearDisplay: () => void;
  onClearStorage: () => void;
  loading: boolean;
}

export const ButtonGrid = ({
  onFetchFlavors,
  onLoadFromStorage,
  onClearDisplay,
  onClearStorage,
  loading,
}: ButtonGridProps) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable 
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed
        ]} 
        onPress={onFetchFlavors}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Fetching...' : 'Fetch Flavors'}
        </Text>
      </Pressable>
      
      <Pressable 
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed
        ]} 
        onPress={onLoadFromStorage}
      >
        <Text style={styles.buttonText}>Load from Storage</Text>
      </Pressable>
      
      <Pressable 
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed
        ]} 
        onPress={onClearDisplay}
      >
        <Text style={styles.buttonText}>Clear Display</Text>
      </Pressable>
      
      <Pressable 
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed
        ]} 
        onPress={onClearStorage}
      >
        <Text style={styles.buttonText}>Clear Storage</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    flex: 1,
    minWidth: '47%',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#007AFF',
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});