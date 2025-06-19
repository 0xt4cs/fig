<script>
  import { onMount } from 'svelte';
  import PersonCard from './lib/PersonCard.svelte';
  import DarkModeToggle from './lib/DarkModeToggle.svelte';
  import Toast from './lib/Toast.svelte';
    // Import OOP services
  import { PersonGeneratorService } from './lib/services/PersonGeneratorService.js';
  import { NotificationService } from './lib/services/NotificationService.js';
  import { StorageService } from './lib/services/StorageService.js';
  import { getCountriesList } from './lib/config/countries.js';
    // Initialize services
  const personGenerator = new PersonGeneratorService();
  const notificationService = new NotificationService();
  const storageService = new StorageService();
  
  // Get countries list
  const countries = getCountriesList();
  
  let persons = [];
  let loading = false;
  let currentPerson = null;
  let selectedCountry = 'international';
  let isDarkMode = false;
  
  // Toast notification state
  let toastMessage = '';
  let toastType = 'info';
  let showToast = false;    // Dark mode management using StorageService
  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    updateDarkModeClass();
    storageService.setItem('darkMode', isDarkMode.toString());
    notificationService.success(isDarkMode ? 'Dark mode enabled' : 'Light mode enabled');
  }
    function updateDarkModeClass() {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
      function generatePerson() {
    loading = true;
    setTimeout(() => {
      const newPerson = personGenerator.generatePerson(selectedCountry);
      currentPerson = newPerson;
      persons = [newPerson, ...persons].slice(0, 20);
      loading = false;
      notificationService.success('New person generated successfully!');
    }, 300);
  }
  
  function generateMultiple(count) {
    loading = true;
    setTimeout(() => {
      const newPersons = personGenerator.generateMultiplePersons(count, selectedCountry);
      persons = newPersons;
      if (newPersons.length > 0) {
        currentPerson = newPersons[0];
      }
      loading = false;
      notificationService.success(`Generated ${count} people successfully!`);
    }, 500);
  }
    // Initialize dark mode on mount using StorageService
  onMount(() => {
    // Subscribe to notification service
    notificationService.subscribe((notification) => {
      toastMessage = notification.message;
      toastType = notification.type;
      showToast = true;
    });
    
    const savedDarkMode = storageService.getItem('darkMode');
    if (savedDarkMode !== null) {
      isDarkMode = savedDarkMode === 'true';
    } else {
      // Default to system preference
      isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    updateDarkModeClass();
    
    // Generate initial person
    generatePerson();
  });
</script>

<main class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
  <!-- Header -->
  <header class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
            <span class="text-white font-bold text-xl">🎭</span>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">FIG</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">Fake Information Generator</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <DarkModeToggle {isDarkMode} on:toggle={toggleDarkMode} />
        </div>
      </div>
    </div>
  </header>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section -->
    <div class="text-center mb-12 animate-fade-in">
      <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-balance">
        Generate Fake Identity Information by Country
      </h2>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
        Create realistic fake personal data for testing, development, and privacy purposes. 
        Choose from different countries to get localized names, addresses, and phone formats.
      </p>
    </div>

    <!-- Control Panel -->
    <div class="card card-hover mb-8 animate-slide-up">
      <div class="p-6">
        <!-- Country Selection -->
        <div class="flex justify-center mb-6">
          <div class="w-full max-w-md">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Country/Region
            </label>            <select 
              bind:value={selectedCountry} 
              class="input text-lg"
              on:change={() => notificationService.info(`Switched to ${countries.find(c => c.value === selectedCountry)?.label}`)}
            >
              {#each countries as country}
                <option value={country.value}>{country.label}</option>
              {/each}
            </select>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-4 justify-center">
          <button 
            class="btn btn-primary btn-large"
            on:click={generatePerson}
            disabled={loading}
          >
            {#if loading}
              <div class="spinner w-4 h-4"></div>
              Generating...
            {:else}
              🎲 Generate New Person
            {/if}
          </button>
        
          <button 
            class="btn btn-secondary"
            on:click={() => generateMultiple(5)}
            disabled={loading}
          >
            📦 Generate 5 People
          </button>
          
          <button 
            class="btn btn-secondary"
            on:click={() => generateMultiple(10)}
            disabled={loading}
          >
            📦 Generate 10 People
          </button>
          
          <button 
            class="btn btn-secondary"
            on:click={() => generateMultiple(25)}
            disabled={loading}
          >
            📦 Generate 25 People
          </button>
        </div>
      </div>
    </div>

    <!-- Current Person Display -->
    {#if currentPerson && !loading}
      <div class="mb-8 animate-slide-up">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Current Generated Person</h3>
        <div class="max-w-2xl mx-auto">
          <PersonCard person={currentPerson} featured={true} />
        </div>
      </div>
    {/if}

    <!-- All Generated People -->
    {#if persons.length > 1}
      <div class="animate-fade-in">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">All Generated People ({persons.length})</h3>          <button 
            class="btn btn-danger text-sm"
            on:click={() => { 
              persons = currentPerson ? [currentPerson] : []; 
              notificationService.info('Cleared all generated people');
            }}
          >
            🗑️ Clear All
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {#each persons as person (person.id)}
            <div class="animate-fade-in">
              <PersonCard {person} />
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if persons.length === 0}
      <div class="text-center py-12 animate-fade-in">
        <div class="w-32 h-32 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center transition-colors duration-300">
          <span class="text-4xl">👤</span>
        </div>
        <p class="text-gray-500 dark:text-gray-400 text-lg">Select a country and click "Generate New Person" to get started!</p>
      </div>
    {/if}
  </div>
  <!-- Footer -->
  <footer class="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center space-y-4">
        <p class="text-gray-600 dark:text-gray-300 mb-2">
          <strong>⚠️ Disclaimer:</strong> All generated information is completely fake and fictional.
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          This tool does not encourage or support any illegal activities. Use responsibly for testing, development, and privacy purposes only.
        </p>
        
        <!-- Developer Credit -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Developed with ❤️ by 
            <a 
              href="https://github.com/0xt4cs" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
            >
              0xt4cs
            </a>
          </p>
          <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
            © {new Date().getFullYear()} FIG - Fake Information Generator
          </p>
        </div>
      </div>
    </div>
  </footer>
</main>

<!-- Toast Notification -->
<Toast 
  bind:show={showToast}
  message={toastMessage}
  type={toastType}
  on:close={() => showToast = false}
/>
