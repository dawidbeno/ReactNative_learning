# Async storage
When users open their favorite mobile apps, they expect them to remember login sessions, settings, and personal data between launches. This experience relies on local data persistence, storing important information directly on the device.

AsyncStorage is a simple, key-value storage system for 
React Native
Preview: Docs Loading link description
 applications to persist data locally on mobile devices. Now maintained by the React Native community as @react-native-async-storage/async-storage, it enables apps to maintain user sessions, store preferences, cache offline content, and preserve temporary data like form inputs or shopping cart contents between app launches.

AsyncStorage uses platform-specific implementations that handle underlying storage differences seamlessly. On Android, it utilizes SQLite to store key-value pairs in a structured database file, while iOS employs a two-tier system where small values under 1024 characters are serialized in a shared manifest.json file, and larger values are saved in separate files named using MD5 hashes. This asynchronous system prevents data operations from blocking the main thread, ensuring smooth, responsive interfaces.

For more complex storage needs, React Native and Expo provide complementary solutions. For sensitive data requiring encryption, expo-secure-store offers secure storage for passwords and tokens, while expo-sqlite provides full database functionality for structured data with complex queries. However, AsyncStorage remains the go-to solution for most mobile app data persistence needs, with important limitations: it’s not encrypted by default, has approximately 6MB total storage capacity, and individual items cannot exceed 2MB.

In the next few exercises, we’ll use AsyncStorage to implement data persistence patterns for our mobile applications.

## Setup
The `@` prefix distinguishes our app’s keys from system keys, following React Native best practices and preventing conflicts with other libraries.

For more complex applications, we need namespace keys to organize related data under logical groupings. A simple namespace example would be `@vehicles:toyota` or `@users:123`

Namespace keys are structured identifiers that combine a base key with specific identifiers. They work like folders on our computer, grouping related items together.
We need namespace keys because they prevent data collisions when storing multiple items of the same type.
Instead of having one massive object containing all vehicles, we can store each vehicle manufacturer separately. This makes it easier to update, delete, or retrieve specific items without affecting others. It also improves performance since we only load the data we actually need.

```tsx
// Centralized storage keys with @ prefix for React Native best practices
export const STORAGE_KEYS = {
  CACHE: '@cache',
  STUDENTS: '@students'
};
  
// Namespaced key generator for cache endpoints
export const getCacheKey = (cacheId: string): string => `${STORAGE_KEYS.CACHE}:${cacheId}`;
```

## Operations
Four commond AsyncStorage operations:

1. setItem() 
To store key-value pairs to the device:
```tsx
// key = @username, value = john_doe
await AsyncStorage.setItem('@username', 'john_doe');
```
NOTE:
However, AsyncStorage only stores strings, so we need to serialize complex data types like objects and arrays using `JSON.stringify()`:
```tsx
const userData = { id: 123, name: 'John Doe', theme: 'dark' };
await AsyncStorage.setItem('@user_data', JSON.stringify(userData));
```
Using `getCacheKey()` creates a namespaced key like `@cache:current_student`, which helps organize your storage and prevents conflicts with other parts of your app that might use similar key names.


2. getItem()
Returns the stored string value or null if the key doesn’t exist.
```tsx
const username = await AsyncStorage.getItem('@username');
// username will be 'john_doe' or null if not found
```
Since we used `JSON.stringify()` to store the object, we need to use `JSON.parse()` to convert it back when we retrieve it:
```tsx

const userDataString = await AsyncStorage.getItem('@user_data');
const userData = userDataString ? JSON.parse(userDataString) : null;
// userData will be the original object or null
```

3. removeItem()
Method to delete a key-value pair from storage permanently:
```tsx
await AsyncStorage.removeItem('@username');
```

4. getAllKeys()
We often need to see what’s stored in our app for debugging and maintenance purposes. The `getAllKeys()` operation returns an array of all stored keys in AsyncStorage:
```tsx
const keys = await AsyncStorage.getAllKeys();
console.log('All stored keys:', keys);
// Output: ['@username', '@user_data', '@vehicle_favorites']
```
