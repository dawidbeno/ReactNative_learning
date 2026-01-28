import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Avatar from "./Avatar";

type CardProps = {
  avatar: string;
  name: string;
};


const Card = (props: CardProps) => (
  <View style={styles.card}>
    <Avatar url={props.avatar} />
    <Text style={styles.nameText}>{props.name}</Text>
  </View>
);


const styles = StyleSheet.create({
  card: {
    width: 50, // Responsive width
    height: 100,  // Fixed height for predictability
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 12,
  },
  nameText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Card;
