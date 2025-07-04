<script>
  import { createEventDispatcher } from 'svelte';

  export let selectedCountry = 'international';
  export let disabled = false;

  const dispatch = createEventDispatcher();

  // Advanced generation options
  let showAdvancedOptions = false;
  let generationOptions = {
    ageRange: {
      min: 18,
      max: 80,
      enabled: false
    },
    gender: {
      preference: 'random', // random, male, female, non-binary
      enabled: false
    },
    profession: {
      industry: 'random', // random, tech, healthcare, education, finance, etc.
      enabled: false
    },
    relationship: {
      type: 'individual', // individual, couple, family
      enabled: false
    },
    location: {
      urbanPreference: 'random', // random, urban, suburban, rural
      enabled: false
    },
    experience: {
      level: 'random', // random, entry, mid, senior, executive
      enabled: false
    }
  };

  // Industry options
  const industries = [
    { value: 'random', label: 'Random Industry' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'finance', label: 'Finance' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'government', label: 'Government' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'consulting', label: 'Consulting' }
  ];

  // Gender options
  const genderOptions = [
    { value: 'random', label: 'Random Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non-binary', label: 'Non-binary' }
  ];

  // Relationship types
  const relationshipTypes = [
    { value: 'individual', label: 'Individual Person' },
    { value: 'couple', label: 'Couple (2 people)' },
    { value: 'family', label: 'Family (3-5 people)' }
  ];

  // Location preferences
  const locationPreferences = [
    { value: 'random', label: 'Random Location' },
    { value: 'urban', label: 'Urban Areas' },
    { value: 'suburban', label: 'Suburban Areas' },
    { value: 'rural', label: 'Rural Areas' }
  ];

  // Experience levels
  const experienceLevels = [
    { value: 'random', label: 'Random Experience' },
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-7 years)' },
    { value: 'senior', label: 'Senior Level (8-15 years)' },
    { value: 'executive', label: 'Executive Level (15+ years)' }
  ];

  /**
   * Toggle advanced options panel
   */
  function toggleAdvancedOptions() {
    if (disabled) return;
    showAdvancedOptions = !showAdvancedOptions;
  }

  /**
   * Reset all advanced options to defaults
   */
  function resetOptions() {
    generationOptions = {
      ageRange: { min: 18, max: 80, enabled: false },
      gender: { preference: 'random', enabled: false },
      profession: { industry: 'random', enabled: false },
      relationship: { type: 'individual', enabled: false },
      location: { urbanPreference: 'random', enabled: false },
      experience: { level: 'random', enabled: false }
    };
    
    dispatch('optionsChanged', { options: generationOptions });
  }

  /**
   * Handle option changes
   */
  function handleOptionChange() {
    dispatch('optionsChanged', { options: generationOptions });
  }

  /**
   * Validate age range
   */
  function validateAgeRange() {
    if (generationOptions.ageRange.min > generationOptions.ageRange.max) {
      generationOptions.ageRange.max = generationOptions.ageRange.min;
    }
    if (generationOptions.ageRange.min < 1) {
      generationOptions.ageRange.min = 1;
    }
    if (generationOptions.ageRange.max > 120) {
      generationOptions.ageRange.max = 120;
    }
    handleOptionChange();
  }

  /**
   * Get active options count
   */
  function getActiveOptionsCount() {
    return Object.values(generationOptions).filter(option => option.enabled).length;
  }

  $: activeOptionsCount = getActiveOptionsCount();
</script>

<div class="advanced-options-container">
  <!-- Toggle Button -->
  <button
    class="btn btn-ghost text-sm"
    class:opacity-50={disabled}
    class:cursor-not-allowed={disabled}
    disabled={disabled}
    on:click={toggleAdvancedOptions}
    title="Advanced generation options"
  >
    ⚙️ Advanced Options
    {#if activeOptionsCount > 0}
      <span class="badge badge-blue ml-2">{activeOptionsCount}</span>
    {/if}
    <span class="ml-1 transform transition-transform duration-200" class:rotate-180={showAdvancedOptions}>
      ▼
    </span>
  </button>

  <!-- Advanced Options Panel -->
  {#if showAdvancedOptions}
    <div class="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 animate-slide-down">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-gray-900 dark:text-white">Advanced Generation Options</h3>
        <button
          class="btn btn-ghost btn-sm text-xs"
          on:click={resetOptions}
          title="Reset all options to defaults"
        >
          🔄 Reset
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Age Range -->
        <div class="option-group">
          <label class="option-header">
            <input
              type="checkbox"
              bind:checked={generationOptions.ageRange.enabled}
              on:change={handleOptionChange}
              class="mr-2"
            />
            <span class="font-medium text-gray-900 dark:text-white">Age Range</span>
          </label>
          
          {#if generationOptions.ageRange.enabled}
            <div class="option-content">
              <div class="flex items-center gap-2">
                <div class="flex-1">
                  <label for="min-age" class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Min Age</label>
                  <input
                    id="min-age"
                    type="number"
                    bind:value={generationOptions.ageRange.min}
                    on:change={validateAgeRange}
                    min="1"
                    max="120"
                    class="input text-sm"
                  />
                </div>
                <span class="text-gray-400">-</span>
                <div class="flex-1">
                  <label for="max-age" class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Max Age</label>
                  <input
                    id="max-age"
                    type="number"
                    bind:value={generationOptions.ageRange.max}
                    on:change={validateAgeRange}
                    min="1"
                    max="120"
                    class="input text-sm"
                  />
                </div>
              </div>
            </div>
          {/if}
        </div>

        <!-- Gender Preference -->
        <div class="option-group">
          <label class="option-header">
            <input
              type="checkbox"
              bind:checked={generationOptions.gender.enabled}
              on:change={handleOptionChange}
              class="mr-2"
            />
            <span class="font-medium text-gray-900 dark:text-white">Gender Preference</span>
          </label>
          
          {#if generationOptions.gender.enabled}
            <div class="option-content">
              <select
                bind:value={generationOptions.gender.preference}
                on:change={handleOptionChange}
                class="input text-sm"
              >
                {#each genderOptions as option}
                  <option value={option.value}>{option.label}</option>
                {/each}
              </select>
            </div>
          {/if}
        </div>

        <!-- Professional Industry -->
        <div class="option-group">
          <label class="option-header">
            <input
              type="checkbox"
              bind:checked={generationOptions.profession.enabled}
              on:change={handleOptionChange}
              class="mr-2"
            />
            <span class="font-medium text-gray-900 dark:text-white">Industry Focus</span>
          </label>
          
          {#if generationOptions.profession.enabled}
            <div class="option-content">
              <select
                bind:value={generationOptions.profession.industry}
                on:change={handleOptionChange}
                class="input text-sm"
              >
                {#each industries as industry}
                  <option value={industry.value}>{industry.label}</option>
                {/each}
              </select>
            </div>
          {/if}
        </div>

        <!-- Experience Level -->
        <div class="option-group">
          <label class="option-header">
            <input
              type="checkbox"
              bind:checked={generationOptions.experience.enabled}
              on:change={handleOptionChange}
              class="mr-2"
            />
            <span class="font-medium text-gray-900 dark:text-white">Experience Level</span>
          </label>
          
          {#if generationOptions.experience.enabled}
            <div class="option-content">
              <select
                bind:value={generationOptions.experience.level}
                on:change={handleOptionChange}
                class="input text-sm"
              >
                {#each experienceLevels as level}
                  <option value={level.value}>{level.label}</option>
                {/each}
              </select>
            </div>
          {/if}
        </div>

        <!-- Relationship Type -->
        <div class="option-group">
          <label class="option-header">
            <input
              type="checkbox"
              bind:checked={generationOptions.relationship.enabled}
              on:change={handleOptionChange}
              class="mr-2"
            />
            <span class="font-medium text-gray-900 dark:text-white">Relationship Type</span>
          </label>
          
          {#if generationOptions.relationship.enabled}
            <div class="option-content">
              <select
                bind:value={generationOptions.relationship.type}
                on:change={handleOptionChange}
                class="input text-sm"
              >
                {#each relationshipTypes as type}
                  <option value={type.value}>{type.label}</option>
                {/each}
              </select>
            </div>
          {/if}
        </div>

        <!-- Location Preference -->
        <div class="option-group">
          <label class="option-header">
            <input
              type="checkbox"
              bind:checked={generationOptions.location.enabled}
              on:change={handleOptionChange}
              class="mr-2"
            />
            <span class="font-medium text-gray-900 dark:text-white">Location Type</span>
          </label>
          
          {#if generationOptions.location.enabled}
            <div class="option-content">
              <select
                bind:value={generationOptions.location.urbanPreference}
                on:change={handleOptionChange}
                class="input text-sm"
              >
                {#each locationPreferences as location}
                  <option value={location.value}>{location.label}</option>
                {/each}
              </select>
            </div>
          {/if}
        </div>
      </div>

      {#if activeOptionsCount > 0}
        <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p class="text-sm text-blue-700 dark:text-blue-300">
            🎯 {activeOptionsCount} advanced option{activeOptionsCount > 1 ? 's' : ''} enabled. 
            Generated people will match your specified criteria.
          </p>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .option-group {
    @apply space-y-2;
  }

  .option-header {
    @apply flex items-center cursor-pointer;
  }

  .option-content {
    @apply ml-6 space-y-2;
  }

  .animate-slide-down {
    animation: slideDown 0.3s ease-out;
  }

  @keyframes slideDown {
    from { 
      opacity: 0; 
      transform: translateY(-10px);
      max-height: 0;
    }
    to { 
      opacity: 1; 
      transform: translateY(0);
      max-height: 500px;
    }
  }
</style>