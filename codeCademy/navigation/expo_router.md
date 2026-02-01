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

### The Problem: Variable Content
Traditional static routes work for fixed pages like `/about` or `/faq`, but what about content that varies? For example:
- Product details: `/products/123`, `/products/456`
- User profiles: `/users/john`, `/users/sarah`
- Blog posts: `/posts/2024-review`, `/posts/getting-started`

Creating a separate file for each possible ID is impossible.

### The Solution: Dynamic Segments
Use square brackets `[parameter]` in folder names to create routes that match any value in that position.

**Folder Structure:**
```
app/
  thoughts/
    [id]/
      index.tsx    → /thoughts/1, /thoughts/10, /thoughts/1000
```

**How It Works:**
- The `[id]` folder is a **placeholder** for any value
- Expo Router matches any path where something exists in that position
- `/thoughts/1` matches → `id = "1"`
- `/thoughts/hello` matches → `id = "hello"`
- `/thoughts/abc-123` matches → `id = "abc-123"`

**Why the Extra `index.tsx`?**
The `index.tsx` inside `[id]/` makes the route accessible at the dynamic segment level. Without it, you'd need additional path segments like `/thoughts/1/details`.

**Pattern Recap:**
- `[id]/index.tsx` → Accessible at `/thoughts/:id`
- `[id]/edit.tsx` → Would be accessible at `/thoughts/:id/edit`

We'll cover accessing the actual dynamic value in the next section.

## Nested Navigators with Layouts

### Understanding Navigation Hierarchies
Real apps need layered navigation structures:
- **Top level**: Main sections (tabs, drawer)
- **Within sections**: Detailed navigation (stacks for lists → details)

Example: Instagram has tabs (Home, Search, Profile), but each tab has its own navigation flow with multiple screens.

### Multiple Layout Files Strategy
Each folder can have its own `_layout.tsx` to define how screens in that folder relate to each other.

**Folder Structure:**
```
app/
  _layout.tsx          // Root: Tab navigator
  index.tsx            // Home tab content
  faq.tsx              // FAQ tab content
  thoughts/            // Thoughts tab (contains sub-navigation)
    _layout.tsx        // Nested: Stack navigator  
    index.tsx          // Thoughts list
    [id]/
      index.tsx        // Individual thought detail
```

**How Layouts Nest:**
1. Root `_layout.tsx` creates the overall structure (tabs)
2. The `thoughts` folder appears as one tab in the root navigator
3. Inside `thoughts/`, a separate `_layout.tsx` creates a stack navigator
4. This stack manages navigation between the thoughts list and individual thoughts

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
      {/* 'thoughts' references the entire thoughts/ folder */}
      <Tabs.Screen name="thoughts" options={{ tabBarLabel: 'My Thoughts' }} />
    </Tabs>
  );
}
```

**Key Point:** The `name="thoughts"` doesn't point to a file - it references the entire `thoughts/` folder, which contains its own layout and screens.

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
      {/* Notice: name includes the folder structure */}
      <Stack.Screen 
        name="[id]/index" 
        options={{ headerTitle: 'My Thoughts' }} 
      />
    </Stack>
  );
}
```

**Why `name="[id]/index"`?**
The name must match the relative path from the layout file's location. Since `[id]/index.tsx` is inside the `thoughts/` folder, we reference it as `[id]/index`.

### Navigation Flow Example
1. User opens app → Root layout renders tabs
2. User taps "My Thoughts" tab → Enters `thoughts/` section
3. `thoughts/_layout.tsx` renders its stack navigator
4. Stack shows `thoughts/index.tsx` (the list)
5. User taps a thought → Stack pushes `thoughts/[id]/index.tsx` (the detail)
6. User can go back within the stack or switch tabs

### Independent Navigation States
Each tab maintains its own navigation history:
- Navigate deep into "My Thoughts" stack
- Switch to "Home" tab
- Switch back to "My Thoughts" → You're still at the same place in the stack

### Auto-Inferred Screens
Expo Router can automatically detect and include screens:

```typescript
// Minimal version - auto-detects all screens in folder
export default function ThoughtsNavigator() {
  return <Stack />;
}
```

This works when you don't need custom options. Expo Router scans the folder and adds all screens automatically. For customization (headers, titles, etc.), explicitly define `<Stack.Screen>` elements.