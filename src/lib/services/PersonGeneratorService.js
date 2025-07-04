import { faker } from '@faker-js/faker';
import { Person, Address, Coordinates, Job } from '../models/Person.js';
import { getCountryConfig } from '../config/countries.js';
import { PhoneNumberGenerator } from './PhoneNumberGenerator.js';
import { CountryDataGenerator } from './CountryDataGenerator.js';
import { generateFilipinoName, generateFilipinoAddress, generateFilipinoJob, generateFilipinoBio } from '../filipino-names.js';
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
} from '../config/countries.js';

/**
 * Person Generator Service Class
 * Follows Factory Pattern and Single Responsibility Principle (SRP)
 * Generates realistic person data based on country selection
 * Includes integrated Philippines data generation
 */
export class PersonGeneratorService {
  constructor() {
    this.phoneGenerator = new PhoneNumberGenerator();
    this.countryGenerator = new CountryDataGenerator();
    
    // Countries that have enhanced data generation
    this.enhancedCountries = [
      'usa', 'canada', 'uk', 'australia', 'japan', 'south-korea',
      'singapore', 'thailand', 'vietnam', 'malaysia', 'indonesia'
    ];

    // Philippine regions for enhanced data generation
    this.philippineRegions = [
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
   * Generate a complete person object with error handling
   * @param {string} countryCode 
   * @param {Object} options - Advanced generation options
   * @returns {Person}
   */
  generatePerson(countryCode = 'international', options = {}) {
    try {
      const config = getCountryConfig(countryCode);
      if (!config) {
        console.warn(`Country configuration not found for: ${countryCode}, using international`);
        countryCode = 'international';
      }

      const personData = {
        id: faker.string.uuid(),
        selectedCountry: countryCode,
        createdAt: new Date()
      };

      // Generate name and basic info with advanced options
      const nameData = this.generateNameData(countryCode, options);
      Object.assign(personData, nameData);

      // Generate contact information
      personData.email = faker.internet.email({ 
        firstName: personData.firstName, 
        lastName: personData.lastName 
      });
      personData.phone = this.phoneGenerator.generate(countryCode);
      personData.avatar = faker.image.avatar();
      
      // Generate personal details with advanced options
      personData.birthdate = this.generateBirthdate(options);
      personData.zodiacSign = faker.person.zodiacSign();
      personData.nationality = config?.nationality || 'International';

      // Generate address with location preferences
      personData.address = this.generateAddressData(countryCode, config, options);

      // Generate job with industry and experience preferences
      personData.job = this.generateJobData(countryCode, options);

      // Generate bio with context
      personData.bio = this.generateBioData(countryCode, nameData, personData.address);

      // Create and return Person instance
      const person = new Person(personData);
      
      // Validate the person data
      if (!this.validatePersonData(person)) {
        throw new Error('Generated person data is invalid');
      }

      return person;
    } catch (error) {
      console.error('Error generating person:', error);
      // Return a basic fallback person
      return this.generateFallbackPerson();
    }
  }

  /**
   * Generate a basic fallback person when errors occur
   * @returns {Person}
   */
  generateFallbackPerson() {
    return new Person({
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      fullName: faker.person.fullName(),
      gender: faker.person.gender(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      avatar: faker.image.avatar(),
      birthdate: faker.date.birthdate(),
      zodiacSign: faker.person.zodiacSign(),
      nationality: 'International',
      selectedCountry: 'international',
      address: new Address({
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: 'International',
        zipCode: faker.location.zipCode(),
        coordinates: new Coordinates({
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude()
        })
      }),
      job: new Job({
        title: faker.person.jobTitle(),
        company: faker.company.name(),
        department: faker.commerce.department()
      }),
      bio: faker.person.bio(),
      createdAt: new Date()
    });
  }

  /**
   * Generate multiple persons with advanced options
   * @param {number} count 
   * @param {string} countryCode 
   * @param {Object} options - Advanced generation options
   * @returns {Person[]}
   */
  generateMultiplePersons(count, countryCode = 'international', options = {}) {
    const persons = [];
    
    // Handle relationship generation
    if (options.relationship?.enabled && options.relationship.type !== 'individual') {
      return this.generateRelatedPersons(count, countryCode, options);
    }
    
    // Generate individual persons
    for (let i = 0; i < count; i++) {
      persons.push(this.generatePerson(countryCode, options));
    }
    return persons;
  }

  /**
   * Generate related persons (couples, families)
   * @param {number} count 
   * @param {string} countryCode 
   * @param {Object} options 
   * @returns {Person[]}
   */
  generateRelatedPersons(count, countryCode, options) {
    const persons = [];
    let remaining = count;
    
    while (remaining > 0) {
      if (options.relationship.type === 'couple' && remaining >= 2) {
        const couple = this.generateCouple(countryCode, options);
        persons.push(...couple);
        remaining -= 2;
      } else if (options.relationship.type === 'family' && remaining >= 3) {
        const familySize = Math.min(remaining, Math.floor(Math.random() * 3) + 3); // 3-5 members
        const family = this.generateFamily(familySize, countryCode, options);
        persons.push(...family);
        remaining -= familySize;
      } else {
        // Fill remaining with individual persons
        persons.push(this.generatePerson(countryCode, options));
        remaining--;
      }
    }
    
    return persons.slice(0, count);
  }

  /**
   * Generate a couple with shared characteristics
   * @param {string} countryCode 
   * @param {Object} options 
   * @returns {Person[]}
   */
  generateCouple(countryCode, options) {
    // Generate shared characteristics
    const sharedLastName = faker.person.lastName();
    const sharedAddress = this.generateAddressData(countryCode, getCountryConfig(countryCode), options);
    
    // Generate male partner
    const maleOptions = { ...options, gender: { preference: 'male', enabled: true } };
    const male = this.generatePerson(countryCode, maleOptions);
    male.lastName = sharedLastName;
    male.fullName = `${male.firstName} ${sharedLastName}`;
    male.address = sharedAddress;
    
    // Generate female partner
    const femaleOptions = { ...options, gender: { preference: 'female', enabled: true } };
    const female = this.generatePerson(countryCode, femaleOptions);
    female.lastName = sharedLastName;
    female.fullName = `${female.firstName} ${sharedLastName}`;
    female.address = sharedAddress;
    
    return [male, female];
  }

  /**
   * Generate a family with shared characteristics
   * @param {number} size 
   * @param {string} countryCode 
   * @param {Object} options 
   * @returns {Person[]}
   */
  generateFamily(size, countryCode, options) {
    const family = [];
    const familyLastName = faker.person.lastName();
    const familyAddress = this.generateAddressData(countryCode, getCountryConfig(countryCode), options);
    
    // Generate parents first
    const parents = this.generateCouple(countryCode, options);
    parents.forEach(parent => {
      parent.lastName = familyLastName;
      parent.fullName = `${parent.firstName} ${familyLastName}`;
      parent.address = familyAddress;
    });
    family.push(...parents);
    
    // Generate children
    const childrenCount = size - 2;
    for (let i = 0; i < childrenCount; i++) {
      const childOptions = {
        ...options,
        ageRange: { min: 5, max: 17, enabled: true }
      };
      const child = this.generatePerson(countryCode, childOptions);
      child.lastName = familyLastName;
      child.fullName = `${child.firstName} ${familyLastName}`;
      child.address = familyAddress;
      family.push(child);
    }
    
    return family;
  }  /**
   * Generate name data based on country with enhanced support for multiple countries
   * @param {string} countryCode 
   * @param {Object} options - Advanced generation options
   * @returns {Object}
   */
  generateNameData(countryCode, options = {}) {
    if (countryCode === 'philippines') {
      // Use enhanced Philippine data generator (integrated)
      const region = this.philippineRegions[Math.floor(Math.random() * this.philippineRegions.length)];
      const genderPreference = options.gender?.enabled ? options.gender.preference : null;
      const selectedGender = genderPreference === 'random' ? null : genderPreference;
      return this.generatePhilippineName(selectedGender, region);
    }

    if (this.enhancedCountries.includes(countryCode)) {
      // Use enhanced country data generator
      const nameData = this.countryGenerator.generateName(countryCode, options);
      if (nameData) {
        return nameData;
      }
    }

    // For other countries or fallback, use faker with gender preference
    let gender = faker.person.gender();
    if (options.gender?.enabled && options.gender.preference !== 'random') {
      if (options.gender.preference === 'non-binary') {
        gender = faker.helpers.arrayElement(['Non-binary', 'Genderfluid', 'Agender', 'Demi-boy', 'Demi-girl']);
      } else {
        gender = options.gender.preference;
      }
    }

    const firstName = faker.person.firstName(gender);
    const lastName = faker.person.lastName();

    return {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      gender,
      culturalGroup: 'international'
    };
  }

  /**
   * Generate birthdate with age range constraints
   * @param {Object} options - Advanced generation options
   * @returns {Date}
   */
  generateBirthdate(options = {}) {
    if (options.ageRange?.enabled) {
      const minAge = options.ageRange.min;
      const maxAge = options.ageRange.max;
      const currentYear = new Date().getFullYear();
      
      const minYear = currentYear - maxAge;
      const maxYear = currentYear - minAge;
      
      return faker.date.between({
        from: new Date(minYear, 0, 1),
        to: new Date(maxYear, 11, 31)
      });
    }
    
    return faker.date.birthdate();
  }  /**
   * Generate address data based on country with enhanced support for multiple countries
   * @param {string} countryCode 
   * @param {Object} config 
   * @param {Object} options - Advanced generation options
   * @returns {Address}
   */
  generateAddressData(countryCode, config, options = {}) {
    if (countryCode === 'philippines') {
      // Use enhanced Philippine data generator (integrated)
      const region = this.philippineRegions[Math.floor(Math.random() * this.philippineRegions.length)];
      const addressData = this.generatePhilippineAddress(region);
      
      return new Address({
        street: addressData.street,
        city: addressData.city,
        state: addressData.state,
        country: addressData.country,
        zipCode: addressData.zipCode,
        barangay: addressData.barangay,
        region: addressData.region,
        subdivision: addressData.subdivision,
        coordinates: new Coordinates(addressData.coordinates)
      });
    }

    if (this.enhancedCountries.includes(countryCode)) {
      // Use enhanced country data generator
      const addressData = this.countryGenerator.generateAddress(countryCode, options);
      if (addressData) {
        return new Address({
          street: addressData.street,
          city: addressData.city,
          state: addressData.state,
          country: addressData.country,
          zipCode: addressData.zipCode,
          coordinates: new Coordinates(addressData.coordinates)
        });
      }
    }

    // For other countries or fallback, use faker with country-specific coordinates
    // Apply location preferences if specified
    let city = faker.location.city();
    if (options.location?.enabled && options.location.urbanPreference !== 'random') {
      const locationTypes = {
        urban: ['Metropolitan', 'Downtown', 'City Center', 'Urban District'],
        suburban: ['Suburb', 'Residential Area', 'Parkside', 'Garden District'],
        rural: ['Rural', 'Countryside', 'Village', 'Township']
      };
      
      if (locationTypes[options.location.urbanPreference]) {
        const prefix = faker.helpers.arrayElement(locationTypes[options.location.urbanPreference]);
        city = `${prefix} ${city}`;
      }
    }

    return new Address({
      street: faker.location.streetAddress(),
      city: city,
      state: faker.location.state(),
      country: config?.label?.split(' ').slice(1).join(' ') || 'International',
      zipCode: faker.location.zipCode(),
      coordinates: new Coordinates({
        latitude: faker.location.latitude(config?.coordinates?.lat),
        longitude: faker.location.longitude(config?.coordinates?.lng)
      })
    });
  }  /**
   * Generate job data based on country with enhanced support for multiple countries
   * @param {string} countryCode 
   * @param {Object} options - Advanced generation options
   * @returns {Job}
   */
  generateJobData(countryCode, options = {}) {
    if (countryCode === 'philippines') {
      // Use enhanced Philippine data generator (integrated)
      const region = this.philippineRegions[Math.floor(Math.random() * this.philippineRegions.length)];
      const jobData = this.generatePhilippineJob(region);
      
      return new Job({
        title: jobData.title,
        company: jobData.company,
        department: jobData.department,
        salary: this.generateSalaryByExperience(options),
        experience: this.generateExperienceLevel(options)
      });
    }

    if (this.enhancedCountries.includes(countryCode)) {
      // Use enhanced country data generator
      const jobData = this.countryGenerator.generateJob(countryCode, options);
      if (jobData) {
        return new Job({
          title: jobData.title,
          company: jobData.company,
          department: jobData.department,
          salary: this.generateSalaryByExperience(options),
          experience: this.generateExperienceLevel(options)
        });
      }
    }

    // For other countries or fallback, use faker with industry preferences
    let jobTitle = faker.person.jobTitle();
    let company = faker.company.name();
    let department = faker.commerce.department();

    // Apply industry preferences
    if (options.profession?.enabled && options.profession.industry !== 'random') {
      const industryJobs = this.getJobsByIndustry(options.profession.industry);
      if (industryJobs.length > 0) {
        jobTitle = faker.helpers.arrayElement(industryJobs);
        company = this.getCompanyByIndustry(options.profession.industry);
        department = this.getDepartmentByIndustry(options.profession.industry);
      }
    }

    return new Job({
      title: jobTitle,
      company: company,
      department: department,
      salary: this.generateSalaryByExperience(options),
      experience: this.generateExperienceLevel(options)
    });
  }

  /**
   * Generate salary based on experience level
   * @param {Object} options 
   * @returns {number|null}
   */
  generateSalaryByExperience(options) {
    if (!options.experience?.enabled) return null;
    
    const salaryRanges = {
      entry: { min: 30000, max: 50000 },
      mid: { min: 50000, max: 80000 },
      senior: { min: 80000, max: 120000 },
      executive: { min: 120000, max: 200000 }
    };
    
    const level = options.experience.level === 'random' ? 
      faker.helpers.arrayElement(['entry', 'mid', 'senior', 'executive']) :
      options.experience.level;
    
    const range = salaryRanges[level] || salaryRanges.mid;
    return faker.number.int({ min: range.min, max: range.max });
  }

  /**
   * Generate experience level in years
   * @param {Object} options 
   * @returns {number|null}
   */
  generateExperienceLevel(options) {
    if (!options.experience?.enabled) return null;
    
    const experienceRanges = {
      entry: { min: 0, max: 2 },
      mid: { min: 3, max: 7 },
      senior: { min: 8, max: 15 },
      executive: { min: 15, max: 30 }
    };
    
    const level = options.experience.level === 'random' ? 
      faker.helpers.arrayElement(['entry', 'mid', 'senior', 'executive']) :
      options.experience.level;
    
    const range = experienceRanges[level] || experienceRanges.mid;
    return faker.number.int({ min: range.min, max: range.max });
  }

  /**
   * Get job titles by industry
   * @param {string} industry 
   * @returns {string[]}
   */
  getJobsByIndustry(industry) {
    const industryJobs = {
      technology: ['Software Engineer', 'Data Scientist', 'Product Manager', 'DevOps Engineer', 'UX Designer', 'Systems Analyst'],
      healthcare: ['Doctor', 'Nurse', 'Medical Assistant', 'Pharmacist', 'Physical Therapist', 'Healthcare Administrator'],
      education: ['Teacher', 'Principal', 'Professor', 'School Counselor', 'Educational Coordinator', 'Curriculum Developer'],
      finance: ['Financial Analyst', 'Accountant', 'Investment Banker', 'Insurance Agent', 'Credit Analyst', 'Actuary'],
      retail: ['Store Manager', 'Sales Associate', 'Buyer', 'Inventory Manager', 'Customer Service Representative', 'Visual Merchandiser'],
      manufacturing: ['Production Manager', 'Quality Control Inspector', 'Machine Operator', 'Industrial Engineer', 'Maintenance Technician'],
      government: ['Civil Servant', 'Policy Analyst', 'Public Administrator', 'Government Inspector', 'Social Worker', 'Tax Examiner'],
      entertainment: ['Actor', 'Producer', 'Director', 'Sound Engineer', 'Cinematographer', 'Entertainment Agent'],
      consulting: ['Management Consultant', 'Business Analyst', 'Strategy Consultant', 'IT Consultant', 'HR Consultant', 'Operations Consultant']
    };
    
    return industryJobs[industry] || [];
  }

  /**
   * Get company name by industry
   * @param {string} industry 
   * @returns {string}
   */
  getCompanyByIndustry(industry) {
    const industryCompanies = {
      technology: ['TechCorp', 'InnovateSoft', 'DataDyne Solutions', 'CloudVision Inc.', 'NextGen Technologies'],
      healthcare: ['MediCare Systems', 'HealthFirst', 'WellnessPoint', 'CareConnect', 'LifeSupport Medical'],
      education: ['EduTech Solutions', 'Learning Partners', 'Academic Excellence Inc.', 'Knowledge Systems', 'SchoolWorks'],
      finance: ['Capital Advisors', 'Financial Partners', 'Investment Solutions', 'MoneyWise Corp', 'Wealth Management Group'],
      retail: ['RetailMax', 'ShopSmart', 'Consumer Choice', 'Marketplace Solutions', 'Retail Innovation'],
      manufacturing: ['Industrial Solutions', 'Manufacturing Corp', 'Production Systems', 'Quality Manufacturing', 'Factory Works'],
      government: ['Public Services', 'Government Solutions', 'Civic Systems', 'Administration Corp', 'Public Works'],
      entertainment: ['Entertainment Plus', 'ShowBiz Corp', 'Creative Solutions', 'Media Works', 'Entertainment Group'],
      consulting: ['Strategic Advisors', 'Business Solutions', 'Consulting Partners', 'Advisory Services', 'Professional Consulting']
    };
    
    const companies = industryCompanies[industry] || [];
    return companies.length > 0 ? faker.helpers.arrayElement(companies) : faker.company.name();
  }

  /**
   * Get department by industry
   * @param {string} industry 
   * @returns {string}
   */
  getDepartmentByIndustry(industry) {
    const industryDepartments = {
      technology: ['Engineering', 'Product Development', 'Research & Development', 'IT Operations', 'Data Science'],
      healthcare: ['Clinical Services', 'Patient Care', 'Medical Administration', 'Pharmacy', 'Diagnostics'],
      education: ['Academic Affairs', 'Student Services', 'Curriculum Development', 'Administration', 'Faculty'],
      finance: ['Investment Banking', 'Risk Management', 'Portfolio Management', 'Financial Planning', 'Accounting'],
      retail: ['Sales', 'Merchandising', 'Customer Service', 'Inventory Management', 'Marketing'],
      manufacturing: ['Production', 'Quality Control', 'Operations', 'Engineering', 'Maintenance'],
      government: ['Public Administration', 'Policy Development', 'Social Services', 'Regulatory Affairs', 'Public Safety'],
      entertainment: ['Production', 'Creative Services', 'Distribution', 'Marketing', 'Talent Management'],
      consulting: ['Strategy', 'Operations', 'Technology', 'Human Resources', 'Change Management']
    };
    
    const departments = industryDepartments[industry] || [];
    return departments.length > 0 ? faker.helpers.arrayElement(departments) : faker.commerce.department();
  }  /**
   * Generate bio data based on country with enhanced support for multiple countries
   * @param {string} countryCode 
   * @param {Object} nameData
   * @param {Object} addressData
   * @returns {string}
   */
  generateBioData(countryCode, nameData = null, addressData = null) {
    if (countryCode === 'philippines' && nameData && addressData) {
      // Use enhanced Philippine data generator with context (integrated)
      return this.generatePhilippineBio(nameData, addressData.region || 'Metro Manila');
    } else if (countryCode === 'philippines') {
      // Fallback to basic Filipino bio
      return generateFilipinoBio();
    }

    if (this.enhancedCountries.includes(countryCode) && nameData && addressData) {
      // Use enhanced country data generator
      const bio = this.countryGenerator.generateBio(countryCode, nameData, addressData);
      if (bio) {
        return bio;
      }
    }

    // For other countries or fallback, use faker
    return faker.person.bio();
  }

  // === Integrated Philippine Data Generation Methods ===
  // These methods were moved from PhilippineDataGenerator.js for consolidation

  /**
   * Generate authentic Filipino phone number
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
   * Generate authentic Filipino name with regional variation
   * @param {string} gender 
   * @param {string} region 
   * @returns {Object}
   */
  generatePhilippineName(gender = null, region = 'Metro Manila') {
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
  generatePhilippineAddress(region = 'Metro Manila') {
    const config = getCountryConfig('philippines');
    const cities = this.getPhilippineCitiesByRegion(region);
    const city = getRandomPhilippineItem(cities);
    
    // Get authentic ZIP code for the city
    const zipCodes = PHILIPPINES_ZIP_CODES[city] || ['1000'];
    const zipCode = getRandomPhilippineItem(zipCodes);
    
    // Generate street address
    const street = this.generatePhilippineStreetAddress();
    
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
      state: this.getPhilippineProvinceByRegion(region),
      country: 'Philippines',
      zipCode,
      region,
      subdivision,
      coordinates: this.getPhilippineRegionCoordinates(region)
    };
  }

  /**
   * Generate realistic Filipino street address
   * @returns {string}
   */
  generatePhilippineStreetAddress() {
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
  generatePhilippineJob(region = 'Metro Manila') {
    const jobTitles = this.getPhilippineRegionalJobTitles(region);
    const title = getRandomPhilippineItem(jobTitles);
    
    const companies = this.getPhilippineRegionalCompanies(region);
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
  generatePhilippineBio(nameData, region) {
    const bioTemplates = [
      `A proud ${this.getPhilippineRegionalIdentity(region)} who values family above all else. ${this.getPhilippineRegionalActivity(region)} and loves spending time with loved ones during weekends.`,
      `Born and raised in ${region}, passionate about Filipino culture and traditions. Loves ${this.getPhilippineRegionalFood(region)} and weekend trips to nearby provinces.`,
      `A hardworking Pinoy who enjoys basketball, loves watching PBA games, and never misses Sunday family gatherings in ${region}.`,
      `Filipino professional from ${region} who believes in 'kapamilya' spirit. Enjoys local festivals, street food, and helping the community.`,
      `Loves Filipino movies, OPM music, and celebrating holidays with extended family. ${this.getPhilippineRegionalTradition(region)}.`,
      `A Filipino who enjoys jeepney rides, mall visits with friends, and trying different regional delicacies from ${region}.`,
      `Passionate about Philippine history and culture. Loves visiting historical sites around ${region} and supporting local businesses.`,
      `${nameData.nickname ? `Known as '${nameData.nickname}' to friends, ` : ''}values education and dreams of traveling around the beautiful islands of the Philippines.`,
      `Enjoys Filipino telenovelas, loves shopping at local markets in ${region}, and believes in 'bayanihan' spirit.`,
      `A proud Filipino from ${region} who loves celebrating fiestas, enjoys lechon during special occasions, and values respect for elders.`
    ];
    
    return getRandomPhilippineItem(bioTemplates);
  }

  // === Philippine Helper Methods ===

  getPhilippineCitiesByRegion(region) {
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

  getPhilippineProvinceByRegion(region) {
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

  getPhilippineRegionCoordinates(region) {
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

  getPhilippineRegionalJobTitles(region) {
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

  getPhilippineRegionalCompanies(region) {
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

  getPhilippineRegionalIdentity(region) {
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

  getPhilippineRegionalActivity(region) {
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

  getPhilippineRegionalFood(region) {
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

  getPhilippineRegionalTradition(region) {
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

  // === End Philippine Data Generation Methods ===

  /**
   * Validate person data
   * @param {Object} personData 
   * @returns {boolean}
   */
  validatePersonData(personData) {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    return requiredFields.every(field => personData[field] && personData[field].trim() !== '');
  }
}
