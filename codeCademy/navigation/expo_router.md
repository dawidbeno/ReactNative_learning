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
