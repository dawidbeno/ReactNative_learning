import AsyncStorage from '@react-native-async-storage/async-storage';



/**
 * Retrieves cached data if it exists and hasn't expired
 */
export const getCache = async (key: string) => {

};

/**
 * Removes a specific cache entry
 */
export const removeCache = async (key: string) => {
  await AsyncStorage.removeItem(`cache:${key}`);
};

/**
 * Clears all cache entries (those with 'cache:' prefix)
 */
export const clearAllCache = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const cacheKeys = keys.filter(key => key.startsWith('cache:'));
  await AsyncStorage.multiRemove(cacheKeys);
};