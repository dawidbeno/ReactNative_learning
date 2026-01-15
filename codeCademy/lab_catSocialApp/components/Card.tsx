import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Avatar from "./Avatar";

type CardProps = {
  avatar: string;
  name: string;
};

const Card = (props: CardProps) => (
  <View>
    <Avatar url={props.avatar} />
    <Text>{props.name}</Text>
  </View>
);

export default Card;
