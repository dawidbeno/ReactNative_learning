# Route parameters
When building screens, we sometimes need to pass data between them. This follows a common pattern in web development: a summary page showing a list of items (like /products), and detail pages for individual items (like /products/123 where 123 is the product ID).

We can mimic this behavior in React Navigation by requiring a parameter in a screen. Suppose we have a “Products” screen and “Product” screen, where the “Product” screen needs an id parameter to render the specific product.

Now, when we navigate from the “Products” screen to the “Product” screen, we need to tell it which specific product to show. We do this by passing the product’s ID as a second argument:

```jsx
const navigation = useNavigation()
function viewProduct() {
  navigation.navigate("Product", { id: "1" })
}
```
In the example, we call navigation.navigate() with the screen name, "Product", and a second argument object containing the id property set to "1". When the user taps this button, they’ll navigate to the product screen and see details for the product with ID “1”.

On the “Product” screen, we need to know which product the user wants to see. We can get this information from the route object, which contains the ID that was passed from the previous screen:

```jsx
type ProductProps = NativeStackScreenProps<Record<string, { id: string }>>  // hard-coded type

function Product({ route }: ProductProps) {
  const productId = route.params.id
}
```

The route object can also be accessed through a hook like the navigation object using a hook called useRoute(). For example:
```jsx
import { useRoute } from "@react-navigation/native"

function Product() {
  const route = useRoute()
  const productId = route.params.id
  // rendering logic
}
```

To find an item in an array based on id
```jsx
const thought = thoughts.find(t => t.id === id);
```