# Programic navigation

## The Main Problem
**How do we move between screens in our app?**

Answer: Use the `navigation` object that React Navigation provides.

---

## Two Ways to Get the Navigation Object

### Method 1: Props (For Screen Components)
When you register a component in `<Stack.Screen>`, it automatically receives `navigation` as a prop:

```typescript
// ✅ HomeScreen is registered in Stack.Screen
function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button 
        title="Go to About" 
        onPress={() => navigation.navigate("About")} 
      />
    </View>
  );
}

// In your App.js
<Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="About" component={AboutScreen} />
</Stack.Navigator>
```

**The Problem:** Only `HomeScreen` gets the `navigation` prop. Child components inside don't get it automatically.

```typescript
function HomeScreen({ navigation }) {
  return (
    <View>
      {/* ❌ CustomButton doesn't have navigation prop */}
      <CustomButton />
    </View>
  );
}

function CustomButton() {
  // navigation is undefined here!
  return <Button title="Click" onPress={() => navigation.navigate("About")} />
}
```

---

### Method 2: useNavigation Hook (Works Anywhere)
The hook solves the child component problem:

```typescript
import { useNavigation } from "@react-navigation/native";

function CustomButton() {
  const navigation = useNavigation();
  
  return (
    <Button 
      title="Go to About" 
      onPress={() => navigation.navigate("About")} 
    />
  );
}

function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
      {/* ✅ Now CustomButton can navigate! */}
      <CustomButton />
    </View>
  );
}
```

**Rule of Thumb:**
- Screen component? Use props `({ navigation })`
- Child/nested component? Use `useNavigation()` hook

---

## Navigation Methods Explained

### navigate() - Go to Any Screen
```typescript
navigation.navigate("Profile")
```
- Goes to the "Profile" screen
- If already on Profile, does nothing (doesn't add duplicate)

**Real Example:**
```typescript
<Button 
  title="View Profile" 
  onPress={() => navigation.navigate("Profile")} 
/>
```

---

### goBack() - Go Back One Screen
```typescript
navigation.goBack()
```
- Like pressing the back button
- Returns to previous screen

**Real Example:**
```typescript
<Button 
  title="Cancel" 
  onPress={() => navigation.goBack()} 
/>
```

---

## Stack Navigator Specific Methods

Think of screens like a stack of cards:

```
[Settings]  ← Top (current screen)
[Profile]
[Home]      ← Bottom
```

### push() - Add New Screen on Top
```typescript
navigation.push("Profile")
```
- ALWAYS adds a new screen, even if already in stack
- Useful for repeated screens (like viewing multiple products)

**Example: Shopping App**
```typescript
// User journey: Home → Product A → Product B → Product C
function ProductScreen({ navigation, route }) {
  const { productId } = route.params;
  
  return (
    <View>
      <Text>Product {productId}</Text>
      <Button 
        title="View Related Product" 
        onPress={() => navigation.push("Product", { productId: 456 })} 
      />
    </View>
  );
}

// Stack becomes: [Home] → [Product 123] → [Product 456]
```

---

### pop() - Remove Current Screen
```typescript
navigation.pop()
```
- Removes top screen from stack
- Similar to `goBack()` but stack-specific

**Example:**
```
Before: [Home] → [Profile] → [Settings]
After pop(): [Home] → [Profile]
```

---

### replace() - Swap Current Screen
```typescript
navigation.replace("Login")
```
- Removes current screen and replaces with new one
- User can't go back to replaced screen

**Example: After Login**
```typescript
function LoginScreen({ navigation }) {
  const handleLogin = () => {
    // Login successful, replace Login with Home
    navigation.replace("Home");
  };
  
  return <Button title="Login" onPress={handleLogin} />
}
// User can't press back to return to Login screen
```

---

## Visual Comparison

### navigate() vs push()

**Using navigate():**
```
User on Home, clicks "Profile" → [Home] → [Profile]
User clicks "Profile" again → [Home] → [Profile] (no change)
```

**Using push():**
```
User on Home, clicks "Profile" → [Home] → [Profile]
User clicks "Profile" again → [Home] → [Profile] → [Profile] (duplicate added!)
```

---

## Practical Full Example

```typescript
import { useNavigation } from "@react-navigation/native";

// Child component using hook
function NavigationButtons() {
  const navigation = useNavigation();
  
  return (
    <View>
      <Button 
        title="Go to About" 
        onPress={() => navigation.navigate("About")} 
      />
      <Button 
        title="Go Back" 
        onPress={() => navigation.goBack()} 
      />
    </View>
  );
}

// Screen component using props
function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
      
      {/* Direct navigation in screen component */}
      <Button 
        title="To Profile" 
        onPress={() => navigation.navigate("Profile")} 
      />
      
      {/* Child component can navigate too */}
      <NavigationButtons />
    </View>
  );
}

// App setup
<Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Profile" component={ProfileScreen} />
  <Stack.Screen name="About" component={AboutScreen} />
</Stack.Navigator>
```

---

## Key Takeaways

1. **Two ways to get navigation:**
   - Props: For screen components registered in `<Stack.Screen>`
   - Hook: For any component inside `<NavigationContainer>`

2. **Common methods:**
   - `navigate()` - Go to screen (smart, avoids duplicates)
   - `goBack()` - Return to previous screen
   
3. **Stack-specific methods:**
   - `push()` - Always add new screen (allows duplicates)
   - `pop()` - Remove current screen
   - `replace()` - Swap current screen (can't go back)

4. **When to use what:**
   - Product details that can link to other products? Use `push()`
   - Login/Logout flows? Use `replace()`
   - Normal navigation? Use `navigate()`