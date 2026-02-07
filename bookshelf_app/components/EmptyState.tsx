import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/theme';

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, message }) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color={theme.colors.textMuted} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
    minHeight: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.textLight,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  message: {
    fontSize: 14,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
});
