# 📚 BookShelf - Expo Router Learning Project

A comprehensive exercise project to master Expo Router by building a book library app with tabs, stacks, dynamic routes, and modals.

## 🎯 Learning Objectives

By completing this project, you'll master:
- ✅ File-based routing structure
- ✅ Tab navigation
- ✅ Stack navigation (nested navigators)
- ✅ Dynamic routes with parameters `[id]`
- ✅ Modal presentations
- ✅ Custom navigation options (headers, icons, etc.)
- ✅ Layout files and nested routing
- ✅ Navigation between different stacks
- ✅ Programmatic navigation with `useRouter()`
- ✅ Route parameters with `useLocalSearchParams()`

## 🚀 Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npx expo start
   ```

3. **Run on device:**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## 📁 Project Structure Overview

```
bookshelf_app/
├── app/                    # All routes go here (file-based routing)
│   ├── _layout.tsx        # Root layout (YOU'LL CREATE THIS)
│   ├── (tabs)/            # Tab navigator group (YOU'LL CREATE THIS)
│   │   ├── _layout.tsx    # Tab layout configuration
│   │   ├── index.tsx      # Browse tab (home)
│   │   ├── categories/    # Categories tab with nested stack
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx
│   │   │   └── [category].tsx  # Dynamic route
│   │   └── profile.tsx    # Profile tab
│   ├── book/              # Book details stack
│   │   └── [id].tsx       # Dynamic book details (YOU'LL CREATE THIS)
│   ├── add-book.tsx       # Modal for adding book (YOU'LL CREATE THIS)
│   └── add-note.tsx       # Modal for adding notes (YOU'LL CREATE THIS)
├── components/            # Reusable components (PROVIDED)
├── store/                 # Zustand store (PROVIDED)
├── types/                 # TypeScript types (PROVIDED)
└── theme.ts              # Theme configuration (PROVIDED)
```

## 📝 Exercise Structure

This project is divided into **7 progressive exercises**. Each builds on the previous one.

---

## 🏋️ Exercise 1: Root Layout & Basic Navigation

**Goal:** Create the root `_layout.tsx` and understand how Expo Router initializes.

### Tasks:

1. **Create `app/_layout.tsx`**
   - Import `Stack` from `expo-router`
   - Render a `<Stack>` component
   - This is your root navigator that wraps everything

2. **Test the basic setup**
   - Create a simple `app/index.tsx` with some text
   - Run the app - you should see your text displayed

### Hints:
- The `_layout.tsx` file at the root defines your app's navigation structure
- Every file in the `app/` directory becomes a route
- Start simple: just render `<Stack />` with no options

### Expected Result:
✅ App runs without errors
✅ You see a basic screen with navigation header

---

## 🏋️ Exercise 2: Tab Navigation Setup

**Goal:** Create a tab navigator with three tabs: Browse, Categories, and Profile.

### Tasks:

1. **Create the tab group structure:**
   - Create `app/(tabs)/` directory
   - Create `app/(tabs)/_layout.tsx`
   - Create `app/(tabs)/index.tsx` (Browse tab)
   - Create `app/(tabs)/categories/` directory
   - Create `app/(tabs)/profile.tsx` (Profile tab)

2. **Configure the tab layout (`app/(tabs)/_layout.tsx`):**
   - Import `Tabs` from `expo-router`
   - Render `<Tabs>` component
   - Configure each tab screen with:
     - Custom title
     - Tab bar icon using `@expo/vector-icons`
     - `tabBarShowLabel: false` for icon-only tabs

3. **Update root layout:**
   - In `app/_layout.tsx`, add the `(tabs)` screen with `headerShown: false`

### Hints:
- Use parentheses `(tabs)` to create a route group (won't appear in URL)
- Tab icons: `book-outline`, `grid-outline`, `person-outline` from Ionicons
- Use `theme.colors.primary` for active tab color

### Expected Result:
✅ Three tabs visible at the bottom
✅ Tapping each tab shows different screen
✅ Active tab is highlighted
✅ Icons display correctly

---

## 🏋️ Exercise 3: Display Books in Browse Tab

**Goal:** Display the list of books from the store on the home screen.

### Tasks:

1. **In `app/(tabs)/index.tsx`:**
   - Import `useBookStore` from `@/store/bookStore`
   - Get the `books` array using the store
   - Import `BookCard` component
   - Use `FlatList` to render books
   - Add a header with "My Library" title

2. **Implement empty state:**
   - Import `EmptyState` component
   - Show it when `books.length === 0`
   - Use message: "No books yet. Start adding some!"

### Hints:
- Use `const books = useBookStore((state) => state.books)`
- FlatList needs `data`, `renderItem`, and `keyExtractor` props
- Don't worry about navigation yet - just display the books

### Expected Result:
✅ List of 6 sample books displays
✅ Each book shows title, author, cover, progress
✅ Empty state appears if no books exist

---

## 🏋️ Exercise 4: Dynamic Book Details Route

**Goal:** Create a dynamic route for book details and navigate to it from cards.

### Tasks:

1. **Create `app/book/[id].tsx`:**
   - Import `useLocalSearchParams` from `expo-router`
   - Get the book ID: `const { id } = useLocalSearchParams<{ id: string }>()`
   - Use `useBookStore` to get the book: `getBookById(id)`
   - Display book details (title, author, description, etc.)
   - Add a "Delete Book" button

2. **Add navigation from BookCard:**
   - In `components/BookCard.tsx`, the `onPress` is already wired
   - In `app/(tabs)/index.tsx`, update `BookCard` to navigate:
     ```tsx
     <BookCard 
       book={item} 
       onPress={() => router.push(`/book/${item.id}`)}
     />
     ```

3. **Configure the stack:**
   - In `app/_layout.tsx`, add configuration for `book/[id]` screen
   - Set title to book name (you'll need `useNavigation` and `useEffect`)

### Hints:
- Dynamic segments use brackets: `[id].tsx`
- Access params with `useLocalSearchParams()`
- Use `if (!book)` to handle not found case
- The route will be `/book/1`, `/book/2`, etc.

### Expected Result:
✅ Tapping a book card navigates to its detail page
✅ Book details display correctly
✅ Back button returns to browse tab
✅ URL shows `/book/1` format

---

## 🏋️ Exercise 5: Categories with Nested Stack Navigation

**Goal:** Create a nested stack inside the Categories tab showing category list → category books.

### Tasks:

1. **Create category index (`app/(tabs)/categories/index.tsx`):**
   - Display list of categories: Fiction, Non-Fiction, Mystery, Sci-Fi, Biography
   - Make each category a pressable card
   - Show book count for each category

2. **Create category layout (`app/(tabs)/categories/_layout.tsx`):**
   - Import `Stack` from `expo-router`
   - Configure the nested stack with two screens:
     - `index` (category list)
     - `[category]` (books in category)

3. **Create category books page (`app/(tabs)/categories/[category].tsx`):**
   - Get category from params: `useLocalSearchParams()`
   - Use store's `getBooksByCategory(category)` method
   - Display filtered books using `BookCard`
   - Navigate to book details when tapped

4. **Wire up navigation:**
   - In category list, navigate to: `/categories/fiction`, `/categories/mystery`, etc.
   - Use `router.push()` for navigation

### Hints:
- Categories tab now has its own nested stack navigation
- Each category becomes a dynamic route
- This demonstrates **stack inside tabs** pattern

### Expected Result:
✅ Categories tab shows list of 5 categories
✅ Tapping category shows books in that category
✅ Can navigate from category → book details
✅ Back button works correctly through navigation hierarchy

---

## 🏋️ Exercise 6: Modal for Adding Books

**Goal:** Create a modal screen for adding new books.

### Tasks:

1. **Create `app/add-book.tsx`:**
   - Create form with fields: title, author, category, pages, description
   - Use `useBookStore` to get `addBook` action
   - On submit, add book and navigate back with `router.back()`

2. **Configure modal in root layout:**
   - In `app/_layout.tsx`, add screen for `add-book`:
     ```tsx
     <Stack.Screen 
       name="add-book" 
       options={{
         presentation: 'modal',
         title: 'Add New Book'
       }}
     />
     ```

3. **Add navigation to modal:**
   - In Browse tab (`app/(tabs)/index.tsx`), add a "+" button in header
   - Use `headerRight` in navigation options
   - Button navigates to `/add-book`

### Hints:
- Modals use `presentation: 'modal'` in stack options
- Modal slides up from bottom (iOS) or covers screen (Android)
- Use `router.back()` to dismiss modal after saving
- Add the header button in the Stack configuration of `app/(tabs)/_layout.tsx` or the home stack layout

### Expected Result:
✅ "+" button appears in Browse tab header
✅ Tapping button opens modal from bottom
✅ Can add a new book with form
✅ Modal dismisses after saving
✅ New book appears in list

---

## 🏋️ Exercise 7: Reading Notes Modal

**Goal:** Add a second modal for creating reading notes about books.

### Tasks:

1. **Create `app/add-note.tsx`:**
   - Accept `bookId` as a route parameter
   - Create form with: note content and page number
   - Use store's `addNote` method to save
   - Navigate back after saving

2. **Add note button to book details:**
   - In `app/book/[id].tsx`, add "Add Note" button
   - Navigate to: `/add-note?bookId=${book.id}`
   - Pass bookId as query parameter

3. **Display notes on book details page:**
   - Get notes using `getNotesByBookId(id)` from store
   - Display list of notes below book description
   - Show note content, page number, and date

4. **Configure modal:**
   - Add `add-note` screen to root `_layout.tsx` as modal

### Hints:
- Pass data via query params: `router.push(\`/add-note?bookId=\${id}\`)`
- Access with: `const { bookId } = useLocalSearchParams()`
- Notes demonstrate passing data to modals

### Expected Result:
✅ Book details page has "Add Note" button
✅ Tapping opens modal for creating note
✅ Notes save and display on book page
✅ Notes show page number and content
✅ Multiple modals work correctly

---

## 🎓 Bonus Challenges (Optional)

Once you complete all 7 exercises, try these advanced features:

### Bonus 1: Search and Filtering
- Add search bar in Browse tab header
- Filter books by title/author as user types
- Use `searchBarOptions` in Stack.Screen options

### Bonus 2: Swipe Actions
- Add swipe-to-delete on book cards
- Use `react-native-gesture-handler` and `Swipeable`
- Delete books without opening details

### Bonus 3: Reading Stats in Profile
- Calculate total books read, pages read, average rating
- Display statistics with charts or progress bars
- Show "Currently Reading" section

### Bonus 4: Custom Header Components
- Create a custom header component for Browse tab
- Add multiple action buttons (search, add, filter)
- Use `header` option in Stack.Screen

### Bonus 5: Deep Linking
- Configure custom URL scheme
- Test deep links: `bookshelf://book/1`
- Handle universal links

---

## 🧪 Testing Your Navigation

After each exercise, test:

1. **Forward navigation:** Can you navigate deeper into the app?
2. **Back navigation:** Does back button work correctly?
3. **Tab switching:** Do tabs maintain their navigation state?
4. **Modals:** Do modals present and dismiss correctly?
5. **Deep navigation:** Browse → Book → Back to Browse → Categories → Category Books → Book Details

---

## 📚 Key Concepts Reference

### File-Based Routing
- `index.tsx` → `/` (root route)
- `about.tsx` → `/about`
- `user/[id].tsx` → `/user/123` (dynamic route)
- `(tabs)/` → grouped routes (no URL segment)

### Route Types
- **Stack:** Linear navigation (push/pop)
- **Tabs:** Bottom/top tab bar
- **Modal:** Overlays current screen

### Navigation Hooks
```tsx
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';

const router = useRouter();
router.push('/path');        // Navigate forward
router.replace('/path');     // Replace current
router.back();               // Go back

const params = useLocalSearchParams(); // Get URL params
const navigation = useNavigation();    // Navigation object
```

### Layout Configuration
```tsx
<Stack.Screen 
  name="route-name"
  options={{
    title: 'Screen Title',
    headerShown: true,
    presentation: 'modal',
    headerRight: () => <Button />,
  }}
/>
```

---

## 🐛 Troubleshooting

**App won't start:**
- Delete `node_modules` and `.expo` folders
- Run `npm install` again
- Clear Metro bundler: `npx expo start -c`

**Navigation not working:**
- Check file names match route paths
- Ensure `_layout.tsx` files are present
- Check for typos in route names

**TypeScript errors:**
- Run `npm install` to generate types
- Restart TypeScript server in your editor

**Screen not showing:**
- Check if route is registered in `_layout.tsx`
- Verify file is in correct directory
- Check for `export default` in screen file

---

## 🎉 Completion Checklist

When you've finished all exercises, you should have:

- [ ] Root layout with Stack navigator
- [ ] Tab navigation with 3 tabs
- [ ] Browse tab showing all books
- [ ] Dynamic book details route with ID parameter
- [ ] Categories tab with nested stack navigation
- [ ] Dynamic category route showing filtered books
- [ ] Add Book modal with form
- [ ] Add Note modal with book ID parameter
- [ ] Full navigation flow working correctly
- [ ] All back buttons and tab switches functional

---

## 📖 Resources

- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Expo Router Examples](https://github.com/expo/router/tree/main/examples)
- [React Navigation Docs](https://reactnavigation.org/)

---

## 💡 Tips for Success

1. **Start simple:** Get each exercise working before moving to the next
2. **Read error messages:** Expo Router gives helpful error screens
3. **Check file structure:** Routes must be in `app/` directory
4. **Use TypeScript:** It helps catch navigation mistakes
5. **Test on device:** Gestures work better on real device than simulator
6. **Console log:** Use `console.log(params)` to debug route parameters

---

Happy coding! 🚀 You're going to master Expo Router through this project!
