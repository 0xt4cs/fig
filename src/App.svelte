<script>
  import { faker } from '@faker-js/faker';
  import PersonCard from './lib/PersonCard.svelte';
  import { generateFilipinoName, generateFilipinoAddress, generateFilipinoJob } from './lib/filipino-names.js';
  
  let persons = [];
  let loading = false;
  let currentPerson = null;
  let selectedCountry = 'international';
  
  const countries = [
    { value: 'international', label: '🌍 International', flag: '🌍' },
    { value: 'philippines', label: '🇵🇭 Philippines (Pinoy)', flag: '🇵🇭' },
    { value: 'usa', label: '🇺🇸 United States', flag: '🇺🇸' },
    { value: 'canada', label: '🇨🇦 Canada', flag: '🇨🇦' },
    { value: 'uk', label: '🇬🇧 United Kingdom', flag: '🇬🇧' },
    { value: 'australia', label: '🇦🇺 Australia', flag: '🇦🇺' }
  ];
  
  function generatePersonData() {
    const useFilipino = selectedCountry === 'philippines';
    
    // Generate name based on country selection
    let nameData;
    let gender;
    let nationality;
    
    if (useFilipino) {
      nameData = generateFilipinoName();
      gender = nameData.gender;
      nationality = 'Filipino';
    } else {
      gender = faker.person.gender();
      nameData = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        fullName: faker.person.fullName(),
        gender: gender
      };
      
      // Set nationality based on selected country
      switch(selectedCountry) {
        case 'usa': nationality = 'American'; break;
        case 'canada': nationality = 'Canadian'; break;
        case 'uk': nationality = 'British'; break;
        case 'australia': nationality = 'Australian'; break;
        default: nationality = faker.location.country();
      }
    }
    
    // Generate address based on country selection
    let addressData;
    if (useFilipino) {
      const filipinoAddr = generateFilipinoAddress();
      addressData = {
        street: filipinoAddr.street,
        city: filipinoAddr.city,
        state: filipinoAddr.province,
        country: filipinoAddr.country,
        zipCode: filipinoAddr.zipCode,
        barangay: filipinoAddr.barangay,
        coordinates: {
          latitude: faker.location.latitude({ min: 4.5, max: 21.0 }), // Philippines lat range
          longitude: faker.location.longitude({ min: 116.0, max: 127.0 }) // Philippines lng range
        }
      };
    } else {
      // Generate country-specific coordinates and formatting
      let coordinates;
      switch(selectedCountry) {
        case 'usa':
          coordinates = {
            latitude: faker.location.latitude({ min: 24.0, max: 49.0 }),
            longitude: faker.location.longitude({ min: -125.0, max: -66.0 })
          };
          break;
        case 'canada':
          coordinates = {
            latitude: faker.location.latitude({ min: 42.0, max: 83.0 }),
            longitude: faker.location.longitude({ min: -141.0, max: -52.0 })
          };
          break;
        case 'uk':
          coordinates = {
            latitude: faker.location.latitude({ min: 49.9, max: 58.7 }),
            longitude: faker.location.longitude({ min: -8.0, max: 2.0 })
          };
          break;
        case 'australia':
          coordinates = {
            latitude: faker.location.latitude({ min: -44.0, max: -10.0 }),
            longitude: faker.location.longitude({ min: 113.0, max: 154.0 })
          };
          break;
        default:
          coordinates = {
            latitude: faker.location.latitude(),
            longitude: faker.location.longitude()
          };
      }
      
      addressData = {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: selectedCountry === 'international' ? faker.location.country() : countries.find(c => c.value === selectedCountry)?.label.split(' ').slice(1).join(' ') || faker.location.country(),
        zipCode: faker.location.zipCode(),
        coordinates: coordinates
      };
    }
    
    // Generate country-specific phone number format
    let phoneNumber;
    switch(selectedCountry) {
      case 'philippines':
        phoneNumber = `+63 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`;
        break;
      case 'usa':
      case 'canada':
        phoneNumber = `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
        break;
      case 'uk':
        phoneNumber = `+44 ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 900000) + 100000}`;
        break;
      case 'australia':
        phoneNumber = `+61 ${Math.floor(Math.random() * 9) + 1} ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000}`;
        break;
      default:
        phoneNumber = faker.phone.number();
    }
    
    return {
      id: faker.string.uuid(),
      firstName: nameData.firstName,
      lastName: nameData.lastName,
      fullName: nameData.fullName,
      gender: nameData.gender,
      email: faker.internet.email({ firstName: nameData.firstName, lastName: nameData.lastName }),
      phone: phoneNumber,
      avatar: faker.image.avatar(),
      birthdate: faker.date.birthdate(),
      address: addressData,
      job: useFilipino ? generateFilipinoJob() : {
        title: faker.person.jobTitle(),
        company: faker.company.name(),
        department: faker.commerce.department()
      },
      bio: faker.person.bio(),
      zodiacSign: faker.person.zodiacSign(),
      nationality: nationality,
      selectedCountry: selectedCountry
    };
  }
  
  function generatePerson() {
    loading = true;
    setTimeout(() => {
      const newPerson = generatePersonData();
      currentPerson = newPerson;
      persons = [newPerson, ...persons].slice(0, 20);
      loading = false;
    }, 300);
  }
  
  function generateMultiple(count) {
    loading = true;
    setTimeout(() => {
      const newPersons = [];
      for (let i = 0; i < count; i++) {
        newPersons.push(generatePersonData());
      }
      persons = newPersons;
      if (newPersons.length > 0) {
        currentPerson = newPersons[0];
      }
      loading = false;
    }, 500);
  }
  
  // Generate initial person on load
  generatePerson();
</script>

<main class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
  <!-- Header -->
  <header class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">🎭</span>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">FIG</h1>
            <p class="text-sm text-gray-500">Fake Information Generator</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-500">Fake Data Only</p>
          <p class="text-xs text-gray-400">Not for illegal use</p>
        </div>
      </div>
    </div>
  </header>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">
        Generate Fake Identity Information by Country
      </h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Create realistic fake personal data for testing, development, and privacy purposes. 
        Choose from different countries to get localized names, addresses, and phone formats.
      </p>
    </div>

    <!-- Control Panel -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
      <!-- Country Selection -->
      <div class="flex justify-center mb-6">
        <div class="w-full max-w-md">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Select Country/Region
          </label>
          <select 
            bind:value={selectedCountry} 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          >
            {#each countries as country}
              <option value={country.value}>{country.label}</option>
            {/each}
          </select>
        </div>
      </div>
      
      <div class="flex flex-wrap gap-4 justify-center">
        <button 
          class="btn-primary"
          on:click={generatePerson}
          disabled={loading}
        >
          {#if loading}
            <div class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Generating...
          {:else}
            🎲 Generate New Person
          {/if}
        </button>
        
        <button 
          class="btn-secondary"
          on:click={() => generateMultiple(5)}
          disabled={loading}
        >
          📦 Generate 5 People
        </button>
        
        <button 
          class="btn-secondary"
          on:click={() => generateMultiple(10)}
          disabled={loading}
        >
          📦 Generate 10 People
        </button>
        
        <button 
          class="btn-secondary"
          on:click={() => generateMultiple(25)}
          disabled={loading}
        >
          📦 Generate 25 People
        </button>
      </div>
    </div>

    <!-- Current Person Display -->
    {#if currentPerson && !loading}
      <div class="mb-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-4 text-center">Current Generated Person</h3>
        <div class="max-w-2xl mx-auto">
          <PersonCard person={currentPerson} featured={true} />
        </div>
      </div>
    {/if}

    <!-- All Generated People -->
    {#if persons.length > 1}
      <div>
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-900">All Generated People ({persons.length})</h3>
          <button 
            class="text-sm text-red-600 hover:text-red-700 font-medium"
            on:click={() => { persons = currentPerson ? [currentPerson] : []; }}
          >
            Clear All
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {#each persons as person (person.id)}
            <PersonCard {person} />
          {/each}
        </div>
      </div>
    {/if}

    {#if persons.length === 0}
      <div class="text-center py-12">
        <div class="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <span class="text-4xl">👤</span>
        </div>
        <p class="text-gray-500 text-lg">Select a country and click "Generate New Person" to get started!</p>
      </div>
    {/if}
  </div>

  <!-- Footer -->
  <footer class="bg-gray-50 border-t mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <p class="text-gray-600 mb-2">
          <strong>⚠️ Disclaimer:</strong> All generated information is completely fake and fictional.
        </p>
        <p class="text-sm text-gray-500">
          This tool does not encourage or support any illegal activities. Use responsibly for testing, development, and privacy purposes only.
        </p>
      </div>
    </div>
  </footer>
</main>

<style>
  .btn-primary {
    @apply bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center;
  }
  
  .btn-secondary {
    @apply bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none;
  }
</style>
