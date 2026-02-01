# Expo Router: File-Based Routing

## The Problem with React Navigation
- Lots of boilerplate code to set up navigators and screens
- Complex nested navigation is hard to understand
- Difficult to see the navigation hierarchy at a glance

## Expo Router Solution
Expo Router is an abstraction built on top of React Navigation. It automatically generates your navigation system based on your folder structure.

**Key concept:** Files and folders = Routes

## How It Works

### The `app/` Folder
All navigation screens must live in the `app/` folder, which defines your root path (`/`).

### File Structure = URL Paths
```
app/
  index.tsx          → "/"
  admin.tsx          → "/admin"  
  profile.tsx        → "/profile"
  products/
    catalog.tsx      → "/products/catalog"
```

Each file and folder creates a path segment:
- **Files** contribute their name: `admin.tsx` → `/admin`
- **Folders** contribute their name: `products/` → `/products`
- **index.tsx** displays at its parent folder's path (doesn't add a segment)

## The Special `index.tsx` File
`index.tsx` is the default route for its containing folder.

**Examples:**
```
app/index.tsx              → Shows at "/"
app/products/index.tsx     → Shows at "/products"
```

Without `index.tsx` in the `app/` folder, you'd have no root route.

## Benefits Over Manual Navigation Setup
- **Visual hierarchy**: Folder structure shows navigation structure
- **Less boilerplate**: No need to manually configure `<Stack.Navigator>` and `<Stack.Screen>`
- **Web-like paths**: Reference screens using familiar URL-style paths
- **Same React Navigation concepts**: Everything you learned still applies

## The `_layout.tsx` File

### Problem: Organizing Screens Together
Individual files create independent routes. For example:
```
app/
  index.tsx    → "/"
  faq.tsx      → "/faq"
```

These screens exist separately - users can't navigate between them without a navigator structure.

### Solution: Use `_layout.tsx`
`_layout.tsx` is a special file that:
- Doesn't contribute a path segment (like `index.tsx`)
- Defines how screens in the same folder are organized
- Acts as a shared wrapper for screens
- One layout file per folder

### Creating a Tab Navigator
```typescript
// app/_layout.tsx
import { Tabs } from 'expo-router';

export default function RootTabNavigator() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen 
        name="index" 
        options={{ tabBarLabel: 'Home' }} 
      />
      <Tabs.Screen 
        name="faq" 
        options={{ tabBarLabel: 'Q&A' }} 
      />
    </Tabs>
  );
}
```

**Key Points:**
- Import `Tabs` directly from `expo-router` (no `createBottomTabNavigator` needed)
- `name` prop references the **file name** (`index`, `faq`)
- Layout wraps all screens in the same folder

### Additional Benefits
- **Initialization code**: Runs before other screens
- **Use cases**: Check permissions, load background data
- **Nested layouts**: Create complex navigation with layouts in subfolders

## Dynamic Routes

### Creating Variable Path Segments
Use square brackets in folder names to create dynamic routes:

```
app/
  thoughts/
    [id]/
      index.tsx    → /thoughts/1, /thoughts/10, /thoughts/1000
```

The `[id]` folder creates a dynamic segment that matches any value:
- `/thoughts/1` ✓
- `/thoughts/10` ✓
- `/thoughts/1000` ✓

We'll cover accessing the dynamic value (like `id`) in the next section.

## Nested Navigators with Layouts

### Multiple Layout Files
You can have layouts at different levels to create complex navigation:

```
app/
  _layout.tsx          // Root: Tab navigator
  index.tsx
  faq.tsx
  thoughts/
    _layout.tsx        // Nested: Stack navigator  
    index.tsx
    [id]/
      index.tsx
```

### Example: Tabs with Nested Stack

**Root Layout (Tabs):**
```typescript
// app/_layout.tsx
import { Tabs } from 'expo-router';

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ tabBarLabel: 'Home' }} />
      <Tabs.Screen name="faq" options={{ tabBarLabel: 'Q&A' }} />
      <Tabs.Screen name="thoughts" options={{ tabBarLabel: 'My Thoughts' }} />
    </Tabs>
  );
}
```

**Nested Layout (Stack):**
```typescript
// app/thoughts/_layout.tsx
import { Stack } from 'expo-router';

export default function ThoughtsNavigator() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="[id]/index" 
        options={{ headerTitle: 'My Thoughts' }} 
      />
    </Stack>
  );
}
```

### How It Works
1. Root layout creates tabs: Home, Q&A, My Thoughts
2. Tapping "My Thoughts" tab enters the nested stack navigator
3. Stack handles navigation between thoughts list (`index.tsx`) and individual thought details (`[id]/index.tsx`)

### Auto-Inferred Screens
If you don't need custom options, Expo Router automatically includes all screens in the folder - just specify the navigator type without individual `<Stack.Screen>` elements.