# Pressable component

`<Button>` works well but is limited by its lack of customizability. To address this problem, the React Native team introduced a new core component called `<Pressable>`.

The `<Pressable>` component, like `<Button>`, allows us to run code when pressed via the onPress prop. Still, it also exposes additional access points like onPressIn and onPressOut, for more granular control of the pressing action.

## deprecated TouchableOpacity
Before `<Pressable>`, React Native used separate components for different touch interactions: `<TouchableOpacity>` (fades on press), `<TouchableHighlight>` (highlights on press), and `<TouchableWithoutFeedback>` (no visual feedback). `<Pressable>` was introduced in React Native 0.63 to unify these into a single component that handles all touch states through style functions and event callbacks. How convenient!



# Keyboard
The keyboardType is set to default if not specified, and other common values include:

`email-address`: displays email related characters like `@`and `.` \
`phone-pad`: displays digits and other characters like `#` \
`number-pad`: displays digits \
`decimal-pad`: displays digits and `.` \
`url`: displays URL-related characters like `.com`, `/`, and `.` 

We can wrap our input element(s) in a `<KeyboardAvoidingView>` component to accommodate the virtual keyboard.

```
import { KeyboardAvoidingView, Platform } from "react-native"
<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
  <TextInput
    keyboardType="default"
  />

  <TextInput
    keyboardType="email-address"
  />

  <TextInput
    keyboardType="phone-pad"
  />
</KeyboardAvoidingView>
```

In the example, we’ve replaced the `<KeyboardAvoidingView>` as the parent for our inputs so they stay visible to the user while the keyboard is visible. Notice the behavior prop, which determines how the layout will change to accommodate the keyboard. The commonly used values are:

**padding**: adds padding to the bottom of the view equal to the keyboard size (iOS).\
**height**: reduces the view height equal to the size of the keyboard (Android).


# Scrolling
While `<ScrollView>` works for small lists, it becomes a performance bottleneck as data grows because it eagerly renders every item at once, even those off-screen.
To keep your app fast, you should use `<FlatList>`. It renders items lazily, meaning it only loads what is currently visible to the user.

```
<View style={{ height: 200}}>
  <FlatList
    data={users}
    renderItem={({ item }) => (
      <View>
        <Text>Name: {item.name}</Text>
      </View>
    )}
    keyExtractor={item => item.id}
  />
</View>
```

Note that like the `<ScrollView>`, the `<FlatList>` needs to have a deterministic height, either through the height style or flex.

- `data` to specify the items the `<FlatList>` will pass to the renderItem function

- `renderItem` to render child items using a function which will be called by `<FlatList>` on each item in data

- `keyExtractor` to provide a key for each item using a function which will be called by `<FlatList>` so React can efficiently render the items


# Modals
`Modal` is a core component that displays content in a layer above the main application view, blocking interaction with the underlying content.

## Key Props
- `visible` (boolean) - Controls modal visibility
- `animationType` - Animation style: `'none'`, `'slide'`, `'fade'`
- `onRequestClose` - Required on Android; handles back button/gestures
- `transparent` (boolean) - Allows background to be visible

## Basic Usage
```jsx
import { Modal, View, Text, Button } from 'react-native';

<Modal
  visible={modalVisible}
  animationType="slide"
  onRequestClose={() => setModalVisible(false)}
>
  
    Modal Content
    <Button 
      title="Close" 
      onPress={() => setModalVisible(false)} 
    />
```

## Important Notes
- Covers entire screen by default
- Behavior differs between iOS and Android
- Must handle dismissal logic manually
- Content needs explicit styling/positioning

# Alerts
`Alert` displays a native alert dialog with a title, message, and buttons. It's a simple API for showing alerts without needing UI components.

## Basic Usage
```jsx
import { Alert } from 'react-native';

// Simple alert
Alert.alert('Success', 'Your data has been saved');

// Alert with multiple action buttons
Alert.alert(
  'Title',
  'Message',
  [
    {
      text: 'Cancel',
      onPress: cancelSignup
    },
    {
      text: 'Edit',
      onPress: editDetails
    },
    {
      text: 'Confirm',
      onPress: signUp
    }
  ]
);
```

## Alert.alert() Parameters
1. **title** (string) - Alert title
2. **message** (string, optional) - Alert message
3. **buttons** (array, optional) - Array of button objects
4. **options** (object, optional) - Additional options (cancelable, onDismiss)

## Button Styles
- `default` - Standard button
- `cancel` - Cancel button (bold on iOS)
- `destructive` - Red text on iOS for destructive actions

## Platform Differences
- **iOS**: Supports multiple buttons, shows vertically if >2 buttons
- **Android**: Limited to 3 buttons (neutral, negative, positive)

## Key Points
- Native dialog, not a custom component
- Blocks interaction until dismissed
- Android back button dismisses if `cancelable: true`
- Cannot be styled (uses native OS styling)

## onPress Function Reference
Two ways to call methods in `onPress`:

```jsx
// Direct reference (preferred when no arguments needed)
onPress: onRestartGameHandler

// Arrow function wrapper (use when passing arguments)
onPress: () => onRestartGameHandler(gameId)

// Multiple functions (with or without arguments)
onPress: () => {
  onRestartGameHandler(gameId);
  resetScore();
}

// ❌ INCORRECT - calls immediately during render
onPress: onRestartGameHandler(gameId)
```

**Why the last one is wrong**: `onRestartGameHandler(gameId)` executes the function immediately when the component renders, not when the button is pressed. The arrow function wrapper delays execution until the button is actually pressed.

**Recommendation**: Use direct reference for cleaner code. Use arrow function only when passing parameters or calling multiple functions.


# Loading indicators
`ActivityIndicator` displays a circular loading spinner. It's a simple, cross-platform component for showing loading states.

## Basic Usage
```jsx
import { ActivityIndicator } from 'react-native';

// Simple spinner
<ActivityIndicator />

// Customized spinner
<ActivityIndicator 
  size="large" 
  color="#0000ff" 
  animating={true}
/>

```

## Key Props
- `animating` (boolean, default: true) - Whether spinner is visible and animating
- `color` (string) - Spinner color (defaults to platform color)
- `size` (string | number) - `'small'`, `'large'`, or custom number (Android only)
- `hidesWhenStopped` (boolean, iOS only) - Hides when `animating={false}`

## Common Patterns
```jsx
// Conditional loading
{isLoading && <ActivityIndicator size="large" color="#667eea" />}

// Centered overlay
<View style={styles.loadingContainer}>
  <ActivityIndicator size="large" color="#fff" />
  <Text style={styles.loadingText}>Loading...</Text>
</View>

```

## Platform Differences
- **iOS**: Only supports 'small' and 'large' sizes
- **Android**: Accepts custom numeric sizes
- Default colors differ between platforms

## Use Cases
- Data fetching states
- Form submissions
- Page transitions
- Content loading placeholders

One thing to note is that the `animating` prop hides the indicator but keeps the element in the layout, which may not always be desired, as it will affect other components.
Instead, if we want to remove the indicator from the layout, we can use conditional rendering instead of the `animating` prop.
```jsx
const [isLoading, setIsLoading] = useState(false)
return (
  <View>
    {isLoading? (
      <ActivityIndicator size="large" color="lightblue"/>
    ) : (
      <>
        {/* other components*/}
      </>
    )}
  </View>
)
```
In the example, we remove the `animating` prop and use a ternary to render `<ActivityIndicator>` conditionally and then remove it from the layout once `isLoading` is back to `false`.


# Accessibility

Accessibility props help screen readers and assistive technologies understand UI elements, making apps usable for people with disabilities.

## Accessibility Roles
Define what type of element it is:

```jsx
// Common roles
<TouchableOpacity accessible={true} accessibilityRole="button">
  <Text>Press Me</Text>
</TouchableOpacity>

<Text accessibilityRole="header">Page Title</Text>

<Image accessibilityRole="image" />
```

**Common Roles:**
- `button` - Pressable buttons
- `header` - Section headers
- `link` - Navigational links
- `image` - Images
- `text` - Static text
- `switch` - Toggle switches
- `checkbox` - Checkboxes
- `radio` - Radio buttons
- `menu` - Menus
- `menuitem` - Menu items

## Accessibility States
Describe the current state of an element:

```jsx
<TouchableOpacity
  accessibilityRole="button"
  accessibilityState={{
    disabled: isDisabled,
    selected: isSelected,
    checked: isChecked,
    busy: isLoading
  }}
>
  <Text>Submit</Text>
</TouchableOpacity>
```

**Available States:**
- `disabled` (boolean) - Element is disabled
- `selected` (boolean) - Element is selected
- `checked` (boolean | 'mixed') - Checkbox/radio state
- `busy` (boolean) - Element is loading/busy
- `expanded` (boolean) - Expandable element is expanded


## Labels & Hints

```jsx
// Label: What the element is
<TouchableOpacity
  accessibilityLabel="Add to cart"
  accessibilityHint="Adds item to your shopping cart"
>
  <Icon name="cart" />
</TouchableOpacity>

// For images
<Image
  source={require('./profile.jpg')}
  accessibilityLabel="User profile picture"
/>
```

## Best Practices
- Always provide `accessibilityLabel` for non-text elements
- Use `accessibilityHint` to explain what happens on interaction
- Set appropriate `accessibilityRole` for all interactive elements
- Update `accessibilityState` when element state changes
- Test with screen readers (TalkBack on Android, VoiceOver on iOS)

## Example: Complete Button

```jsx
<TouchableOpacity
  accessible={true}
  accessibilityRole="button"
  accessibilityLabel="Delete item"
  accessibilityHint="Removes this item from your list"
  accessibilityState={{ disabled: isDeleting }}
  onPress={handleDelete}
>
  <Icon name="trash" />
</TouchableOpacity>
```