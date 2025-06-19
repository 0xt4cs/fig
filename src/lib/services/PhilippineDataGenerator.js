import { 
  PHILIPPINES_MOBILE_PREFIXES, 
  PHILIPPINES_AREA_CODES, 
  PHILIPPINES_ZIP_CODES,
  PHILIPPINES_STREET_NAMES,
  PHILIPPINES_COMMON_MAIDEN_NAMES,
  PHILIPPINES_REGIONAL_NAMES,
  PHILIPPINES_NICKNAMES,
  PHILIPPINES_SUBDIVISIONS,
  PHILIPPINES_BARANGAYS_BY_REGION,
  PHILIPPINES_COMPANY_SUFFIXES,
  PHILIPPINES_BUSINESS_NAMES,
  getRandomPhilippineItem,
  getRandomByRegion
} from '../config/philippines.js';

import { getCountryConfig } from '../config/countries.js';

/**
 * Enhanced Filipino Data Generator Service
 * Generates highly accurate and region-specific Filipino personal information
 * Follows Factory Pattern and Single Responsibility Principle
 */
export class PhilippineDataGenerator {
  constructor() {
    this.regions = [
      'Metro Manila',
      'Central Luzon', 
      'Central Visayas',
      'Davao Region',
      'Western Visayas',
      'Northern Mindanao',
      'CALABARZON',
      'Bicol Region'
    ];
  }

  /**
   * Generate authentic Filipino phone number
   * @param {string} region - Philippine region
   * @returns {string}
   */
  generatePhoneNumber(region = 'Metro Manila') {
    const isMobile = Math.random() > 0.3; // 70% chance mobile, 30% landline
    
    if (isMobile) {
      return this.generateMobileNumber();
    } else {
      return this.generateLandlineNumber(region);
    }
  }

  /**
   * Generate mobile number with authentic network prefix
   * @returns {string}
   */
  generateMobileNumber() {
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
  generateLandlineNumber(region) {
    const areaCodes = PHILIPPINES_AREA_CODES[region] || PHILIPPINES_AREA_CODES['Metro Manila'];
    const areaCode = getRandomPhilippineItem(areaCodes);
    
    // Generate 7-digit local number
    const localNumber = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
    
    return `+63 ${areaCode} ${localNumber.substring(0, 3)} ${localNumber.substring(3)}`;
  }

  /**
   * Generate authentic Filipino name with regional variation
   * @param {string} gender 
   * @param {string} region 
   * @returns {Object}
   */
  generateName(gender = null, region = 'Metro Manila') {
    const selectedGender = gender || (Math.random() > 0.5 ? 'male' : 'female');
    
    // Determine language/cultural group based on region
    let culturalGroup = 'tagalog'; // default
    if (region.includes('Visayas') || region.includes('Cebu')) {
      culturalGroup = Math.random() > 0.5 ? 'cebuano' : 'hiligaynon';
    } else if (region.includes('Ilocos') || region.includes('Northern')) {
      culturalGroup = 'ilocano';
    }

    const namePool = PHILIPPINES_REGIONAL_NAMES[culturalGroup] || PHILIPPINES_REGIONAL_NAMES.tagalog;
    const firstName = getRandomPhilippineItem(namePool[selectedGender]);
    const lastName = getRandomPhilippineItem(PHILIPPINES_COMMON_MAIDEN_NAMES);
    
    // 30% chance of having a middle name (mother's maiden name)
    const middleName = Math.random() > 0.7 ? getRandomPhilippineItem(PHILIPPINES_COMMON_MAIDEN_NAMES) : null;
    
    // 20% chance of having a nickname
    const nickname = Math.random() > 0.8 ? getRandomPhilippineItem(PHILIPPINES_NICKNAMES[selectedGender]) : null;

    const fullName = middleName 
      ? `${firstName} ${middleName} ${lastName}`
      : `${firstName} ${lastName}`;

    return {
      firstName,
      lastName,
      middleName,
      fullName,
      nickname,
      gender: selectedGender,
      culturalGroup
    };
  }

  /**
   * Generate authentic Filipino address with correct postal codes
   * @param {string} region 
   * @returns {Object}
   */
  generateAddress(region = 'Metro Manila') {
    const config = getCountryConfig('philippines');
    const cities = this.getCitiesByRegion(region);
    const city = getRandomPhilippineItem(cities);
    
    // Get authentic ZIP code for the city
    const zipCodes = PHILIPPINES_ZIP_CODES[city] || ['1000'];
    const zipCode = getRandomPhilippineItem(zipCodes);
    
    // Generate street address
    const street = this.generateStreetAddress();
    
    // Get region-specific barangay
    const barangay = getRandomByRegion(region, 'barangay') || 
                    getRandomPhilippineItem(PHILIPPINES_BARANGAYS_BY_REGION['Metro Manila']);
    
    // 15% chance of being in a subdivision
    const isSubdivision = Math.random() > 0.85;
    const subdivision = isSubdivision ? getRandomPhilippineItem(PHILIPPINES_SUBDIVISIONS) : null;

    return {
      street: subdivision ? `${street}, ${subdivision}` : street,
      barangay: `Brgy. ${barangay}`,
      city,
      state: this.getProvinceByRegion(region),
      country: 'Philippines',
      zipCode,
      region,
      subdivision,
      coordinates: this.getRegionCoordinates(region)
    };
  }

  /**
   * Generate realistic Filipino street address
   * @returns {string}
   */
  generateStreetAddress() {
    const streetNumber = Math.floor(Math.random() * 999) + 1;
    const streetTypes = ['Street', 'Avenue', 'Road', 'Lane', 'Drive', 'Boulevard'];
    const streetType = getRandomPhilippineItem(streetTypes);
    
    // Mix of different street name categories
    const nameCategories = Object.keys(PHILIPPINES_STREET_NAMES);
    const category = getRandomPhilippineItem(nameCategories);
    const streetName = getRandomPhilippineItem(PHILIPPINES_STREET_NAMES[category]);
    
    return `${streetNumber} ${streetName} ${streetType}`;
  }

  /**
   * Generate Filipino company/job information
   * @param {string} region 
   * @returns {Object}
   */
  generateJob(region = 'Metro Manila') {
    const jobTitles = this.getRegionalJobTitles(region);
    const title = getRandomPhilippineItem(jobTitles);
    
    const companies = this.getRegionalCompanies(region);
    const company = getRandomPhilippineItem(companies);
    
    const departments = [
      'Information Technology', 'Human Resources', 'Finance', 'Accounting', 'Marketing', 'Sales',
      'Operations', 'Customer Service', 'Business Development', 'Administration', 'Legal'
    ];
    
    return {
      title,
      company,
      department: getRandomPhilippineItem(departments)
    };
  }

  /**
   * Generate culturally authentic Filipino bio
   * @param {Object} nameData 
   * @param {string} region 
   * @returns {string}
   */
  generateBio(nameData, region) {
    const bioTemplates = [
      `A proud ${this.getRegionalIdentity(region)} who values family above all else. ${this.getRegionalActivity(region)} and loves spending time with loved ones during weekends.`,
      `Born and raised in ${region}, passionate about Filipino culture and traditions. Loves ${this.getRegionalFood(region)} and weekend trips to nearby provinces.`,
      `A hardworking Pinoy who enjoys basketball, loves watching PBA games, and never misses Sunday family gatherings in ${region}.`,
      `Filipino professional from ${region} who believes in 'kapamilya' spirit. Enjoys local festivals, street food, and helping the community.`,
      `Loves Filipino movies, OPM music, and celebrating holidays with extended family. ${this.getRegionalTradition(region)}.`,
      `A Filipino who enjoys jeepney rides, mall visits with friends, and trying different regional delicacies from ${region}.`,
      `Passionate about Philippine history and culture. Loves visiting historical sites around ${region} and supporting local businesses.`,
      `${nameData.nickname ? `Known as '${nameData.nickname}' to friends, ` : ''}values education and dreams of traveling around the beautiful islands of the Philippines.`,
      `Enjoys Filipino telenovelas, loves shopping at local markets in ${region}, and believes in 'bayanihan' spirit.`,
      `A proud Filipino from ${region} who loves celebrating fiestas, enjoys lechon during special occasions, and values respect for elders.`
    ];
    
    return getRandomPhilippineItem(bioTemplates);
  }

  // Helper methods for regional data

  getCitiesByRegion(region) {
    const regionalCities = {
      'Metro Manila': ['Manila', 'Quezon City', 'Makati', 'Pasig', 'Taguig', 'Caloocan', 'Parañaque', 'Las Piñas', 'Muntinlupa'],
      'Central Luzon': ['Angeles', 'San Fernando', 'Olongapo', 'Cabanatuan', 'Malolos', 'Meycauayan'],
      'Central Visayas': ['Cebu City', 'Mandaue', 'Lapu-Lapu', 'Talisay', 'Toledo'],
      'Davao Region': ['Davao City', 'Tagum', 'Panabo', 'Samal', 'Digos'],
      'Western Visayas': ['Iloilo City', 'Bacolod', 'Roxas', 'Kabankalan', 'Himamaylan'],
      'Northern Mindanao': ['Cagayan de Oro', 'Iligan', 'Malaybalay', 'Valencia', 'Gingoog']
    };
    
    return regionalCities[region] || regionalCities['Metro Manila'];
  }

  getProvinceByRegion(region) {
    const regionalProvinces = {
      'Metro Manila': 'Metro Manila',
      'Central Luzon': getRandomPhilippineItem(['Pampanga', 'Bulacan', 'Nueva Ecija', 'Tarlac', 'Zambales', 'Bataan', 'Aurora']),
      'Central Visayas': getRandomPhilippineItem(['Cebu', 'Bohol', 'Negros Oriental', 'Siquijor']),
      'Davao Region': getRandomPhilippineItem(['Davao del Sur', 'Davao del Norte', 'Davao Oriental', 'Compostela Valley']),
      'Western Visayas': getRandomPhilippineItem(['Iloilo', 'Negros Occidental', 'Capiz', 'Aklan', 'Antique', 'Guimaras']),
      'Northern Mindanao': getRandomPhilippineItem(['Misamis Oriental', 'Misamis Occidental', 'Bukidnon', 'Camiguin', 'Lanao del Norte'])
    };
    
    return regionalProvinces[region] || 'Metro Manila';
  }

  getRegionCoordinates(region) {
    const coordinates = {
      'Metro Manila': { latitude: 14.5995, longitude: 120.9842 },
      'Central Luzon': { latitude: 15.4817, longitude: 120.5979 },
      'Central Visayas': { latitude: 10.3157, longitude: 123.8854 },
      'Davao Region': { latitude: 7.1907, longitude: 125.4553 },
      'Western Visayas': { latitude: 10.7202, longitude: 122.5621 },
      'Northern Mindanao': { latitude: 8.4542, longitude: 124.6319 }
    };
    
    const baseCoord = coordinates[region] || coordinates['Metro Manila'];
    
    // Add small random variation
    return {
      latitude: baseCoord.latitude + (Math.random() - 0.5) * 0.5,
      longitude: baseCoord.longitude + (Math.random() - 0.5) * 0.5
    };
  }

  getRegionalJobTitles(region) {
    const baseTitles = [
      'Software Developer', 'Business Process Associate', 'Customer Service Representative', 'Sales Associate',
      'Marketing Specialist', 'Human Resources Officer', 'Accounting Clerk', 'Administrative Assistant',
      'Call Center Agent', 'Virtual Assistant', 'English Teacher', 'Nurse', 'Engineer'
    ];
    
    const regionalSpecialties = {
      'Metro Manila': ['IT Consultant', 'Financial Analyst', 'Digital Marketing Manager', 'Project Manager'],
      'Central Visayas': ['Tourism Officer', 'Hotel Manager', 'Resort Staff', 'Export Coordinator'],
      'Davao Region': ['Agricultural Engineer', 'Fruit Export Specialist', 'Plantation Manager'],
      'Western Visayas': ['Sugar Mill Supervisor', 'Marine Biologist', 'Fishery Technician'],
      'Northern Mindanao': ['Mining Engineer', 'Logistics Coordinator', 'Port Manager']
    };
    
    return [...baseTitles, ...(regionalSpecialties[region] || [])];
  }

  getRegionalCompanies(region) {
    const nationalCompanies = [
      'SM Investments Corporation', 'Ayala Corporation', 'JG Summit Holdings', 'BDO Unibank',
      'Jollibee Foods Corporation', 'Globe Telecom', 'PLDT', 'Metrobank', 'San Miguel Corporation'
    ];
    
    const regionalCompanies = {
      'Metro Manila': ['Robinsons Land Corporation', 'Megaworld Corporation', 'Alliance Global Group'],
      'Central Visayas': ['Cebu Pacific Air', 'Universal Robina Corporation', 'Gokongwei Brothers Foundation'],
      'Davao Region': ['Alsons Development & Investment Corp.', 'Davao Light & Power Company'],
      'Western Visayas': ['Central Azucarera Don Pedro', 'Victorias Milling Company'],
      'Northern Mindanao': ['Mindanao Portland Cement Corporation', 'Northern Mindanao Power Corporation']
    };
    
    return [...nationalCompanies, ...(regionalCompanies[region] || [])];
  }

  getRegionalIdentity(region) {
    const identities = {
      'Metro Manila': 'Manileño/Manileña',
      'Central Luzon': 'Kapampangan',
      'Central Visayas': 'Cebuano',
      'Davao Region': 'Davaoeño/Davaoeña',
      'Western Visayas': 'Ilonggo',
      'Northern Mindanao': 'Kagay-anon'
    };
    
    return identities[region] || 'Filipino';
  }

  getRegionalActivity(region) {
    const activities = {
      'Metro Manila': 'Enjoys mall hopping and trying different restaurants',
      'Central Luzon': 'Loves attending local festivals and food fairs',
      'Central Visayas': 'Enjoys beach hopping and island tours',
      'Davao Region': 'Loves exploring nature parks and fruit farms',
      'Western Visayas': 'Enjoys cultural festivals and seafood dining',
      'Northern Mindanao': 'Loves river rafting and mountain hiking'
    };
    
    return activities[region] || 'Enjoys local community activities';
  }

  getRegionalFood(region) {
    const foods = {
      'Metro Manila': 'sisig, lumpia, and halo-halo',
      'Central Luzon': 'lechon, morcon, and buro',
      'Central Visayas': 'lechon Cebu, dried mangoes, and sutukil',
      'Davao Region': 'durian, pomelo, and grilled tuna',
      'Western Visayas': 'La Paz batchoy, inasal, and piaya',
      'Northern Mindanao': 'sinuglaw, chicharon, and durian candies'
    };
    
    return foods[region] || 'adobo, sinigang, and kare-kare';
  }

  getRegionalTradition(region) {
    const traditions = {
      'Metro Manila': 'Participates in Black Nazarene processions and Flores de Mayo',
      'Central Luzon': 'Celebrates Giant Lantern Festival and Sinulog sa Kabataan',
      'Central Visayas': 'Actively joins Sinulog Festival and Kadaugan sa Mactan',
      'Davao Region': 'Celebrates Kadayawan Festival and Araw ng Dabaw',
      'Western Visayas': 'Participates in MassKara Festival and Dinagyang',
      'Northern Mindanao': 'Celebrates Higalaay Festival and Kaamulan'
    };
    
    return traditions[region] || 'Values traditional Filipino customs and celebrations';
  }
}
