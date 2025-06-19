import { faker } from '@faker-js/faker';
import { Person, Address, Coordinates, Job } from '../models/Person.js';
import { getCountryConfig } from '../config/countries.js';
import { PhoneNumberGenerator } from './PhoneNumberGenerator.js';
import { PhilippineDataGenerator } from './PhilippineDataGenerator.js';
import { generateFilipinoName, generateFilipinoAddress, generateFilipinoJob, generateFilipinoBio } from '../filipino-names.js';

/**
 * Person Generator Service Class
 * Follows Factory Pattern and Single Responsibility Principle (SRP)
 * Generates realistic person data based on country selection
 */
export class PersonGeneratorService {
  constructor() {
    this.phoneGenerator = new PhoneNumberGenerator();
    this.philippineGenerator = new PhilippineDataGenerator();
  }

  /**
   * Generate a complete person object with error handling
   * @param {string} countryCode 
   * @returns {Person}
   */
  generatePerson(countryCode = 'international') {
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

      // Generate name and basic info
      const nameData = this.generateNameData(countryCode);
      Object.assign(personData, nameData);

      // Generate contact information
      personData.email = faker.internet.email({ 
        firstName: personData.firstName, 
        lastName: personData.lastName 
      });
      personData.phone = this.phoneGenerator.generate(countryCode);
      personData.avatar = faker.image.avatar();      // Generate personal details
      personData.birthdate = faker.date.birthdate();
      personData.zodiacSign = faker.person.zodiacSign();
      personData.nationality = config?.nationality || 'International';

      // Generate address
      personData.address = this.generateAddressData(countryCode, config);

      // Generate job
      personData.job = this.generateJobData(countryCode);

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
   * Generate multiple persons
   * @param {number} count 
   * @param {string} countryCode 
   * @returns {Person[]}
   */
  generateMultiplePersons(count, countryCode = 'international') {
    const persons = [];
    for (let i = 0; i < count; i++) {
      persons.push(this.generatePerson(countryCode));
    }
    return persons;
  }
  /**
   * Generate name data based on country with enhanced Philippine support
   * @param {string} countryCode 
   * @returns {Object}
   */
  generateNameData(countryCode) {
    if (countryCode === 'philippines') {
      // Use enhanced Philippine data generator
      const region = this.philippineGenerator.regions[Math.floor(Math.random() * this.philippineGenerator.regions.length)];
      return this.philippineGenerator.generateName(null, region);
    }

    // For other countries, use faker
    const gender = faker.person.gender();
    const firstName = faker.person.firstName();
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
   * Generate address data based on country with enhanced Philippine support
   * @param {string} countryCode 
   * @param {Object} config 
   * @returns {Address}
   */
  generateAddressData(countryCode, config) {
    if (countryCode === 'philippines') {
      // Use enhanced Philippine data generator
      const region = this.philippineGenerator.regions[Math.floor(Math.random() * this.philippineGenerator.regions.length)];
      const addressData = this.philippineGenerator.generateAddress(region);
      
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

    // For other countries, use faker with country-specific coordinates
    return new Address({
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: config.label.split(' ').slice(1).join(' '),
      zipCode: faker.location.zipCode(),
      coordinates: new Coordinates({
        latitude: faker.location.latitude(config.coordinates.lat),
        longitude: faker.location.longitude(config.coordinates.lng)
      })
    });
  }
  /**
   * Generate job data based on country with enhanced Philippine support
   * @param {string} countryCode 
   * @returns {Job}
   */
  generateJobData(countryCode) {
    if (countryCode === 'philippines') {
      // Use enhanced Philippine data generator
      const region = this.philippineGenerator.regions[Math.floor(Math.random() * this.philippineGenerator.regions.length)];
      const jobData = this.philippineGenerator.generateJob(region);
      
      return new Job({
        title: jobData.title,
        company: jobData.company,
        department: jobData.department
      });
    }

    // For other countries, use faker
    return new Job({
      title: faker.person.jobTitle(),
      company: faker.company.name(),
      department: faker.commerce.department()
    });
  }
  /**
   * Generate bio data based on country with enhanced Philippine support
   * @param {string} countryCode 
   * @param {Object} nameData
   * @param {Object} addressData
   * @returns {string}
   */
  generateBioData(countryCode, nameData = null, addressData = null) {
    if (countryCode === 'philippines' && nameData && addressData) {
      // Use enhanced Philippine data generator with context
      return this.philippineGenerator.generateBio(nameData, addressData.region || 'Metro Manila');
    } else if (countryCode === 'philippines') {
      // Fallback to basic Filipino bio
      return generateFilipinoBio();
    }

    // For other countries, use faker
    return faker.person.bio();
  }
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
