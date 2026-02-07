import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './Card';
import { theme } from '@/theme';
import { Book } from '@/types/book';

interface BookCardProps {
  book: Book;
  onPress: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onPress }) => {
  const getStatusIcon = () => {
    switch (book.status) {
      case 'reading':
        return <Ionicons name="book" size={16} color={theme.colors.warning} />;
      case 'finished':
        return <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />;
      default:
        return <Ionicons name="time" size={16} color={theme.colors.textMuted} />;
    }
  };

  const getProgressPercentage = () => {
    if (!book.currentPage) return 0;
    return Math.round((book.currentPage / book.pages) * 100);
  };

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Card style={[styles.card, pressed && styles.cardPressed]}>
          <View style={styles.content}>
            {/* Book Cover - colored square */}
            <View style={[styles.cover, { backgroundColor: book.coverColor }]}>
              <Ionicons name="book-outline" size={32} color={theme.colors.white} />
            </View>

            {/* Book Info */}
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>
                {book.title}
              </Text>
              <Text style={styles.author} numberOfLines={1}>
                {book.author}
              </Text>

              <View style={styles.metaRow}>
                {getStatusIcon()}
                <Text style={styles.metaText}>{book.pages} pages</Text>
                {book.rating && (
                  <>
                    <Ionicons name="star" size={14} color={theme.colors.warning} />
                    <Text style={styles.metaText}>{book.rating}</Text>
                  </>
                )}
              </View>

              {/* Progress bar for reading books */}
              {book.status === 'reading' && book.currentPage && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${getProgressPercentage()}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>{getProgressPercentage()}%</Text>
                </View>
              )}
            </View>
          </View>
        </Card>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.md,
  },
  cardPressed: {
    opacity: 0.7,
  },
  content: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  cover: {
    width: 80,
    height: 120,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  author: {
    fontSize: 14,
    color: theme.colors.textLight,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
  metaText: {
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: theme.colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary,
    minWidth: 35,
  },
});
