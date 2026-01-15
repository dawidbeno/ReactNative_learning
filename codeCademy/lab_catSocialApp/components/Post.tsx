import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";

type PostProps = {
  friend: boolean;
  image: string;
  title: string;
  description: string;
};

const Post = (props: PostProps) => (
  // Add additional styling to this View
  <View>
    <Image style={styles.image} source={{ uri: props.image }} />
    <View style={styles.content}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  layout: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 16,
    overflow: "hidden",
    /* Add additional styling below */
  },
  friendBackground: {},
  defaultBackground: {},
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: "cover",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    marginBottom: 6,
    /* Add additional styling below */
  },
  description: {
    lineHeight: 20,
    /* Add additional styling below */
  },
});

export default Post;
