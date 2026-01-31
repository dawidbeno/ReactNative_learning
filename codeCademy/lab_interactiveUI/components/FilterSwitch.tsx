import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { FilterSwitchProps } from '../types/index';

export function FilterSwitch({ showOnlySale, setShowOnlySale }: FilterSwitchProps) {
  return (
    <View style={styles.filterRow}>
      <Text>Show only sale items</Text>
      <Switch value={showOnlySale} 
      onValueChange={setShowOnlySale}
      accessible={true}
      accessibilityLabel="Sale items filter"/>
    </View>
  )
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
