/**
 * Notification Service Class
 * Follows Observer Pattern and Single Responsibility Principle (SRP)
 * Manages all notification-related functionality
 */
export class NotificationService {
  constructor() {
    this.observers = [];
  }

  /**
   * Subscribe to notifications
   * @param {Function} callback 
   */
  subscribe(callback) {
    this.observers.push(callback);
  }

  /**
   * Unsubscribe from notifications
   * @param {Function} callback 
   */
  unsubscribe(callback) {
    this.observers = this.observers.filter(obs => obs !== callback);
  }

  /**
   * Notify all observers
   * @param {Object} notification 
   */
  notify(notification) {
    this.observers.forEach(callback => callback(notification));
  }

  /**
   * Show success notification
   * @param {string} message 
   * @param {number} duration 
   */
  success(message, duration = 3000) {
    this.notify({
      type: 'success',
      message,
      duration,
      timestamp: Date.now()
    });
  }

  /**
   * Show error notification
   * @param {string} message 
   * @param {number} duration 
   */
  error(message, duration = 5000) {
    this.notify({
      type: 'error',
      message,
      duration,
      timestamp: Date.now()
    });
  }

  /**
   * Show info notification
   * @param {string} message 
   * @param {number} duration 
   */
  info(message, duration = 3000) {
    this.notify({
      type: 'info',
      message,
      duration,
      timestamp: Date.now()
    });
  }

  /**
   * Show warning notification
   * @param {string} message 
   * @param {number} duration 
   */
  warning(message, duration = 4000) {
    this.notify({
      type: 'warning',
      message,
      duration,
      timestamp: Date.now()
    });
  }
}
