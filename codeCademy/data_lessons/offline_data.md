# Offline-First Data Patterns
An offline-first pattern prioritizes local data availability over network requests. We should load cached data first to provide instant app responsiveness, then attempt network requests in the background to update that data when possible.

Implementing a simple offline-first pattern involves four key steps:
1. **load data from local storage immediately** - This provides instant app responsiveness by showing cached content immediately, even before attempting network requests. For storing data locally, we can use `AsyncStorage` for simple key-value storage, or local databases like `SQLite (expo-sqlite)` for complex relational data.
2. **attempt network requests in the background** - This background fetch happens after displaying cached data, so users don’t experience loading delays. If the network fails, the app continues working with existing cached content.
3. **save successful API responses locally for future offline access** - This ensures that even if users go offline later, they’ll still have recent data available.
4. **queue user actions when offline and process them when connectivity returns** - This prevents users from losing their work and ensures actions are eventually completed when they’re back online.

```tsx
/**
 * Offline-first data loading pattern
 * 1. Load cached data immediately for instant responsiveness
 * 2. Attempt network request in background (only if online)
 * 3. Save fresh data for future offline access
 */
export const loadData = async (isOffline = false): Promise<DataResult> => {
  try {
    // First, try to load cached data
   const cachedData = await getCache('student_reports');
    
    // If we're in offline mode, only use cached data
    if (isOffline) {
      if (cachedData && cachedData.students) {
        return {
          students: cachedData.students,
          source: 'cache',
          message: `Offline mode: Loaded ${cachedData.students.length} cached reports`
        };
      } else {
        throw new Error('No cached data available in offline mode');
      }
    }
    
    // If we have cached data, return it immediately while fetching fresh data
    if (cachedData && cachedData.students) {
      try {
        
        // Attempt network request in background
        const response = await fetchWithRetry(API_URL)

        const freshData = await response.json();
        
        if (freshData.status === 'success' && freshData.data?.students) {
          
          // Save fresh data to cache
          await createCache('student_repors', freshData, 15)
          
          return {
            students: freshData.data.students,
            source: 'network',
            message: `Updated with ${freshData.data.students.length} fresh reports`
          };
        }
      } catch (networkError) {
        // Network failed, return cached data
        return {
          students: cachedData.students,
          source: 'cache',
          message: `Network unavailable: Using ${cachedData.students.length} cached reports`
        };
      }
      
      // If we get here, we have cached data but couldn't get fresh data
      return {
        students: cachedData.students,
        source: 'cache',
        message: `Loaded ${cachedData.students.length} cached reports`
      };
    }
    
    // No cached data available, must fetch from network (online only)
    const response = await fetchWithRetry(API_URL);
    const freshData = await response.json();
    
    if (freshData.status === 'success' && freshData.data?.students) {
      // Save fresh data to cache for future offline access
      await createCache('student_reports', freshData.data, 15);
      
      return {
        students: freshData.data.students,
        source: 'network',
        message: `Fetched ${freshData.data.students.length} fresh reports and cached them`
      };
    }
    
    throw new Error('Invalid API response format');
    
  } catch (error) {
    throw error;
  }
};
```