import { IceCreamFlavor } from '../types/IceCreamFlavor';
import { createCache, getCache } from '../utils/cacheUtils';
import { fetchWithRetry } from '../utils/networkUtils';
import { getCacheKey, getTimestampKey } from '../constants/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://static-assets.codecademy.com/Courses/learn-react-native-v53/05-data/icecream-data.json';
const CACHE_KEY = getCacheKey('ice_cream_flavors');
const TIMESTAMP_KEY = getTimestampKey('last_fetch');

export interface DataResult {
  data: IceCreamFlavor[];
  source: 'cache' | 'network';
  timestamp: string | null;
}

/**
 * Fetches ice cream flavors with offline-first approach and retry logic
 * 1. Load cached data immediately for instant responsiveness
 * 2. Attempt network request with retry logic
 * 3. Save successful responses for future offline access
 */
export const fetchIceCreamFlavors = async (): Promise<DataResult> => {
  const cachedData = await getCache<IceCreamFlavor[]>(CACHE_KEY);
  const cachedTimestamp = await AsyncStorage.getItem(TIMESTAMP_KEY);
  
  if (cachedData) {
    const result: DataResult = {
      data: cachedData,
      source: 'cache',
      timestamp: cachedTimestamp ? new Date(cachedTimestamp).toLocaleString() : null
    };
    
    fetchAndUpdateCache();
    
    return result;
  }
  return await fetchFromNetwork();
};

/**
 * Fetches fresh data from network with retry logic and smart error handling
 */
const fetchFromNetwork = async (): Promise<DataResult> => {
  // Use fetchWithRetry for robust network requests

  
  if (!apiData.data || !apiData.data.flavors || !Array.isArray(apiData.data.flavors)) {
    throw new Error('Invalid API response format. Please try again.');
  }
  
  const cleanedFlavors = apiData.data.flavors.map((flavor: any) => ({
    id: String(flavor.id),
    name: String(flavor.name).replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim(),
    description: String(flavor.description),
    price: Number(flavor.price),
    category: String(flavor.category),
    image: String(flavor.image),
    rating: Number(flavor.rating),
    availability: Boolean(flavor.availability)
  }));
  
  await createCache(CACHE_KEY, cleanedFlavors);
  await AsyncStorage.setItem(TIMESTAMP_KEY, new Date().toISOString());
  
  return {
    data: cleanedFlavors,
    source: 'network',
    timestamp: new Date().toLocaleString()
  };
};

/**
 * Background network request to update cache (fire and forget)
 */
const fetchAndUpdateCache = async (): Promise<void> => {
  try {
    await fetchFromNetwork();
  } catch (error) {
    // Silently fail - cached data is already being used
  }
};

/**
 * Loads data from cache only (no network request)
 */
export const loadFromCache = async (): Promise<DataResult> => {

};

/**
 * Clears all cached data
 */
export const clearCachedData = async (): Promise<void> => {
  await AsyncStorage.removeItem(`cache:${CACHE_KEY}`);
  await AsyncStorage.removeItem(TIMESTAMP_KEY);
};