/**
 * Storage Service Class
 * Follows Single Responsibility Principle (SRP) and Dependency Inversion Principle (DIP)
 * Handles all localStorage operations with error handling
 */
export class StorageService {
  constructor() {
    this.isAvailable = this.checkAvailability();
  }

  /**
   * Check if localStorage is available
   * @returns {boolean}
   */
  checkAvailability() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Get item from localStorage with error handling
   * @param {string} key 
   * @param {any} defaultValue 
   * @returns {any}
   */
  getItem(key, defaultValue = null) {
    if (!this.isAvailable) return defaultValue;
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error(`Error getting ${key} from localStorage:`, e);
      return defaultValue;
    }
  }

  /**
   * Set item in localStorage with error handling
   * @param {string} key 
   * @param {any} value 
   * @returns {boolean} Success status
   */
  setItem(key, value) {
    if (!this.isAvailable) return false;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Error setting ${key} in localStorage:`, e);
      return false;
    }
  }

  /**
   * Remove item from localStorage
   * @param {string} key 
   * @returns {boolean} Success status
   */
  removeItem(key) {
    if (!this.isAvailable) return false;
    
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error(`Error removing ${key} from localStorage:`, e);
      return false;
    }
  }

  /**
   * Clear all localStorage data
   * @returns {boolean} Success status
   */
  clear() {
    if (!this.isAvailable) return false;
    
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error('Error clearing localStorage:', e);
      return false;
    }
  }
}
