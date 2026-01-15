import React from 'react';
import { Image, StyleSheet } from 'react-native';

type AvatarProps = {
  url: string;
};

const Avatar = (props: AvatarProps) => (
  <Image
    style={styles.avatar}
    source={{ uri: props.url }}
  />
);

const styles = StyleSheet.create({
  avatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
});

export default Avatar;