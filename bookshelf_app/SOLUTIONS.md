# 🔑 Solution Hints & Code Snippets

This file contains hints and code snippets for each exercise. Try to solve exercises yourself first before looking here!

---

## Exercise 1: Root Layout

<details>
<summary>Click to see solution</summary>

**File: `app/_layout.tsx`**

```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
```

**File: `app/index.tsx`** (temporary - will be replaced by tabs)

```tsx
import { View, Text } from 'react-native';

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to BookShelf!</Text>
    </View>
  );
}
```

</details>

---

## Exercise 2: Tab Navigation

<details>
<summary>Click to see solution</summary>

**File: `app/(tabs)/_layout.tsx`**

```tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Browse',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

**File: `app/(tabs)/index.tsx`**

```tsx
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/theme';

export default function BrowseScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Browse Tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: {
    fontSize: 20,
  },
});
```

**File: `app/(tabs)/profile.tsx`**

```tsx
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/theme';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: {
    fontSize: 20,
  },
});
```

**Create directory for categories:**
```bash
mkdir app/(tabs)/categories
```

We'll populate this in Exercise 5.

</details>

---

## Exercise 3: Display Books

<details>
<summary>Click to see solution</summary>

**File: `app/(tabs)/index.tsx`**

```tsx
import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useBookStore } from '@/store/bookStore';
import { BookCard } from '@/components/BookCard';
import { EmptyState } from '@/components/EmptyState';
import { theme } from '@/theme';

export default function BrowseScreen() {
  const books = useBookStore((state) => state.books);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Library</Text>
        <Text style={styles.subtitle}>{books.length} books</Text>
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookCard 
            book={item} 
            onPress={() => {
              // Will implement in Exercise 4
              console.log('Book pressed:', item.id);
            }} 
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            icon="book-outline"
            title="No Books Yet"
            message="Start adding books to your library!"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textMuted,
    marginTop: 4,
  },
  listContent: {
    padding: theme.spacing.md,
    paddingTop: 0,
  },
});
```

</details>

---

## Exercise 4: Book Details Dynamic Route

<details>
<summary>Click to see solution</summary>

**File: `app/book/[id].tsx`**

```tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useBookStore } from '@/store/bookStore';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { theme } from '@/theme';

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  
  const book = useBookStore((state) => state.getBookById(id));
  const deleteBook = useBookStore((state) => state.deleteBook);

  useEffect(() => {
    if (book) {
      navigation.setOptions({ title: book.title });
    }
  }, [book, navigation]);

  if (!book) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color={theme.colors.textMuted} />
        <Text style={styles.errorText}>Book not found</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Book',
      `Are you sure you want to delete "${book.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteBook(id);
            router.back();
          },
        },
      ]
    );
  };

  const getStatusText = () => {
    switch (book.status) {
      case 'reading':
        return 'Currently Reading';
      case 'finished':
        return 'Finished';
      default:
        return 'Want to Read';
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Book Cover */}
      <View style={[styles.cover, { backgroundColor: book.coverColor }]}>
        <Ionicons name="book" size={64} color={theme.colors.white} />
      </View>

      {/* Book Info */}
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>by {book.author}</Text>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="bookmark" size={20} color={theme.colors.primary} />
          <Text style={styles.metaText}>{book.category}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="document-text" size={20} color={theme.colors.primary} />
          <Text style={styles.metaText}>{book.pages} pages</Text>
        </View>
        {book.rating && (
          <View style={styles.metaItem}>
            <Ionicons name="star" size={20} color={theme.colors.warning} />
            <Text style={styles.metaText}>{book.rating}/5</Text>
          </View>
        )}
      </View>

      {/* Status Badge */}
      <Card style={styles.statusCard}>
        <Text style={styles.statusLabel}>Status</Text>
        <Text style={styles.statusText}>{getStatusText()}</Text>
        {book.currentPage && (
          <Text style={styles.progressText}>
            Page {book.currentPage} of {book.pages}
          </Text>
        )}
      </Card>

      {/* Description */}
      <Card style={styles.descriptionCard}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{book.description}</Text>
      </Card>

      {/* Delete Button */}
      <Button
        title="Delete Book"
        onPress={handleDelete}
        variant="outline"
        style={styles.deleteButton}
        icon={<Ionicons name="trash-outline" size={18} color={theme.colors.error} />}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  cover: {
    width: 200,
    height: 300,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.medium,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  author: {
    fontSize: 18,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  metaText: {
    fontSize: 14,
    color: theme.colors.textMuted,
  },
  statusCard: {
    width: '100%',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  statusLabel: {
    fontSize: 12,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.primary,
    marginTop: theme.spacing.xs,
  },
  progressText: {
    fontSize: 14,
    color: theme.colors.textLight,
    marginTop: theme.spacing.xs,
  },
  descriptionCard: {
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textLight,
    lineHeight: 20,
  },
  deleteButton: {
    width: '100%',
    borderColor: theme.colors.error,
    marginTop: theme.spacing.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  errorText: {
    fontSize: 18,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.md,
  },
});
```

**Update `app/(tabs)/index.tsx` to add navigation:**

```tsx
// In the renderItem of FlatList:
renderItem={({ item }) => (
  <BookCard 
    book={item} 
    onPress={() => router.push(`/book/${item.id}`)} 
  />
)}
```

**Update `app/_layout.tsx` to configure book route:**

```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="book/[id]" 
        options={{ 
          title: '',
          headerBackTitle: 'Back'
        }} 
      />
    </Stack>
  );
}
```

</details>

---

## Exercise 5: Categories Navigation

<details>
<summary>Click to see solution</summary>

**File: `app/(tabs)/categories/_layout.tsx`**

```tsx
import { Stack } from 'expo-router';

export default function CategoriesLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Categories',
        }} 
      />
      <Stack.Screen 
        name="[category]" 
        options={{ 
          title: '',
          headerBackTitle: 'Categories'
        }} 
      />
    </Stack>
  );
}
```

**File: `app/(tabs)/categories/index.tsx`**

```tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useBookStore } from '@/store/bookStore';
import { Card } from '@/components/Card';
import { theme } from '@/theme';
import { BookCategory } from '@/types/book';

const CATEGORIES: { id: BookCategory; name: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'fiction', name: 'Fiction', icon: 'book' },
  { id: 'non-fiction', name: 'Non-Fiction', icon: 'library' },
  { id: 'mystery', name: 'Mystery', icon: 'eye' },
  { id: 'sci-fi', name: 'Science Fiction', icon: 'planet' },
  { id: 'biography', name: 'Biography', icon: 'person' },
];

export default function CategoriesScreen() {
  const router = useRouter();
  const books = useBookStore((state) => state.books);

  const getCategoryCount = (category: BookCategory) => {
    return books.filter((book) => book.category === category).length;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Browse by Category</Text>

      {CATEGORIES.map((category) => {
        const count = getCategoryCount(category.id);
        return (
          <Pressable
            key={category.id}
            onPress={() => router.push(`/categories/${category.id}`)}
          >
            {({ pressed }) => (
              <Card style={[styles.card, pressed && styles.cardPressed]}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={category.icon}
                    size={32}
                    color={theme.colors.primary}
                  />
                </View>
                <View style={styles.info}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.bookCount}>
                    {count} {count === 1 ? 'book' : 'books'}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={theme.colors.textMuted}
                />
              </Card>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  cardPressed: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  info: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  bookCount: {
    fontSize: 14,
    color: theme.colors.textMuted,
  },
});
```

**File: `app/(tabs)/categories/[category].tsx`**

```tsx
import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { useBookStore } from '@/store/bookStore';
import { BookCard } from '@/components/BookCard';
import { EmptyState } from '@/components/EmptyState';
import { theme } from '@/theme';

export default function CategoryBooksScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  
  const books = useBookStore((state) => state.getBooksByCategory(category));

  useEffect(() => {
    // Capitalize category name for title
    const title = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
    navigation.setOptions({ title });
  }, [category, navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() => router.push(`/book/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            icon="book-outline"
            title="No Books in this Category"
            message="Add some books to get started!"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: theme.spacing.md,
  },
});
```

</details>

---

## Exercise 6: Add Book Modal

<details>
<summary>Click to see solution</summary>

**File: `app/add-book.tsx`**

```tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useBookStore } from '@/store/bookStore';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { theme } from '@/theme';
import { BookCategory, ReadingStatus } from '@/types/book';

const COVER_COLORS = [
  '#4A90E2',
  '#E25D5D',
  '#2C3E50',
  '#F39C12',
  '#8E44AD',
  '#95A5A6',
  '#16A085',
  '#E74C3C',
];

export default function AddBookScreen() {
  const router = useRouter();
  const addBook = useBookStore((state) => state.addBook);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<BookCategory>('fiction');
  const [pages, setPages] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(COVER_COLORS[0]);
  const [status, setStatus] = useState<ReadingStatus>('want-to-read');

  const handleSave = () => {
    if (!title.trim() || !author.trim() || !pages.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    addBook({
      title: title.trim(),
      author: author.trim(),
      category,
      pages: parseInt(pages),
      description: description.trim(),
      coverColor: selectedColor,
      status,
    });

    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Card style={styles.formCard}>
          {/* Title */}
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter book title"
            placeholderTextColor={theme.colors.textMuted}
          />

          {/* Author */}
          <Text style={styles.label}>Author *</Text>
          <TextInput
            style={styles.input}
            value={author}
            onChangeText={setAuthor}
            placeholder="Enter author name"
            placeholderTextColor={theme.colors.textMuted}
          />

          {/* Pages */}
          <Text style={styles.label}>Number of Pages *</Text>
          <TextInput
            style={styles.input}
            value={pages}
            onChangeText={setPages}
            placeholder="e.g., 320"
            keyboardType="number-pad"
            placeholderTextColor={theme.colors.textMuted}
          />

          {/* Category */}
          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(value) => setCategory(value)}
              style={styles.picker}
            >
              <Picker.Item label="Fiction" value="fiction" />
              <Picker.Item label="Non-Fiction" value="non-fiction" />
              <Picker.Item label="Mystery" value="mystery" />
              <Picker.Item label="Science Fiction" value="sci-fi" />
              <Picker.Item label="Biography" value="biography" />
            </Picker>
          </View>

          {/* Status */}
          <Text style={styles.label}>Status</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={status}
              onValueChange={(value) => setStatus(value)}
              style={styles.picker}
            >
              <Picker.Item label="Want to Read" value="want-to-read" />
              <Picker.Item label="Reading" value="reading" />
              <Picker.Item label="Finished" value="finished" />
            </Picker>
          </View>

          {/* Cover Color */}
          <Text style={styles.label}>Cover Color</Text>
          <View style={styles.colorContainer}>
            {COVER_COLORS.map((color) => (
              <Pressable
                key={color}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  selectedColor === color && styles.colorSelected,
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter book description"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor={theme.colors.textMuted}
          />
        </Card>

        {/* Buttons */}
        <Button
          title="Add Book"
          onPress={handleSave}
          style={styles.button}
        />
        <Button
          title="Cancel"
          onPress={() => router.back()}
          variant="outline"
          style={styles.button}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
  },
  formCard: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
    backgroundColor: theme.colors.white,
  },
  textArea: {
    minHeight: 100,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorSelected: {
    borderColor: theme.colors.text,
    borderWidth: 3,
  },
  button: {
    marginBottom: theme.spacing.sm,
  },
});
```

**Update `app/_layout.tsx`:**

```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="book/[id]" 
        options={{ 
          title: '',
          headerBackTitle: 'Back'
        }} 
      />
      <Stack.Screen
        name="add-book"
        options={{
          presentation: 'modal',
          title: 'Add New Book',
        }}
      />
    </Stack>
  );
}
```

**Update `app/(tabs)/_layout.tsx` to add header button:**

```tsx
import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { theme } from '@/theme';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Browse',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => router.push('/add-book')}
              style={{ marginRight: 16 }}
            >
              <Ionicons name="add-circle" size={28} color={theme.colors.primary} />
            </Pressable>
          ),
        }}
      />
      {/* ... rest of tabs ... */}
    </Tabs>
  );
}
```

</details>

---

## Exercise 7: Reading Notes Modal

<details>
<summary>Click to see solution</summary>

**File: `app/add-note.tsx`**

```tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useBookStore } from '@/store/bookStore';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { theme } from '@/theme';

export default function AddNoteScreen() {
  const router = useRouter();
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  
  const book = useBookStore((state) => state.getBookById(bookId));
  const addNote = useBookStore((state) => state.addNote);

  const [content, setContent] = useState('');
  const [page, setPage] = useState('');

  const handleSave = () => {
    if (!content.trim()) {
      alert('Please enter a note');
      return;
    }

    addNote(bookId, content.trim(), page ? parseInt(page) : undefined);
    router.back();
  };

  if (!book) {
    return (
      <View style={styles.container}>
        <Text>Book not found</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookAuthor}>by {book.author}</Text>

        <Card style={styles.formCard}>
          <Text style={styles.label}>Page Number (optional)</Text>
          <TextInput
            style={styles.input}
            value={page}
            onChangeText={setPage}
            placeholder="e.g., 42"
            keyboardType="number-pad"
            placeholderTextColor={theme.colors.textMuted}
          />

          <Text style={styles.label}>Note *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={content}
            onChangeText={setContent}
            placeholder="Write your thoughts..."
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            placeholderTextColor={theme.colors.textMuted}
          />
        </Card>

        <Button title="Save Note" onPress={handleSave} style={styles.button} />
        <Button
          title="Cancel"
          onPress={() => router.back()}
          variant="outline"
          style={styles.button}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  bookAuthor: {
    fontSize: 16,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  formCard: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
    backgroundColor: theme.colors.white,
  },
  textArea: {
    minHeight: 150,
  },
  button: {
    marginBottom: theme.spacing.sm,
  },
});
```

**Update `app/book/[id].tsx` to display notes:**

Add this to the imports:
```tsx
import { format } from 'date-fns'; // You may need to install: npm install date-fns
```

Add this inside the component:
```tsx
const notes = useBookStore((state) => state.getNotesByBookId(id));
```

Add this section before the Delete button:
```tsx
{/* Notes Section */}
{notes.length > 0 && (
  <View style={styles.notesSection}>
    <View style={styles.notesSectionHeader}>
      <Text style={styles.sectionTitle}>Reading Notes</Text>
      <Text style={styles.notesCount}>{notes.length}</Text>
    </View>
    
    {notes.map((note) => (
      <Card key={note.id} style={styles.noteCard}>
        {note.page && (
          <Text style={styles.notePage}>Page {note.page}</Text>
        )}
        <Text style={styles.noteContent}>{note.content}</Text>
        <Text style={styles.noteDate}>
          {new Date(note.createdAt).toLocaleDateString()}
        </Text>
      </Card>
    ))}
  </View>
)}

{/* Add Note Button */}
<Button
  title="Add Reading Note"
  onPress={() => router.push(`/add-note?bookId=${id}`)}
  variant="secondary"
  style={styles.addNoteButton}
  icon={<Ionicons name="create-outline" size={18} color={theme.colors.text} />}
/>
```

Add these styles:
```tsx
notesSection: {
  width: '100%',
  marginTop: theme.spacing.md,
},
notesSectionHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing.sm,
},
notesCount: {
  fontSize: 14,
  color: theme.colors.textMuted,
  fontWeight: '600',
},
noteCard: {
  marginBottom: theme.spacing.sm,
},
notePage: {
  fontSize: 12,
  color: theme.colors.primary,
  fontWeight: '600',
  marginBottom: theme.spacing.xs,
},
noteContent: {
  fontSize: 14,
  color: theme.colors.text,
  lineHeight: 20,
  marginBottom: theme.spacing.xs,
},
noteDate: {
  fontSize: 12,
  color: theme.colors.textMuted,
},
addNoteButton: {
  width: '100%',
  marginTop: theme.spacing.md,
  marginBottom: theme.spacing.sm,
},
```

**Update `app/_layout.tsx`:**

```tsx
<Stack.Screen
  name="add-note"
  options={{
    presentation: 'modal',
    title: 'Add Note',
  }}
/>
```

</details>

---

## Common Debugging Tips

1. **Routes not showing up?**
   - Make sure file is in `app/` directory
   - Check file naming (use exact lowercase)
   - Restart Metro bundler

2. **Navigation not working?**
   - Check `router.push()` path matches file structure
   - Verify `_layout.tsx` files are configured
   - Use console.log to debug params

3. **TypeScript errors?**
   - Run `npm install` to generate types
   - Restart TS server in your editor

4. **Tabs not showing?**
   - Check `tabBarShowLabel` settings
   - Verify icon names are valid
   - Check tab bar color settings

