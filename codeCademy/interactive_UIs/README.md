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

