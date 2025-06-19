/**
 * Person Model Class
 * Follows Data Transfer Object (DTO) pattern and encapsulation
 * Represents a generated person with all their information
 */
export class Person {
  constructor(data = {}) {
    this.id = data.id || '';
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.fullName = data.fullName || '';
    this.gender = data.gender || '';
    this.email = data.email || '';
    this.phone = data.phone || '';
    this.avatar = data.avatar || '';
    this.birthdate = data.birthdate || new Date();
    this.address = new Address(data.address);
    this.job = new Job(data.job);
    this.bio = data.bio || '';
    this.zodiacSign = data.zodiacSign || '';
    this.nationality = data.nationality || '';
    this.selectedCountry = data.selectedCountry || '';
    this.createdAt = data.createdAt || new Date();
  }

  /**
   * Get formatted birth date
   * @returns {string}
   */
  getFormattedBirthdate() {
    return new Date(this.birthdate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Get age from birthdate
   * @returns {number}
   */
  getAge() {
    const today = new Date();
    const birthDate = new Date(this.birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  /**
   * Get initials from name
   * @returns {string}
   */
  getInitials() {
    return `${this.firstName.charAt(0)}${this.lastName.charAt(0)}`.toUpperCase();
  }

  /**
   * Convert to plain object for serialization
   * @returns {Object}
   */
  toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.fullName,
      gender: this.gender,
      email: this.email,
      phone: this.phone,
      avatar: this.avatar,
      birthdate: this.birthdate,
      address: this.address.toJSON(),
      job: this.job.toJSON(),
      bio: this.bio,
      zodiacSign: this.zodiacSign,
      nationality: this.nationality,
      selectedCountry: this.selectedCountry,
      createdAt: this.createdAt
    };
  }
}

/**
 * Address Model Class
 * Encapsulates address-related data and methods
 */
export class Address {
  constructor(data = {}) {
    this.street = data.street || '';
    this.city = data.city || '';
    this.state = data.state || '';
    this.country = data.country || '';
    this.zipCode = data.zipCode || '';
    this.barangay = data.barangay || null; // Philippines specific
    this.coordinates = new Coordinates(data.coordinates);
  }

  /**
   * Get formatted address string
   * @returns {string}
   */
  getFormattedAddress() {
    let address = this.street;
    if (this.barangay) address += `, ${this.barangay}`;
    address += `, ${this.city}, ${this.state} ${this.zipCode}`;
    address += `, ${this.country}`;
    return address;
  }

  /**
   * Get short address (city, state)
   * @returns {string}
   */
  getShortAddress() {
    return `${this.city}, ${this.state}`;
  }

  /**
   * Convert to plain object for serialization
   * @returns {Object}
   */
  toJSON() {
    return {
      street: this.street,
      city: this.city,
      state: this.state,
      country: this.country,
      zipCode: this.zipCode,
      barangay: this.barangay,
      coordinates: this.coordinates.toJSON()
    };
  }
}

/**
 * Coordinates Model Class
 * Encapsulates geographic coordinates
 */
export class Coordinates {
  constructor(data = {}) {
    this.latitude = data.latitude || 0;
    this.longitude = data.longitude || 0;
  }

  /**
   * Get formatted coordinates string
   * @returns {string}
   */
  getFormattedCoordinates() {
    return `${parseFloat(this.latitude).toFixed(4)}, ${parseFloat(this.longitude).toFixed(4)}`;
  }

  /**
   * Convert to plain object for serialization
   * @returns {Object}
   */
  toJSON() {
    return {
      latitude: this.latitude,
      longitude: this.longitude
    };
  }
}

/**
 * Job Model Class
 * Encapsulates job-related information
 */
export class Job {
  constructor(data = {}) {
    this.title = data.title || '';
    this.company = data.company || '';
    this.department = data.department || '';
    this.salary = data.salary || null;
    this.experience = data.experience || null;
  }

  /**
   * Get formatted job title
   * @returns {string}
   */
  getFormattedTitle() {
    return `${this.title} at ${this.company}`;
  }

  /**
   * Convert to plain object for serialization
   * @returns {Object}
   */
  toJSON() {
    return {
      title: this.title,
      company: this.company,
      department: this.department,
      salary: this.salary,
      experience: this.experience
    };
  }
}
