import { 
  getCountryConfig,
  getEnhancedData,
  getRandomItem,
  PHILIPPINES_MOBILE_PREFIXES,
  PHILIPPINES_AREA_CODES,
  getRandomPhilippineItem
} from '../config/countries.js';

/**
 * Phone Number Generator Service
 * Follows Strategy Pattern and Single Responsibility Principle (SRP)
 * Generates country-specific phone number formats
 */
export class PhoneNumberGenerator {
  constructor() {
    this.strategies = new Map();
    this.initializeStrategies();
  }

  /**
   * Initialize phone number generation strategies for different countries
   */
  initializeStrategies() {
    this.strategies.set('philippines', (region = 'Metro Manila') => {
      return this.generatePhilippinePhoneNumber(region);
    });

    this.strategies.set('usa', () => {
      const enhancedData = getEnhancedData('usa');
      const areaCode = enhancedData ? getRandomItem(enhancedData.phoneAreaCodes) : '555';
      const exchange = Math.floor(Math.random() * 900) + 100;
      const number = Math.floor(Math.random() * 9000) + 1000;
      return `+1 (${areaCode}) ${exchange}-${number}`;
    });

    this.strategies.set('canada', () => {
      const enhancedData = getEnhancedData('canada');
      const areaCode = enhancedData ? getRandomItem(enhancedData.phoneAreaCodes) : '416';
      const exchange = Math.floor(Math.random() * 900) + 100;
      const number = Math.floor(Math.random() * 9000) + 1000;
      return `+1 (${areaCode}) ${exchange}-${number}`;
    });

    this.strategies.set('uk', () => {
      const enhancedData = getEnhancedData('uk');
      const prefix = enhancedData ? getRandomItem(enhancedData.phoneAreaCodes) : '020';
      const number = Math.floor(Math.random() * 10000000) + 1000000;
      return `+44 ${prefix} ${number}`;
    });

    this.strategies.set('australia', () => {
      const enhancedData = getEnhancedData('australia');
      const areaCode = enhancedData ? getRandomItem(enhancedData.phoneAreaCodes) : '02';
      const number = Math.floor(Math.random() * 100000000) + 10000000;
      return `+61 ${areaCode} ${number}`;
    });

    this.strategies.set('japan', () => {
      const areaCode = Math.floor(Math.random() * 90) + 10;
      const exchange = Math.floor(Math.random() * 9000) + 1000;
      const number = Math.floor(Math.random() * 9000) + 1000;
      return `+81 ${areaCode}-${exchange}-${number}`;
    });

    this.strategies.set('south-korea', () => {
      const areaCode = Math.floor(Math.random() * 90) + 10;
      const exchange = Math.floor(Math.random() * 900) + 100;
      const number = Math.floor(Math.random() * 9000) + 1000;
      return `+82 ${areaCode}-${exchange}-${number}`;
    });

    this.strategies.set('singapore', () => {
      const prefix = Math.floor(Math.random() * 9) + 6;
      const number = Math.floor(Math.random() * 10000000) + 1000000;
      return `+65 ${prefix}${number}`;
    });

    this.strategies.set('thailand', () => {
      const areaCode = Math.floor(Math.random() * 90) + 10;
      const number = Math.floor(Math.random() * 1000000) + 100000;
      return `+66 ${areaCode} ${number}`;
    });

    this.strategies.set('vietnam', () => {
      const areaCode = Math.floor(Math.random() * 90) + 10;
      const number = Math.floor(Math.random() * 10000000) + 1000000;
      return `+84 ${areaCode} ${number}`;
    });

    this.strategies.set('malaysia', () => {
      const prefix = '1';
      const areaCode = Math.floor(Math.random() * 90) + 10;
      const number = Math.floor(Math.random() * 1000000) + 100000;
      return `+60 ${prefix}${areaCode} ${number}`;
    });

    this.strategies.set('indonesia', () => {
      const areaCode = Math.floor(Math.random() * 90) + 10;
      const number = Math.floor(Math.random() * 10000000) + 1000000;
      return `+62 ${areaCode} ${number}`;
    });
  }

  /**
   * Generate phone number for specified country
   * @param {string} countryCode 
   * @param {Object} options
   * @returns {string}
   */
  generate(countryCode, options = {}) {
    const strategy = this.strategies.get(countryCode);
    
    if (strategy) {
      return strategy(options.region);
    }
    
    // Fallback to international format
    return this.generateInternational();
  }

  /**
   * Generate authentic Filipino phone number (integrated)
   * @param {string} region - Philippine region
   * @returns {string}
   */
  generatePhilippinePhoneNumber(region = 'Metro Manila') {
    const isMobile = Math.random() > 0.3; // 70% chance mobile, 30% landline
    
    if (isMobile) {
      return this.generatePhilippineMobileNumber();
    } else {
      return this.generatePhilippineLandlineNumber(region);
    }
  }

  /**
   * Generate mobile number with authentic network prefix
   * @returns {string}
   */
  generatePhilippineMobileNumber() {
    const networks = Object.keys(PHILIPPINES_MOBILE_PREFIXES);
    const network = getRandomPhilippineItem(networks);
    const prefix = getRandomPhilippineItem(PHILIPPINES_MOBILE_PREFIXES[network]);
    
    // Generate last 7 digits
    const lastDigits = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
    
    return `+63 ${prefix.substring(1)} ${lastDigits.substring(0, 3)} ${lastDigits.substring(3)}`;
  }

  /**
   * Generate landline number with correct area code
   * @param {string} region 
   * @returns {string}
   */
  generatePhilippineLandlineNumber(region) {
    const areaCodes = PHILIPPINES_AREA_CODES[region] || PHILIPPINES_AREA_CODES['Metro Manila'];
    const areaCode = getRandomPhilippineItem(areaCodes);
    
    // Generate 7-digit local number
    const localNumber = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
    
    return `+63 ${areaCode} ${localNumber.substring(0, 3)} ${localNumber.substring(3)}`;
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
