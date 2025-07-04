/**
 * Export Service Class
 * Follows Single Responsibility Principle (SRP)
 * Handles all data export operations (JSON, CSV, XML)
 */
export class ExportService {
  constructor() {
    this.supportedFormats = ['json', 'csv', 'xml'];
  }

  /**
   * Export people data in specified format
   * @param {Array} people - Array of Person objects
   * @param {string} format - Export format (json, csv, xml)
   * @param {string} filename - Optional filename
   * @returns {boolean} Success status
   */
  exportPeople(people, format = 'json', filename = null) {
    if (!people || people.length === 0) {
      throw new Error('No people data to export');
    }

    if (!this.supportedFormats.includes(format.toLowerCase())) {
      throw new Error(`Unsupported format: ${format}`);
    }

    const timestamp = new Date().toISOString().split('T')[0];
    const defaultFilename = `fig-export-${timestamp}.${format}`;
    const finalFilename = filename || defaultFilename;

    let exportData;
    let mimeType;

    switch (format.toLowerCase()) {
      case 'json':
        exportData = this.exportToJSON(people);
        mimeType = 'application/json';
        break;
      case 'csv':
        exportData = this.exportToCSV(people);
        mimeType = 'text/csv';
        break;
      case 'xml':
        exportData = this.exportToXML(people);
        mimeType = 'application/xml';
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    return this.downloadFile(exportData, finalFilename, mimeType);
  }

  /**
   * Export people data as JSON
   * @param {Array} people - Array of Person objects
   * @returns {string} JSON string
   */
  exportToJSON(people) {
    const exportData = {
      exportDate: new Date().toISOString(),
      exportedBy: 'FIG - Fake Information Generator',
      version: '1.0',
      count: people.length,
      people: people.map(person => person.toJSON ? person.toJSON() : person)
    };

    return JSON.stringify(exportData, null, 2);
  }

  /**
   * Export people data as CSV
   * @param {Array} people - Array of Person objects
   * @returns {string} CSV string
   */
  exportToCSV(people) {
    if (people.length === 0) return '';

    // Define CSV headers
    const headers = [
      'ID', 'First Name', 'Last Name', 'Full Name', 'Gender', 'Email', 'Phone',
      'Birth Date', 'Age', 'Zodiac Sign', 'Nationality', 'Country',
      'Street Address', 'City', 'State', 'Postal Code', 'Coordinates',
      'Job Title', 'Company', 'Department', 'Salary', 'Experience', 'Bio'
    ];

    // Convert people to CSV rows
    const rows = people.map(person => {
      const personData = person.toJSON ? person.toJSON() : person;
      return [
        this.escapeCSVValue(personData.id),
        this.escapeCSVValue(personData.firstName),
        this.escapeCSVValue(personData.lastName),
        this.escapeCSVValue(personData.fullName),
        this.escapeCSVValue(personData.gender),
        this.escapeCSVValue(personData.email),
        this.escapeCSVValue(personData.phone),
        this.escapeCSVValue(personData.birthdate),
        this.escapeCSVValue(personData.age || this.calculateAge(personData.birthdate)),
        this.escapeCSVValue(personData.zodiacSign),
        this.escapeCSVValue(personData.nationality),
        this.escapeCSVValue(personData.selectedCountry),
        this.escapeCSVValue(personData.address?.street || ''),
        this.escapeCSVValue(personData.address?.city || ''),
        this.escapeCSVValue(personData.address?.state || ''),
        this.escapeCSVValue(personData.address?.postalCode || ''),
        this.escapeCSVValue(personData.address?.coordinates ? 
          `${personData.address.coordinates.lat}, ${personData.address.coordinates.lng}` : ''),
        this.escapeCSVValue(personData.job?.title || ''),
        this.escapeCSVValue(personData.job?.company || ''),
        this.escapeCSVValue(personData.job?.department || ''),
        this.escapeCSVValue(personData.job?.salary || ''),
        this.escapeCSVValue(personData.job?.experience || ''),
        this.escapeCSVValue(personData.bio)
      ];
    });

    // Combine headers and rows
    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');

    return csvContent;
  }

  /**
   * Export people data as XML
   * @param {Array} people - Array of Person objects
   * @returns {string} XML string
   */
  exportToXML(people) {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
    const timestamp = new Date().toISOString();
    
    let xmlContent = `${xmlHeader}<FIG_Export>\n`;
    xmlContent += `  <metadata>\n`;
    xmlContent += `    <exportDate>${timestamp}</exportDate>\n`;
    xmlContent += `    <exportedBy>FIG - Fake Information Generator</exportedBy>\n`;
    xmlContent += `    <version>1.0</version>\n`;
    xmlContent += `    <count>${people.length}</count>\n`;
    xmlContent += `  </metadata>\n`;
    xmlContent += `  <people>\n`;

    people.forEach(person => {
      const personData = person.toJSON ? person.toJSON() : person;
      xmlContent += `    <person>\n`;
      xmlContent += `      <id>${this.escapeXML(personData.id)}</id>\n`;
      xmlContent += `      <firstName>${this.escapeXML(personData.firstName)}</firstName>\n`;
      xmlContent += `      <lastName>${this.escapeXML(personData.lastName)}</lastName>\n`;
      xmlContent += `      <fullName>${this.escapeXML(personData.fullName)}</fullName>\n`;
      xmlContent += `      <gender>${this.escapeXML(personData.gender)}</gender>\n`;
      xmlContent += `      <email>${this.escapeXML(personData.email)}</email>\n`;
      xmlContent += `      <phone>${this.escapeXML(personData.phone)}</phone>\n`;
      xmlContent += `      <birthdate>${this.escapeXML(personData.birthdate)}</birthdate>\n`;
      xmlContent += `      <zodiacSign>${this.escapeXML(personData.zodiacSign)}</zodiacSign>\n`;
      xmlContent += `      <nationality>${this.escapeXML(personData.nationality)}</nationality>\n`;
      xmlContent += `      <selectedCountry>${this.escapeXML(personData.selectedCountry)}</selectedCountry>\n`;
      
      if (personData.address) {
        xmlContent += `      <address>\n`;
        xmlContent += `        <street>${this.escapeXML(personData.address.street || '')}</street>\n`;
        xmlContent += `        <city>${this.escapeXML(personData.address.city || '')}</city>\n`;
        xmlContent += `        <state>${this.escapeXML(personData.address.state || '')}</state>\n`;
        xmlContent += `        <postalCode>${this.escapeXML(personData.address.postalCode || '')}</postalCode>\n`;
        if (personData.address.coordinates) {
          xmlContent += `        <coordinates>\n`;
          xmlContent += `          <lat>${personData.address.coordinates.lat}</lat>\n`;
          xmlContent += `          <lng>${personData.address.coordinates.lng}</lng>\n`;
          xmlContent += `        </coordinates>\n`;
        }
        xmlContent += `      </address>\n`;
      }
      
      if (personData.job) {
        xmlContent += `      <job>\n`;
        xmlContent += `        <title>${this.escapeXML(personData.job.title || '')}</title>\n`;
        xmlContent += `        <company>${this.escapeXML(personData.job.company || '')}</company>\n`;
        xmlContent += `        <department>${this.escapeXML(personData.job.department || '')}</department>\n`;
        xmlContent += `        <salary>${this.escapeXML(personData.job.salary || '')}</salary>\n`;
        xmlContent += `        <experience>${this.escapeXML(personData.job.experience || '')}</experience>\n`;
        xmlContent += `      </job>\n`;
      }
      
      xmlContent += `      <bio>${this.escapeXML(personData.bio)}</bio>\n`;
      xmlContent += `    </person>\n`;
    });

    xmlContent += `  </people>\n`;
    xmlContent += `</FIG_Export>`;

    return xmlContent;
  }

  /**
   * Download file to user's device
   * @param {string} content - File content
   * @param {string} filename - File name
   * @param {string} mimeType - MIME type
   * @returns {boolean} Success status
   */
  downloadFile(content, filename, mimeType) {
    try {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      return true;
    } catch (error) {
      console.error('Error downloading file:', error);
      return false;
    }
  }

  /**
   * Escape CSV values to handle commas, quotes, and newlines
   * @param {any} value - Value to escape
   * @returns {string} Escaped value
   */
  escapeCSVValue(value) {
    if (value === null || value === undefined) return '';
    
    const stringValue = String(value);
    
    // If value contains comma, quote, or newline, wrap in quotes and escape quotes
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    
    return stringValue;
  }

  /**
   * Escape XML special characters
   * @param {any} value - Value to escape
   * @returns {string} Escaped value
   */
  escapeXML(value) {
    if (value === null || value === undefined) return '';
    
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Calculate age from birthdate
   * @param {string|Date} birthdate - Birth date
   * @returns {number} Age in years
   */
  calculateAge(birthdate) {
    if (!birthdate) return 0;
    
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  /**
   * Get available export formats
   * @returns {Array} Array of supported formats
   */
  getSupportedFormats() {
    return [...this.supportedFormats];
  }

  /**
   * Validate export data
   * @param {Array} people - Array of Person objects
   * @returns {boolean} True if data is valid
   */
  validateExportData(people) {
    if (!Array.isArray(people)) {
      return false;
    }
    
    if (people.length === 0) {
      return false;
    }
    
    // Check if all items have required fields
    return people.every(person => {
      const personData = person.toJSON ? person.toJSON() : person;
      return personData.id && personData.firstName && personData.lastName;
    });
  }
}