/**
 * Country configuration and constants
 * Follows Single Responsibility Principle (SRP)
 */

export const COUNTRIES_CONFIG = {
  international: {
    value: 'international',
    label: '🌍 International',
    flag: '🌍',
    nationality: 'International',
    coordinates: {
      lat: { min: -90, max: 90 },
      lng: { min: -180, max: 180 }
    },
    phoneFormat: 'international'
  },
  philippines: {
    value: 'philippines',
    label: '🇵🇭 Philippines',
    flag: '🇵🇭',
    nationality: 'Filipino',
    coordinates: {
      lat: { min: 4.5, max: 21.0 },
      lng: { min: 116.0, max: 127.0 }
    },
    phoneFormat: '+63 ### ### ####',
    provinces: [
      'Metro Manila', 'Cebu', 'Davao', 'Iloilo', 'Cagayan de Oro', 'General Santos',
      'Bacolod', 'Tacloban', 'Iloilo', 'Zamboanga', 'Antipolo', 'Taguig', 'Pasig',
      'Quezon City', 'Manila', 'Caloocan', 'Las Piñas', 'Makati', 'Pasay', 'Parañaque',
      'Valenzuela', 'Marikina', 'Malabon', 'Navotas', 'San Juan', 'Mandaluyong', 'Muntinlupa'
    ],
    regions: [
      'National Capital Region (NCR)', 'Cordillera Administrative Region (CAR)', 
      'Ilocos Region (Region I)', 'Cagayan Valley (Region II)', 'Central Luzon (Region III)',
      'Calabarzon (Region IV-A)', 'Mimaropa (Region IV-B)', 'Bicol Region (Region V)',
      'Western Visayas (Region VI)', 'Central Visayas (Region VII)', 'Eastern Visayas (Region VIII)',
      'Zamboanga Peninsula (Region IX)', 'Northern Mindanao (Region X)', 'Davao Region (Region XI)',
      'Soccsksargen (Region XII)', 'Caraga (Region XIII)', 'Bangsamoro (BARMM)'
    ]
  },
  usa: {
    value: 'usa',
    label: '🇺🇸 United States',
    flag: '🇺🇸',
    nationality: 'American',
    coordinates: {
      lat: { min: 24.0, max: 49.0 },
      lng: { min: -125.0, max: -66.0 }
    },
    phoneFormat: '+1 (###) ###-####'
  },
  canada: {
    value: 'canada',
    label: '🇨🇦 Canada',
    flag: '🇨🇦',
    nationality: 'Canadian',
    coordinates: {
      lat: { min: 42.0, max: 83.0 },
      lng: { min: -141.0, max: -52.0 }
    },
    phoneFormat: '+1 (###) ###-####'
  },
  uk: {
    value: 'uk',
    label: '🇬🇧 United Kingdom',
    flag: '🇬🇧',
    nationality: 'British',
    coordinates: {
      lat: { min: 49.9, max: 58.7 },
      lng: { min: -8.0, max: 2.0 }
    },
    phoneFormat: '+44 #### ######'
  },
  australia: {
    value: 'australia',
    label: '🇦🇺 Australia',
    flag: '🇦🇺',
    nationality: 'Australian',
    coordinates: {
      lat: { min: -44.0, max: -10.0 },
      lng: { min: 113.0, max: 154.0 }
    },
    phoneFormat: '+61 # #### ####'
  },
  japan: {
    value: 'japan',
    label: '🇯🇵 Japan',
    flag: '🇯🇵',
    nationality: 'Japanese',
    coordinates: {
      lat: { min: 24.0, max: 46.0 },
      lng: { min: 123.0, max: 146.0 }
    },
    phoneFormat: '+81 ##-####-####'
  },
  germany: {
    value: 'germany',
    label: '🇩🇪 Germany',
    flag: '🇩🇪',
    nationality: 'German',
    coordinates: {
      lat: { min: 47.3, max: 55.1 },
      lng: { min: 5.9, max: 15.0 }
    },
    phoneFormat: '+49 ### #######'
  },
  france: {
    value: 'france',
    label: '🇫🇷 France',
    flag: '🇫🇷',
    nationality: 'French',
    coordinates: {
      lat: { min: 41.3, max: 51.1 },
      lng: { min: -5.1, max: 9.6 }
    },
    phoneFormat: '+33 # ## ## ## ##'
  },
  italy: {
    value: 'italy',
    label: '🇮🇹 Italy',
    flag: '🇮🇹',
    nationality: 'Italian',
    coordinates: {
      lat: { min: 35.5, max: 47.1 },
      lng: { min: 6.6, max: 18.5 }
    },
    phoneFormat: '+39 ### ### ####'
  },
  spain: {
    value: 'spain',
    label: '🇪🇸 Spain',
    flag: '🇪🇸',
    nationality: 'Spanish',
    coordinates: {
      lat: { min: 35.2, max: 43.8 },
      lng: { min: -9.3, max: 3.3 }
    },
    phoneFormat: '+34 ### ### ###'
  },
  brazil: {
    value: 'brazil',
    label: '🇧🇷 Brazil',
    flag: '🇧🇷',
    nationality: 'Brazilian',
    coordinates: {
      lat: { min: -33.7, max: 5.3 },
      lng: { min: -74.0, max: -28.8 }
    },
    phoneFormat: '+55 (##) #####-####'
  },
  mexico: {
    value: 'mexico',
    label: '🇲🇽 Mexico',
    flag: '🇲🇽',
    nationality: 'Mexican',
    coordinates: {
      lat: { min: 14.5, max: 32.7 },
      lng: { min: -118.4, max: -86.7 }
    },
    phoneFormat: '+52 (###) ###-####'
  },
  india: {
    value: 'india',
    label: '🇮🇳 India',
    flag: '🇮🇳',
    nationality: 'Indian',
    coordinates: {
      lat: { min: 6.0, max: 37.1 },
      lng: { min: 68.0, max: 97.4 }
    },
    phoneFormat: '+91 ##### #####'
  },
  china: {
    value: 'china',
    label: '🇨🇳 China',
    flag: '🇨🇳',
    nationality: 'Chinese',
    coordinates: {
      lat: { min: 18.2, max: 53.6 },
      lng: { min: 73.5, max: 135.1 }
    },
    phoneFormat: '+86 ### #### ####'
  },
  southkorea: {
    value: 'southkorea',
    label: '🇰🇷 South Korea',
    flag: '🇰🇷',
    nationality: 'South Korean',
    coordinates: {
      lat: { min: 33.1, max: 38.6 },
      lng: { min: 125.0, max: 131.9 }
    },
    phoneFormat: '+82 ##-####-####'
  },
  thailand: {
    value: 'thailand',
    label: '🇹🇭 Thailand',
    flag: '🇹🇭',
    nationality: 'Thai',
    coordinates: {
      lat: { min: 5.6, max: 20.5 },
      lng: { min: 97.3, max: 105.6 }
    },
    phoneFormat: '+66 ## ### ####'
  },
  indonesia: {
    value: 'indonesia',
    label: '🇮🇩 Indonesia',
    flag: '🇮🇩',
    nationality: 'Indonesian',
    coordinates: {
      lat: { min: -11.0, max: 6.1 },
      lng: { min: 95.0, max: 141.0 }
    },
    phoneFormat: '+62 ###-####-####'
  },
  malaysia: {
    value: 'malaysia',
    label: '🇲🇾 Malaysia',
    flag: '🇲🇾',
    nationality: 'Malaysian',
    coordinates: {
      lat: { min: 0.9, max: 7.4 },
      lng: { min: 99.6, max: 119.3 }
    },
    phoneFormat: '+60 ##-### ####'
  },
  singapore: {
    value: 'singapore',
    label: '🇸🇬 Singapore',
    flag: '🇸🇬',
    nationality: 'Singaporean',
    coordinates: {
      lat: { min: 1.2, max: 1.5 },
      lng: { min: 103.6, max: 104.0 }
    },
    phoneFormat: '+65 #### ####'
  },
  vietnam: {
    value: 'vietnam',
    label: '🇻🇳 Vietnam',
    flag: '🇻🇳',
    nationality: 'Vietnamese',
    coordinates: {
      lat: { min: 8.6, max: 23.4 },
      lng: { min: 102.1, max: 109.5 }
    },
    phoneFormat: '+84 ### ### ####'
  }
};

export const getCountriesList = () => Object.values(COUNTRIES_CONFIG);
export const getCountryConfig = (countryCode) => COUNTRIES_CONFIG[countryCode];
export const getCountryNames = () => Object.keys(COUNTRIES_CONFIG);
