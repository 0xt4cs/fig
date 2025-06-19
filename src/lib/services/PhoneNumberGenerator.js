import { PhilippineDataGenerator } from './PhilippineDataGenerator.js';

/**
 * Phone Number Generator Service
 * Follows Strategy Pattern and Single Responsibility Principle (SRP)
 * Generates country-specific phone number formats
 */
export class PhoneNumberGenerator {
  constructor() {
    this.strategies = new Map();
    this.philippineGenerator = new PhilippineDataGenerator();
    this.initializeStrategies();
  }

  /**
   * Initialize phone number generation strategies for different countries
   */
  initializeStrategies() {
    this.strategies.set('philippines', (region = 'Metro Manila') => {
      return this.philippineGenerator.generatePhoneNumber(region);
    });

    this.strategies.set('usa', () => {
      const areaCode = Math.floor(Math.random() * 900) + 100;
      const exchange = Math.floor(Math.random() * 900) + 100;
      const number = Math.floor(Math.random() * 9000) + 1000;
      return `+1 (${areaCode}) ${exchange}-${number}`;
    });

    this.strategies.set('canada', () => {
      const areaCode = Math.floor(Math.random() * 900) + 100;
      const exchange = Math.floor(Math.random() * 900) + 100;
      const number = Math.floor(Math.random() * 9000) + 1000;
      return `+1 (${areaCode}) ${exchange}-${number}`;
    });

    this.strategies.set('uk', () => {
      const prefix = Math.floor(Math.random() * 9000) + 1000;
      const suffix = Math.floor(Math.random() * 900000) + 100000;
      return `+44 ${prefix} ${suffix}`;
    });

    this.strategies.set('australia', () => {
      const prefix = Math.floor(Math.random() * 9) + 1;
      const middle = Math.floor(Math.random() * 9000) + 1000;
      const suffix = Math.floor(Math.random() * 9000) + 1000;
      return `+61 ${prefix} ${middle} ${suffix}`;
    });

    this.strategies.set('japan', () => {
      const area = Math.floor(Math.random() * 90) + 10;
      const exchange = Math.floor(Math.random() * 9000) + 1000;
      const number = Math.floor(Math.random() * 9000) + 1000;
      return `+81 ${area}-${exchange}-${number}`;
    });

    this.strategies.set('germany', () => {
      const area = Math.floor(Math.random() * 900) + 100;
      const number = Math.floor(Math.random() * 9000000) + 1000000;
      return `+49 ${area} ${number}`;
    });

    this.strategies.set('france', () => {
      const first = Math.floor(Math.random() * 9) + 1;
      const second = Math.floor(Math.random() * 90) + 10;
      const third = Math.floor(Math.random() * 90) + 10;
      const fourth = Math.floor(Math.random() * 90) + 10;
      const fifth = Math.floor(Math.random() * 90) + 10;
      return `+33 ${first} ${second} ${third} ${fourth} ${fifth}`;
    });

    this.strategies.set('italy', () => {
      const area = Math.floor(Math.random() * 900) + 100;
      const exchange = Math.floor(Math.random() * 900) + 100;
      const number = Math.floor(Math.random() * 9000) + 1000;
      return `+39 ${area} ${exchange} ${number}`;
    });

    this.strategies.set('spain', () => {
      const first = Math.floor(Math.random() * 900) + 100;
      const second = Math.floor(Math.random() * 900) + 100;
      const third = Math.floor(Math.random() * 900) + 100;
      return `+34 ${first} ${second} ${third}`;
    });

    this.strategies.set('brazil', () => {
      const area = Math.floor(Math.random() * 90) + 10;
      const prefix = Math.floor(Math.random() * 90000) + 10000;
      const suffix = Math.floor(Math.random() * 9000) + 1000;
      return `+55 (${area}) ${prefix}-${suffix}`;
    });

    this.strategies.set('mexico', () => {
      const area = Math.floor(Math.random() * 900) + 100;
      const exchange = Math.floor(Math.random() * 900) + 100;
      const number = Math.floor(Math.random() * 9000) + 1000;
      return `+52 (${area}) ${exchange}-${number}`;
    });

    this.strategies.set('india', () => {
      const prefix = Math.floor(Math.random() * 90000) + 10000;
      const suffix = Math.floor(Math.random() * 90000) + 10000;
      return `+91 ${prefix} ${suffix}`;
    });

    this.strategies.set('china', () => {
      const area = Math.floor(Math.random() * 900) + 100;
      const exchange = Math.floor(Math.random() * 9000) + 1000;
      const number = Math.floor(Math.random() * 9000) + 1000;
      return `+86 ${area} ${exchange} ${number}`;
    });

    this.strategies.set('southkorea', () => {
      const area = Math.floor(Math.random() * 90) + 10;
      const exchange = Math.floor(Math.random() * 9000) + 1000;
      const number = Math.floor(Math.random() * 9000) + 1000;
      return `+82 ${area}-${exchange}-${number}`;
    });

    this.strategies.set('thailand', () => {
      const area = Math.floor(Math.random() * 90) + 10;
      const exchange = Math.floor(Math.random() * 900) + 100;
      const number = Math.floor(Math.random() * 9000) + 1000;
      return `+66 ${area} ${exchange} ${number}`;
    });

    this.strategies.set('indonesia', () => {
      const area = Math.floor(Math.random() * 900) + 100;
      const exchange = Math.floor(Math.random() * 9000) + 1000;
      const number = Math.floor(Math.random() * 9000) + 1000;
      return `+62 ${area}-${exchange}-${number}`;
    });

    this.strategies.set('malaysia', () => {
      const area = Math.floor(Math.random() * 90) + 10;
      const exchange = Math.floor(Math.random() * 900) + 100;
      const number = Math.floor(Math.random() * 9000) + 1000;
      return `+60 ${area}-${exchange} ${number}`;
    });

    this.strategies.set('singapore', () => {
      const exchange = Math.floor(Math.random() * 9000) + 1000;
      const number = Math.floor(Math.random() * 9000) + 1000;
      return `+65 ${exchange} ${number}`;
    });

    this.strategies.set('vietnam', () => {
      const area = Math.floor(Math.random() * 900) + 100;
      const exchange = Math.floor(Math.random() * 900) + 100;
      const number = Math.floor(Math.random() * 9000) + 1000;
      return `+84 ${area} ${exchange} ${number}`;
    });
  }

  /**
   * Generate phone number for specific country
   * @param {string} countryCode 
   * @returns {string}
   */
  generate(countryCode) {
    const strategy = this.strategies.get(countryCode);
    if (strategy) {
      return strategy();
    }
    
    // Fallback to international format
    return this.generateInternational();
  }

  /**
   * Generate international phone number
   * @returns {string}
   */
  generateInternational() {
    const countryCode = Math.floor(Math.random() * 999) + 1;
    const number = Math.floor(Math.random() * 9000000000) + 1000000000;
    return `+${countryCode} ${number}`;
  }
}
