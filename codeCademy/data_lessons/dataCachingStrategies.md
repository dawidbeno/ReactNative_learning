# Data caching
Imagine we’re building a news app where users frequently revisit the same articles. Without caching, every screen change triggers new API calls, leading to a poor user experience and unnecessary costs. Caching helps avoid these issues by storing data locally for quick access.

Caching temporarily stores frequently accessed data to improve app performance. We need caching for several critical reasons:
- **Intermittent connectivity**: Mobile users often lose connection in elevators, tunnels, or poor signal areas
- **Data usage costs**: Users on limited data plans benefit from reduced network requests
- **Performance**: Cached data loads instantly, creating smoother user experiences

## Cache entries with expiration
This creates a cache object containing our data and an expiration timestamp, then stores it with a “@cache:” prefix for easy identification. The cache would also know when it is “stale” based on the expiration time.
```tsx
const createCache = async (key, data, minutes = 30) => {
  const cacheEntry = {
    data,
    expires: Date.now() + (minutes * 60 * 1000)
  };
  await AsyncStorage.setItem(`@cache:${key}`, JSON.stringify(cacheEntry));
};
```

This code checks if cached data exists, parses it, and automatically removes expired entries. If the data is still fresh, it returns the cached information.
```tsx
const getCache = async (key) => {
  const cached = await AsyncStorage.getItem(`@cache:${key}`);
  if (!cached) return null;

  const entry = JSON.parse(cached);
  if (Date.now() > entry.expires) {
    await AsyncStorage.removeItem(`@cache:${key}`);
    return null;
  }

  return entry.data;
};
```
The key difference between cache and regular storage is the temporary nature and automatic cleanup. Cache is designed to be disposable; we can safely delete it without losing important user data, while storage persists critical information like user preferences permanently.