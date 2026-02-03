import { useState } from 'react';
import { IceCreamFlavor } from '../types/IceCreamFlavor';
import { fetchIceCreamFlavors, loadFromCache, clearCachedData } from '../services/dataService';

export const useIceCreamData = () => {
  const [flavors, setFlavors] = useState<IceCreamFlavor[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastFetch, setLastFetch] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'cache' | 'network'>('cache');
  const [message, setMessage] = useState<string | null>(null);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  /**
   * Implements offline-first pattern:
   * 1. Load cached data immediately
   * 2. Attempt network request in background
   * 3. Fall back to cache if network fails
   */
  const fetchFlavors = async () => {
    setLoading(true);
    setMessage(null);
    
    try {
      const result = await fetchIceCreamFlavors();
      
      setFlavors(result.data);
      setDataSource(result.source);
      setLastFetch(result.timestamp);
      
      if (result.source === 'network') {
        showMessage(`Fetched ${result.data.length} fresh flavors`);
      } else {
        showMessage(`Loaded ${result.data.length} cached flavors`);
      }
    } catch (error) {
      // Network failed, try to load from cache as fallback
      try {
        const cachedResult = await loadFromCache();
        setFlavors(cachedResult.data);
        setDataSource('cache');
        setLastFetch(cachedResult.timestamp);
        showMessage('Network failed, showing cached data');
      } catch (cacheError) {
        showMessage('Network failed and no cached data available');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadFromStorage = async () => {
    setMessage(null);
    
    try {
      const result = await loadFromCache();
      setFlavors(result.data);
      setDataSource('cache');
      setLastFetch(result.timestamp);
      showMessage(`Loaded ${result.data.length} cached flavors`);
    } catch {
      showMessage('No cached data found');
    }
  };

  const clearDisplay = () => {
    setFlavors([]);
    setLastFetch(null);
    setDataSource('cache');
    setMessage(null);
    showMessage('Display cleared');
  };

  const clearStorage = async () => {
    setMessage(null);
    
    try {
      await clearCachedData();
      showMessage('Storage cleared');
    } catch {
      showMessage('Failed to clear storage');
    }
  };

  return {
    flavors,
    loading,
    lastFetch,
    dataSource,
    message,
    fetchFlavors,
    loadFromStorage,
    clearDisplay,
    clearStorage,
  };
};