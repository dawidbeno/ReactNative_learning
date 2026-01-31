# Nested Navigators in React Navigation
When working with nested navigators, there are a few caveats to be aware of. For example:

- each navigator is responsible for its own state and is independent of other navigators
- each navigator controls its own options independently of each other
- each navigator has its own set of parameters
- if the current navigator can’t find a screen, the parent navigator tries instead

## Overview
Nested navigators allow you to place one navigator inside another, enabling complex navigation patterns like tabs within a stack or drawers with their own stacks.

## Common Pattern: Tabs Inside Stack
```typescript
// Tab Navigator with multiple screens
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Main Stack with nested tabs
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* Tabs nested inside stack */}
        <Stack.Screen 
          name="Main" 
          component={TabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## How It Works
- **Outer navigator** (Stack) controls top-level flow: Login → Main → Settings
- **Inner navigator** (Tabs) handles navigation within Main screen
- Each navigator maintains its own state independently

## Navigation Between Nested Screens
```typescript
// From ProfileScreen (inside tabs) to Settings (in stack)
navigation.navigate('Settings');

// Access parent navigator explicitly
navigation.getParent()?.navigate('Settings');
```

## Common Use Cases
- **Tabs in Stack**: Authentication flow → Tab-based home
- **Stack in Tabs**: Each tab has its own navigation history
- **Drawer with Stacks**: Side menu where each item opens a stack

## Example: Stack Per Tab
```typescript
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeList" component={HomeListScreen} />
      <Stack.Screen name="HomeDetail" component={HomeDetailScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}
```

Each tab maintains its own navigation history independently.

## Key Benefits
- Separate navigation contexts for different app sections
- Independent back stacks per tab
- Cleaner code organization
- Matches common mobile UX patterns

## Important Notes
- Avoid excessive nesting (2-3 levels max) for performance
- Use `headerShown: false` on nested navigator screens to prevent double headers
- Type safety requires proper TypeScript configuration for nested params