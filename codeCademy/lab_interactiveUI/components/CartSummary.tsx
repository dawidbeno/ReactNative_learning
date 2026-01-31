import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { CartSummaryProps } from "../types";

export function CartSummary({ items, onClear, onClose }: CartSummaryProps) {
  return (
    <View style={[styles.container, { gap: 10 }]}>
      <View style={styles.items}>
        <ScrollView>
          {items.map(i => (
            <View key={i.id} style={[styles.item]}>
              <View style={styles.itemNameGroup}>
                <Text style={styles.itemName}>{i.name}</Text>
                {i.onSale && <Text style={styles.itemSale}>(Sale!)</Text>}
              </View>

              <Text style={styles.currency}>{formatCurrency(i.price)}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.total}>Total: <Text style={styles.currency}>{formatCurrency(items.reduce((prev, curr) => prev + curr.price, 0))}</Text></Text>
        <View style={[styles.actions, { gap: 20 }]}>
          <Pressable style={styles.button} onPress={onClear}><Text style={styles.buttonText}>Clear</Text></Pressable>
          <Pressable style={styles.button} onPress={onClose}><Text style={styles.buttonText}>Close</Text></Pressable>
        </View>
      </View>
    </View>
  )
}


function formatCurrency(val: number) {
  return Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(val)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  items: {
    flex: 1
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemNameGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto"
  },
  itemName: {
    fontSize: 18,
    fontWeight: "500",
  },
  itemSale: {
    fontSize: 12,
    color: "red",
    marginLeft: 5,
    fontWeight: 500
  },
  currency: {
    fontSize: 18,
  },
  total: {
    marginLeft: "auto",
    marginBottom: 10
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end"
  },
  actions: {
  },
  button: {
    backgroundColor: '#4C6B80',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 46,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  }
})