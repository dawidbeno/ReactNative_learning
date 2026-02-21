# User-Initiated Data Refreshing
React Native provides the `<RefreshControl>` (imported from react-native) component for implementing pull-to-refresh functionality. `<RefreshControl>` wraps scrollable views like `<FlatList>` with native pull-to-refresh behavior.
The basic syntax requires two essential props: 
- `refreshing` controls the loading spinner state
- `onRefresh` defines the callback function when users pull to refresh
- Additional props like `colors` (Android) and `tintColor` (iOS) customize the visual appearance of the refresh indicator:
```tsx
<FlatList
  data={data}
  renderItem={renderItem}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={handleRefresh}
      colors={['#007AFF']}
      tintColor="#007AFF"
    />
  }
/>
```
This code wraps our `<FlatList>` with `<RefreshControl>`, enabling users to pull down and trigger the `handleRefresh` function. The `refreshing` state manages the spinning indicator, while the color props ensure consistent branding across platforms.

