import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MessageBannerProps {
  message: string | null;
}

export const MessageBanner = ({ message }: MessageBannerProps) => {
  if (!message) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  bannerText: {
    fontSize: 14,
    color: '#1e40af',
    textAlign: 'center',
  },
});