import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/theme';

export default function CategoriesTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <Text style={styles.subtitle}>Browse books by category</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textLight,
  },
});
