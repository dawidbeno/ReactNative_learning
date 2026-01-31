# Navigation

## NavigationContainer
The root wrapper that manages navigation state and links the app to the navigation environment. Required at the top level of your app - wraps all navigation components.

## Stack Navigator
Creates a stack-based navigation where screens are pushed/popped like a stack of cards.

```jsx
<NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ headerTitle: "Home" }}/>
      <Stack.Screen name="FAQ" component={FAQ} options={{ headerTitle: "Q & A" }}/>
      <Stack.Screen name="Thoughts" component={Thoughts} options={{ headerTitle: "My Thoughts" }}/>
    </Stack.Navigator>
</NavigationContainer>
```

## Key Concepts
- **Stack.Navigator**: Container for stack screens, sets initial route
- **Stack.Screen**: Individual screen configuration with name, component, and options
- **initialRouteName**: First screen shown when app launches
- **options**: Screen-specific settings (header title, styling, etc.)
- **Type safety**: `NativeStackParamList` provides TypeScript autocomplete for navigation

## Navigation Behavior
- Each screen push adds to stack (animated transition)
- Back button/gesture pops from stack
- Native platform animations (iOS/Android)



## Tab navigator
Tab Navigator creates bottom tab navigation, common in mobile apps for switching between main sections.

### Basic Setup
```typescript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

<Tab.Navigator 
  initialRouteName="Home"
  backBehavior="history"
>
  <Tab.Screen name="Home" component={Home} />
  <Tab.Screen name="Profile" component={Profile} />
  <Tab.Screen name="Settings" component={Settings} />
</Tab.Navigator>
```

### Key Props

#### initialRouteName
Specifies which tab displays first when app launches.

```typescript
<Tab.Navigator initialRouteName="Profile">
```

#### backBehavior
Controls what happens when Android back button is pressed:

- `'firstRoute'` (default) - Return to first tab
- `'initialRoute'` - Return to initial tab (from `initialRouteName`)
- `'order'` - Go to previous tab in order they're defined
- `'history'` - Go to last visited tab
- `'none'` - Back button doesn't navigate tabs

```typescript
<Tab.Navigator backBehavior="history">
```

**Example:** With `backBehavior="history"`, if user navigates Home → Profile → Settings, pressing back goes to Profile, then Home.

### Common Options
```typescript
<Tab.Screen 
  name="Home" 
  component={Home}
  screenOptions={{ headerShown: false }} // to hide a header
  options={{
    tabBarLabel: 'Home',
    tabBarIcon: ({ color, size }) => (
      <Icon name="home" color={color} size={size} />
    ),
    tabBarBadge: 3  // Notification badge
  }}
/>
```

### Use Cases
- Primary app navigation
- Switching between main features
- Dashboard-style layouts
- Content categorization

