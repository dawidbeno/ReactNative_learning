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

### Accessing Route Parameters

**The `useLocalSearchParams` Hook:**
```typescript
import { useLocalSearchParams } from 'expo-router';

export default function Thought() {
  const { id } = useLocalSearchParams();
  // id contains the value from the URL path
}
```

**How Parameter Names Work:**
- Folder name: `[id]` → Parameter name: `id`
- Folder name: `[productId]` → Parameter name: `productId`
- Folder name: `[slug]` → Parameter name: `slug`

**Important:** Parameters are always strings or arrays of strings. Convert types explicitly:
```typescript
const { id } = useLocalSearchParams();
const thoughtId = Number(id); // Convert to number
```

### Navigation in Expo Router

**The `useRouter` Hook:**
```typescript
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();
  
  const onPressRandomThoughtHandler = () => {
    router.navigate(`/thoughts/${randomThoughtId}`);
  };
}
```

**Available Methods:**
- `navigate(path)` - Navigate to a route
- `push(path)` - Push to stack
- `back()` - Go back
- `replace(path)` - Replace current screen

**Key Difference from React Navigation:**
- React Navigation: `navigation.navigate("ThoughtDetail", { id: 5 })`
- Expo Router: `router.navigate("/thoughts/5")`

You build paths as strings starting from `/app`, replacing bracketed segments with actual values.

### Declarative Navigation with `<Link>`

For UI-based navigation, use the `Link` component:

```typescript
import { Link } from 'expo-router';

<Link 
  href={`/thoughts/${thoughtId}`}
  style={styles.linkStyle}
>
  View Thought
</Link>
```

**Props:**
- `href` - Navigation path (required)
- `replace` - Replace instead of push (optional)
- `style` - Styling (optional)

**Comparison:**
```typescript
// Imperative (programmatic)
router.navigate(`/thoughts/${id}`);

// Declarative (component)
<Link href={`/thoughts/${id}`}>View</Link>
```

### Complete Example

```typescript
// app/thoughts/index.tsx
import { Link } from 'expo-router';

export default function ThoughtsList() {
  const thoughts = [
    { id: '1', text: 'React Native is awesome' },
    { id: '2', text: 'Expo Router simplifies navigation' }
  ];
  
  return (
    <View>
      {thoughts.map(thought => (
        <Link 
          key={thought.id}
          href={`/thoughts/${thought.id}`}
        >
          {thought.text}
        </Link>
      ))}
    </View>
  );
}

// app/thoughts/[id]/index.tsx
import { useLocalSearchParams } from 'expo-router';

export default function ThoughtDetail() {
  const { id } = useLocalSearchParams();
  
  // Find thought with this id
  const thought = thoughts.find(t => t.id === id);
  
  return <Text>{thought.text}</Text>;
}
```

This web-like approach makes paths correspond to file structures and navigation feel like standard URL routing.

## Route Groups

### The Problem: Organizing Without Affecting URLs
Apps often separate public routes (anyone can access) from protected routes (authentication required). You might want:
- Public: `/login`, `/signup`
- Protected: `/dashboard`, `/profile`

Creating folders like `public/` or `protected/` would pollute URLs: `/public/login`, `/protected/dashboard` ❌

### The Solution: Route Groups
Route groups are folders wrapped in parentheses `(name)` that organize code without contributing path segments.

**Folder Structure:**
```
app/
  _layout.tsx
  (auth)/              // Route group - no URL segment
    _layout.tsx
    login.tsx          → /login (not /auth/login)
  (protected)/         // Route group - no URL segment
    _layout.tsx
    index.tsx          → / (not /protected)
    thoughts/
      [id]/index.tsx   → /thoughts/[id]
```

**Key Points:**
- `(auth)` and `(protected)` don't appear in URLs
- Routes remain clean: `/login`, `/`, `/thoughts/1`
- Pure organizational tool

### Layout Files in Route Groups

Each route group can have its own `_layout.tsx` for group-specific logic like authentication checks.

**Protected Layout Example:**
```typescript
// app/(protected)/_layout.tsx
import { Redirect } from 'expo-router';

export default function ProtectedLayout() {
  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }
  
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="thoughts" />
    </Tabs>
  );
}
```

**How It Works:**
1. User tries to access a protected route
2. Layout checks authentication
3. If not logged in → Redirect to `/login`
4. If logged in → Render the tabs navigator

**`<Redirect>` Component:**
- Declarative navigation
- Automatically navigates to specified route
- Alternative: `router.replace('/login')` for programmatic control

**Why `replace()` not `navigate()`?**
Using `replace()` removes unauthorized pages from history, preventing users from going back to protected screens after logout.

### Protected Screens (Expo Router 53+)

Modern approach using `<Stack.Protected>` wrapper:

```typescript
// app/_layout.tsx
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(protected)" />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}
```

**How It Works:**
- `guard` prop accepts a boolean condition
- Navigator shows first screen where guard condition is `true`
- When authentication changes, automatically switches route groups
- Clears navigation history from inaccessible sections

**Benefits Over Manual Redirects:**
- No redirect code in each layout file
- Automatic history management
- Centralized authentication logic
- Cleaner, more declarative

### Comparison: Manual vs Protected

**Manual Approach:**
```typescript
// Each protected layout needs this
if (!isLoggedIn) {
  return <Redirect href="/login" />;
}
```

**Protected Approach:**
```typescript
// Single root configuration
<Stack.Protected guard={isLoggedIn}>
  <Stack.Screen name="(protected)" />
</Stack.Protected>
```

### Common Patterns

**Auth Flow:**
```
app/
  _layout.tsx           // Root with Protected guards
  (auth)/
    login.tsx           → /login
    signup.tsx          → /signup
  (protected)/
    _layout.tsx         // Tabs for authenticated users
    dashboard.tsx       → /dashboard
    profile.tsx         → /profile
```

**Multi-Level Groups:**
```
app/
  (public)/
    about.tsx           → /about
    contact.tsx         → /contact
  (user)/
    (settings)/
      account.tsx       → /account
      privacy.tsx       → /privacy
```

Both `(user)` and `(settings)` are route groups - neither affects the URL path.



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


# Summary
In this lesson, you learned that React Native Navigation:

- Uses the React Navigation library with common navigators like Native Stack (@react-navigation/native-stack), Bottom Tabs (@react-navigation/bottom-tabs), and Drawer (@react-navigation/drawer) navigators
- Requires `<NavigationContainer>` to wrap your entire app and uses `create[TYPE]Navigator` to create navigators with `<Navigator>` and `<Screen>` components
- Supports navigator options like initialRouteName and screenOptions, plus screen-specific props like name, component, and options
- Makes Bottom Tabs Navigator ideal for a broad, section-based organization with persistent navigation at the bottom of the screen
- Provides programmatic navigation through the navigation object (passed to screens) or useNavigation() hook with methods like navigate(), goBack(), and navigator-specific methods like popTo()
- Supports dynamic paths using route parameters, accessible via route.params in the destination screen
- Enables nested navigation for combining different navigator types, with action bubbling and careful options management across nested levels
- You also learned that Expo Router:

- Is built on top of React Navigation but uses file-based routing where your folder structure automatically generates routes
- Treats index.tsx as the default route and _layout.tsx files define navigator relationships without being part of the URL path
- Creates dynamic paths using square bracket folder names like [userId] and nested routes using folder structures with nested _layout.tsx files
- Accesses dynamic path data using useLocalSearchParams() and provides navigation via useRouter hook or `<Link>` component with href prop
- Handles authentication routing using route groups (auth) to organize routes without affecting URL segments and `<Redirect>` component for automatic redirection