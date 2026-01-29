# Pressable component

`<Button>` works well but is limited by its lack of customizability. To address this problem, the React Native team introduced a new core component called `<Pressable>`.

The `<Pressable>` component, like `<Button>`, allows us to run code when pressed via the onPress prop. Still, it also exposes additional access points like onPressIn and onPressOut, for more granular control of the pressing action.

## deprecated TouchableOpacity
Before `<Pressable>`, React Native used separate components for different touch interactions: `<TouchableOpacity>` (fades on press), `<TouchableHighlight>` (highlights on press), and `<TouchableWithoutFeedback>` (no visual feedback). `<Pressable>` was introduced in React Native 0.63 to unify these into a single component that handles all touch states through style functions and event callbacks. How convenient!


