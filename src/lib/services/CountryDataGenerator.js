/**
 * Country Data Generator Service
 * Provides authentic, country-specific data generation for all supported countries
 * Follows Single Responsibility Principle (SRP) and Factory Pattern
 */

import {
  getEnhancedData,
  getRandomItem,
  generatePostalCode
} from '../config/countries.js';

export class CountryDataGenerator {
  constructor() {
    // Enhanced countries that have comprehensive data
    this.enhancedCountries = [
      'usa', 'canada', 'uk', 'australia', 'japan', 'south-korea',
      'singapore', 'thailand', 'vietnam', 'malaysia', 'indonesia'
    ];
  }
  /**
   * Generate authentic name data for a specific country
   * @param {string} countryCode 
   * @param {string} gender 
   * @returns {Object}
   */
  generateName(countryCode, gender = null) {
    const data = getEnhancedData(countryCode);
    if (!data) return null;

    // Determine gender if not provided
    if (!gender) {
      gender = Math.random() > 0.5 ? 'male' : 'female';
    }

    let firstName, lastName, culturalGroup = 'default';

    switch (countryCode) {
      case 'usa':
        // For USA, use diverse naming patterns
        firstName = this.generateAmericanFirstName(gender);
        lastName = this.generateAmericanLastName();
        break;

      case 'canada':
        // Similar to USA but with some French influence
        firstName = this.generateCanadianFirstName(gender);
        lastName = this.generateCanadianLastName();
        break;

      case 'uk':
        firstName = this.generateBritishFirstName(gender);
        lastName = this.generateBritishLastName();
        break;

      case 'australia':
        firstName = this.generateAustralianFirstName(gender);
        lastName = this.generateAustralianLastName();
        break;

      case 'japan':
        firstName = getRandomItem(data.maleNames.concat(data.femaleNames));
        lastName = getRandomItem(data.surnames);
        culturalGroup = 'japanese';
        break;

      case 'south-korea':
        firstName = getRandomItem(gender === 'male' ? data.maleNames : data.femaleNames);
        lastName = getRandomItem(data.surnames);
        culturalGroup = 'korean';
        break;

      case 'singapore':
        // Singapore has diverse ethnic groups
        const ethnicity = this.selectEthnicGroup(data.ethnicGroups);
        firstName = this.generateSingaporeanFirstName(gender, ethnicity);
        lastName = getRandomItem(data.ethnicGroups[ethnicity].surnames);
        culturalGroup = ethnicity;
        break;

      case 'thailand':
        firstName = getRandomItem(data.names[gender] || data.names.male);
        lastName = getRandomItem(data.surnames);
        culturalGroup = 'thai';
        break;

      case 'vietnam':
        firstName = getRandomItem(data.names[gender] || data.names.male);
        lastName = getRandomItem(data.surnames);
        culturalGroup = 'vietnamese';
        break;

      case 'malaysia':
        // Malaysia has diverse ethnic groups
        const malayEthnicity = this.selectEthnicGroup(data.ethnicGroups);
        firstName = this.generateMalaysianFirstName(gender, malayEthnicity);
        lastName = getRandomItem(data.ethnicGroups[malayEthnicity].surnames);
        culturalGroup = malayEthnicity;
        break;

      case 'indonesia':
        firstName = getRandomItem(data.names[gender] || data.names.male);
        lastName = getRandomItem(data.surnames);
        culturalGroup = 'indonesian';
        break;

      default:
        return null;
    }

    return {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      gender,
      culturalGroup
    };
  }
  /**
   * Generate authentic address data for a specific country
   * @param {string} countryCode 
   * @returns {Object}
   */
  generateAddress(countryCode) {
    const data = getEnhancedData(countryCode);
    if (!data) return null;

    let street, city, state, zipCode, country;

    switch (countryCode) {
      case 'usa':
        const usState = getRandomItem(data.states);
        city = getRandomItem(usState.cities);
        state = usState.name;
        street = this.generateStreetAddress(data.streetSuffixes);
        zipCode = generatePostalCode('usa');
        country = 'United States';
        break;

      case 'canada':
        const caProvince = getRandomItem(data.provinces);
        city = getRandomItem(caProvince.cities);
        state = caProvince.name;
        street = this.generateStreetAddress(['Street', 'Avenue', 'Drive', 'Road']);
        zipCode = generatePostalCode('canada');
        country = 'Canada';
        break;

      case 'uk':
        const ukCountry = getRandomItem(data.countries);
        city = getRandomItem(ukCountry.cities);
        state = ukCountry.name;
        street = this.generateBritishStreetAddress();
        zipCode = generatePostalCode('uk');
        country = 'United Kingdom';
        break;

      case 'australia':
        const auState = getRandomItem(data.states);
        city = getRandomItem(auState.cities);
        state = auState.name;
        street = this.generateStreetAddress(['Street', 'Avenue', 'Drive', 'Road', 'Close', 'Court']);
        zipCode = generatePostalCode('australia', auState.abbr);
        country = 'Australia';
        break;

      case 'japan':
        const jpPrefecture = getRandomItem(data.prefectures);
        city = getRandomItem(jpPrefecture.cities);
        state = jpPrefecture.name;
        street = this.generateJapaneseStreetAddress();
        zipCode = this.generateJapanesePostalCode();
        country = 'Japan';
        break;

      case 'south-korea':
        const krProvince = getRandomItem(data.provinces);
        city = getRandomItem(krProvince.cities);
        state = krProvince.name;
        street = this.generateKoreanStreetAddress();
        zipCode = String(Math.floor(Math.random() * 90000) + 10000);
        country = 'South Korea';
        break;

      case 'singapore':
        city = getRandomItem(data.districts);
        state = 'Singapore';
        street = this.generateSingaporeanStreetAddress();
        zipCode = String(Math.floor(Math.random() * 900000) + 100000);
        country = 'Singapore';
        break;

      case 'thailand':
        const thProvince = getRandomItem(data.provinces);
        city = getRandomItem(thProvince.cities);
        state = thProvince.name;
        street = this.generateThaiStreetAddress();
        zipCode = String(Math.floor(Math.random() * 90000) + 10000);
        country = 'Thailand';
        break;

      case 'vietnam':
        const vnProvince = getRandomItem(data.provinces);
        city = getRandomItem(vnProvince.cities);
        state = vnProvince.name;
        street = this.generateVietnameseStreetAddress();
        zipCode = String(Math.floor(Math.random() * 900000) + 100000);
        country = 'Vietnam';
        break;

      case 'malaysia':
        const myState = getRandomItem(data.states);
        city = getRandomItem(myState.cities);
        state = myState.name;
        street = this.generateMalaysianStreetAddress();
        zipCode = String(Math.floor(Math.random() * 90000) + 10000);
        country = 'Malaysia';
        break;

      case 'indonesia':
        const idProvince = getRandomItem(data.provinces);
        city = getRandomItem(idProvince.cities);
        state = idProvince.name;
        street = this.generateIndonesianStreetAddress();
        zipCode = String(Math.floor(Math.random() * 90000) + 10000);
        country = 'Indonesia';
        break;

      default:
        return null;
    }

    return {
      street,
      city,
      state,
      zipCode,
      country,
      coordinates: this.generateCountryCoordinates(countryCode)
    };
  }
  /**
   * Generate job data with authentic companies for a specific country
   * @param {string} countryCode 
   * @returns {Object}
   */
  generateJob(countryCode) {
    const data = getEnhancedData(countryCode);
    if (!data || !data.companies) return null;

    const company = getRandomItem(data.companies);
    const titles = this.getJobTitlesForCountry(countryCode);
    const departments = this.getDepartmentsForCountry(countryCode);

    return {
      title: getRandomItem(titles),
      company,
      department: getRandomItem(departments)
    };
  }

  /**
   * Generate bio data with country-specific context
   * @param {string} countryCode 
   * @param {Object} nameData 
   * @param {Object} addressData 
   * @returns {string}
   */
  generateBio(countryCode, nameData, addressData) {
    const templates = this.getBioTemplatesForCountry(countryCode);
    const template = getRandomItem(templates);
    
    return template
      .replace('{firstName}', nameData.firstName)
      .replace('{city}', addressData.city)
      .replace('{state}', addressData.state)
      .replace('{country}', addressData.country);
  }

  // Helper methods for name generation
  generateAmericanFirstName(gender) {
    const maleNames = ['James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher'];
    const femaleNames = ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'];
    return getRandomItem(gender === 'male' ? maleNames : femaleNames);
  }

  generateAmericanLastName() {
    const surnames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    return getRandomItem(surnames);
  }

  generateCanadianFirstName(gender) {
    const maleNames = ['Liam', 'Noah', 'William', 'James', 'Oliver', 'Benjamin', 'Elijah', 'Lucas', 'Mason', 'Logan'];
    const femaleNames = ['Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Charlotte', 'Mia', 'Amelia', 'Harper', 'Evelyn'];
    return getRandomItem(gender === 'male' ? maleNames : femaleNames);
  }

  generateCanadianLastName() {
    const surnames = ['Smith', 'Brown', 'Tremblay', 'Martin', 'Roy', 'Wilson', 'MacDonald', 'Taylor', 'Johnson', 'Anderson'];
    return getRandomItem(surnames);
  }

  generateBritishFirstName(gender) {
    const maleNames = ['Oliver', 'George', 'Harry', 'Jack', 'Jacob', 'Noah', 'Charlie', 'Muhammad', 'Thomas', 'Oscar'];
    const femaleNames = ['Olivia', 'Amelia', 'Isla', 'Ava', 'Mia', 'Isabella', 'Sophia', 'Grace', 'Lily', 'Freya'];
    return getRandomItem(gender === 'male' ? maleNames : femaleNames);
  }

  generateBritishLastName() {
    const surnames = ['Smith', 'Jones', 'Taylor', 'Brown', 'Williams', 'Wilson', 'Johnson', 'Davies', 'Robinson', 'Wright'];
    return getRandomItem(surnames);
  }

  generateAustralianFirstName(gender) {
    const maleNames = ['Oliver', 'William', 'Jack', 'Noah', 'Thomas', 'James', 'Lucas', 'Henry', 'Mason', 'Ethan'];
    const femaleNames = ['Charlotte', 'Olivia', 'Amelia', 'Isla', 'Mia', 'Grace', 'Ava', 'Ella', 'Zoe', 'Sophie'];
    return getRandomItem(gender === 'male' ? maleNames : femaleNames);
  }

  generateAustralianLastName() {
    const surnames = ['Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Johnson', 'White', 'Martin', 'Anderson'];
    return getRandomItem(surnames);
  }

  generateSingaporeanFirstName(gender, ethnicity) {
    const names = {
      chinese: {
        male: ['Wei Ming', 'Jun Hao', 'Kai Ming', 'Zhi Wei', 'Jia Jun'],
        female: ['Li Ying', 'Xin Yi', 'Hui Min', 'Jia Yi', 'Mei Lin']
      },
      malay: {
        male: ['Ahmad', 'Muhammad', 'Hafiz', 'Rizki', 'Faizal'],
        female: ['Siti', 'Nur', 'Aishah', 'Fatimah', 'Nadia']
      },
      indian: {
        male: ['Arjun', 'Karthik', 'Ravi', 'Suresh', 'Dinesh'],
        female: ['Priya', 'Meera', 'Kavitha', 'Deepa', 'Shanti']
      },
      others: {
        male: ['David', 'Michael', 'John', 'Andrew', 'Daniel'],
        female: ['Sarah', 'Michelle', 'Jessica', 'Amanda', 'Rachel']
      }
    };
    return getRandomItem(names[ethnicity]?.[gender] || names.others[gender]);
  }

  generateMalaysianFirstName(gender, ethnicity) {
    const names = {
      malay: {
        male: ['Ahmad', 'Muhammad', 'Abdul', 'Mohd', 'Ali'],
        female: ['Siti', 'Nur', 'Aishah', 'Fatimah', 'Noraini']
      },
      chinese: {
        male: ['Wei Liang', 'Jun Wei', 'Kai Yang', 'Zhi Hao', 'Jian Ming'],
        female: ['Li Wen', 'Xin Yu', 'Hui Ling', 'Jia Ling', 'Mei Hui']
      },
      indian: {
        male: ['Suresh', 'Ravi', 'Kumar', 'Raj', 'Vimal'],
        female: ['Priya', 'Kavitha', 'Shanti', 'Meera', 'Devi']
      }
    };
    return getRandomItem(names[ethnicity]?.[gender] || names.malay[gender]);
  }

  // Helper methods for address generation
  generateStreetAddress(suffixes) {
    const number = Math.floor(Math.random() * 9999) + 1;
    const streetNames = ['Main', 'Oak', 'Pine', 'Maple', 'Cedar', 'Elm', 'Washington', 'Park', 'Lincoln', 'First'];
    const streetName = getRandomItem(streetNames);
    const suffix = getRandomItem(suffixes);
    return `${number} ${streetName} ${suffix}`;
  }

  generateBritishStreetAddress() {
    const number = Math.floor(Math.random() * 999) + 1;
    const streetNames = ['High', 'Church', 'Main', 'Park', 'Victoria', 'King', 'Queen', 'Mill', 'Station', 'School'];
    const suffixes = ['Street', 'Road', 'Lane', 'Avenue', 'Close', 'Gardens', 'Way', 'Drive'];
    return `${number} ${getRandomItem(streetNames)} ${getRandomItem(suffixes)}`;
  }

  generateJapaneseStreetAddress() {
    const ward = Math.floor(Math.random() * 23) + 1;
    const block = Math.floor(Math.random() * 10) + 1;
    const building = Math.floor(Math.random() * 20) + 1;
    return `${ward}-${block}-${building}`;
  }

  generateKoreanStreetAddress() {
    const dong = Math.floor(Math.random() * 999) + 1;
    const ho = Math.floor(Math.random() * 999) + 1;
    const districts = ['Gangnam-gu', 'Jongno-gu', 'Jung-gu', 'Mapo-gu', 'Seocho-gu'];
    return `${dong}-${ho}, ${getRandomItem(districts)}`;
  }

  generateSingaporeanStreetAddress() {
    const block = Math.floor(Math.random() * 999) + 1;
    const unit = Math.floor(Math.random() * 99) + 1;
    const streetNames = ['Orchard', 'Marina', 'Raffles', 'Sentosa', 'Clementi', 'Jurong', 'Tampines'];
    return `Blk ${block} ${getRandomItem(streetNames)} Avenue #${unit < 10 ? '0' + unit : unit}-${Math.floor(Math.random() * 99) + 1}`;
  }

  generateThaiStreetAddress() {
    const number = Math.floor(Math.random() * 999) + 1;
    const soi = Math.floor(Math.random() * 20) + 1;
    const roads = ['Sukhumvit', 'Silom', 'Sathorn', 'Ratchadaphisek', 'Phahonyothin'];
    return `${number} Soi ${soi}, ${getRandomItem(roads)} Road`;
  }

  generateVietnameseStreetAddress() {
    const number = Math.floor(Math.random() * 999) + 1;
    const streets = ['Nguyen Trai', 'Le Loi', 'Hai Ba Trung', 'Dong Khoi', 'Nguyen Hue'];
    return `${number} ${getRandomItem(streets)} Street`;
  }

  generateMalaysianStreetAddress() {
    const number = Math.floor(Math.random() * 999) + 1;
    const streets = ['Jalan Bukit Bintang', 'Jalan Ampang', 'Jalan Raja Chulan', 'Jalan Sultan', 'Jalan Tun Razak'];
    return `${number} ${getRandomItem(streets)}`;
  }

  generateIndonesianStreetAddress() {
    const number = Math.floor(Math.random() * 999) + 1;
    const streets = ['Jalan Sudirman', 'Jalan Thamrin', 'Jalan Gatot Subroto', 'Jalan Kuningan', 'Jalan Senayan'];
    return `${number} ${getRandomItem(streets)}`;
  }

  // Helper methods
  selectEthnicGroup(ethnicGroups) {
    const random = Math.random() * 100;
    let cumulative = 0;
    
    for (const [group, data] of Object.entries(ethnicGroups)) {
      cumulative += data.percentage;
      if (random <= cumulative) {
        return group;
      }
    }
    
    return Object.keys(ethnicGroups)[0]; // fallback
  }

  generateJapanesePostalCode() {
    const first = Math.floor(Math.random() * 900) + 100;
    const second = Math.floor(Math.random() * 9000) + 1000;
    return `${first}-${second}`;
  }

  generateCountryCoordinates(countryCode) {
    const coordinates = {
      usa: { lat: 39.8283, lng: -98.5795 },
      canada: { lat: 56.1304, lng: -106.3468 },
      uk: { lat: 55.3781, lng: -3.4360 },
      australia: { lat: -25.2744, lng: 133.7751 },
      japan: { lat: 36.2048, lng: 138.2529 },
      'south-korea': { lat: 35.9078, lng: 127.7669 },
      singapore: { lat: 1.3521, lng: 103.8198 },
      thailand: { lat: 15.8700, lng: 100.9925 },
      vietnam: { lat: 14.0583, lng: 108.2772 },
      malaysia: { lat: 4.2105, lng: 101.9758 },
      indonesia: { lat: -0.7893, lng: 113.9213 }
    };

    const baseCoord = coordinates[countryCode] || { lat: 0, lng: 0 };
    
    return {
      latitude: baseCoord.lat + (Math.random() - 0.5) * 10,
      longitude: baseCoord.lng + (Math.random() - 0.5) * 10
    };
  }

  getJobTitlesForCountry(countryCode) {
    const commonTitles = [
      'Software Engineer', 'Marketing Manager', 'Sales Representative', 'Data Analyst',
      'Product Manager', 'Customer Service Representative', 'Operations Manager',
      'Business Analyst', 'Project Manager', 'Financial Analyst'
    ];

    const countrySpecific = {
      japan: ['Salaryman', 'System Engineer', 'Office Lady', 'Section Chief'],
      'south-korea': ['Team Leader', 'Assistant Manager', 'Senior Developer', 'Marketing Specialist'],
      singapore: ['Regional Manager', 'Relationship Manager', 'Senior Consultant', 'Vice President'],
      thailand: ['Account Executive', 'Human Resources Officer', 'Export Manager', 'Tourism Coordinator'],
      vietnam: ['Operations Coordinator', 'Quality Assurance Engineer', 'Export Specialist', 'Branch Manager'],
      malaysia: ['Senior Executive', 'Assistant Manager', 'Customer Relations Officer', 'Business Development Manager'],
      indonesia: ['Supervisor', 'Coordinator', 'Senior Officer', 'Department Head']
    };

    return [...commonTitles, ...(countrySpecific[countryCode] || [])];
  }

  getDepartmentsForCountry(countryCode) {
    return [
      'Information Technology', 'Marketing', 'Sales', 'Human Resources',
      'Finance', 'Operations', 'Customer Service', 'Research and Development',
      'Administration', 'Legal', 'Supply Chain', 'Quality Assurance'
    ];
  }

  getBioTemplatesForCountry(countryCode) {
    const templates = [
      'A dedicated professional living in {city}, {state}. {firstName} enjoys exploring new opportunities and building meaningful connections.',
      '{firstName} is a passionate individual from {city} with a love for innovation and community engagement.',
      'Based in {city}, {firstName} brings enthusiasm and expertise to everything they do.',
      'A {state} native, {firstName} combines professional excellence with a commitment to personal growth.',
      '{firstName} calls {city} home and is known for their collaborative spirit and creative problem-solving.'
    ];

    return templates;
  }
}
