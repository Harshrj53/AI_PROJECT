import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage Keys
export const KEYS = {
    QUIZ_HISTORY: '@quiz_history',
    SUMMARY_NOTES: '@summary_notes',
    FULL_NOTES: '@full_notes',
    VIDEO_HISTORY: '@video_history',
    QUICK_NOTES: '@quick_notes',
    SEARCH_HISTORY: '@search_history',
};

/**
 * Save a new item to a specific list in AsyncStorage.
 * @param {string} key - Storage key.
 * @param {object} item - Item to save.
 */
export const saveItem = async (key, item) => {
    try {
        const existingData = await AsyncStorage.getItem(key);
        const parsedData = existingData ? JSON.parse(existingData) : [];

        // Add new item to the beginning
        const newData = [item, ...parsedData];

        await AsyncStorage.setItem(key, JSON.stringify(newData));
        return true;
    } catch (error) {
        console.error(`Error saving to ${key}:`, error);
        return false;
    }
};

/**
 * Retrieve all items for a specific key.
 * @param {string} key - Storage key.
 */
export const getItems = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error(`Error getting from ${key}:`, error);
        return [];
    }
};

/**
 * Overwrite the list for a specific key (used for deleting/updating).
 * @param {string} key 
 * @param {Array} items 
 */
export const storeItems = async (key, items) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(items));
    } catch (error) {
        console.error(`Error storing to ${key}:`, error);
    }
};

/**
 * Add an entry to the global search history.
 * @param {string} type - Module type (quiz, summary, etc.)
 * @param {string} query - The user input/topic.
 */
export const addToHistory = async (type, query) => {
    const historyItem = {
        id: Date.now().toString(),
        type,
        query,
        timestamp: new Date().toISOString(),
    };
    await saveItem(KEYS.SEARCH_HISTORY, historyItem);
};

/**
 * Clear all data for a specific key.
 */
export const clearKey = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error(`Error clearing ${key}:`, error);
    }
};

/**
 * Clear all app data (optional utility).
 */
export const clearAllData = async () => {
    try {
        const keys = Object.values(KEYS);
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error('Error clearing all data:', error);
    }
};
