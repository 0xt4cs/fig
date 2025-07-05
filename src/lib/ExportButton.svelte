<script>
  import { createEventDispatcher } from 'svelte';
  import { ExportService } from './services/ExportService.js';

  export let people = [];
  export let disabled = false;

  const dispatch = createEventDispatcher();
  const exportService = new ExportService();

  let isExporting = false;
  let showExportMenu = false;
  let selectedFormat = 'json';

  const supportedFormats = [
    { value: 'json', label: 'JSON', icon: '📄', description: 'JavaScript Object Notation' },
    { value: 'csv', label: 'CSV', icon: '📊', description: 'Comma Separated Values' },
    { value: 'xml', label: 'XML', icon: '📋', description: 'eXtensible Markup Language' }
  ];

  /**
   * Handle export button click
   * @param {string} format - Export format
   */
  async function handleExport(format) {
    if (!people || people.length === 0) {
      dispatch('error', 'No people data to export');
      return;
    }

    if (!exportService.validateExportData(people)) {
      dispatch('error', 'Invalid export data');
      return;
    }

    isExporting = true;
    showExportMenu = false;

    try {
      const success = exportService.exportPeople(people, format);
      
      if (success) {
        dispatch('success', `Successfully exported ${people.length} people as ${format.toUpperCase()}`);
      } else {
        dispatch('error', 'Failed to export data');
      }
    } catch (error) {
      console.error('Export error:', error);
      dispatch('error', error.message || 'An error occurred during export');
    } finally {
      isExporting = false;
    }
  }

  /**
   * Toggle export menu
   */
  function toggleExportMenu() {
    if (disabled || isExporting) return;
    showExportMenu = !showExportMenu;
  }

  /**
   * Close export menu when clicking outside
   */
  function handleClickOutside(event) {
    if (!event.target.closest('.export-container')) {
      showExportMenu = false;
    }
  }

  /**
   * Handle keyboard navigation
   */
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      showExportMenu = false;
    }
  }
</script>

<svelte:window on:click={handleClickOutside} on:keydown={handleKeydown} />

<div class="export-container relative">
  <!-- Export Button -->
  <button
    class="btn btn-secondary"
    class:opacity-50={disabled || isExporting}
    class:cursor-not-allowed={disabled || isExporting}
    disabled={disabled || isExporting}
    on:click={toggleExportMenu}
    title="Export generated people data"
  >
    {#if isExporting}
      <div class="spinner w-4 h-4"></div>
      Exporting...
    {:else}
      📤 Export Data
    {/if}
  </button>

  <!-- Export Menu -->
  {#if showExportMenu}
    <div 
      class="absolute top-full mt-2 left-0 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 min-w-64 animate-fade-in"
      role="menu"
      aria-label="Export options"
    >
      <div class="p-3 border-b border-gray-200 dark:border-gray-700">
        <h3 class="font-semibold text-gray-900 dark:text-white text-sm">Export Options</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Export {people.length} people in your preferred format
        </p>
      </div>

      <div class="p-2">
        {#each supportedFormats as format}
          <button
            class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center gap-3"
            on:click={() => handleExport(format.value)}
            role="menuitem"
          >
            <span class="text-lg" role="img" aria-label={format.label}>{format.icon}</span>
            <div class="flex-1">
              <div class="font-medium text-gray-900 dark:text-white text-sm">{format.label}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{format.description}</div>
            </div>
          </button>
        {/each}
      </div>

      <div class="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 rounded-b-lg">
        <p class="text-xs text-gray-500 dark:text-gray-400">
          💡 Tip: JSON format preserves all data structure, CSV is great for spreadsheets
        </p>
      </div>
    </div>
  {/if}
</div>

<style>
  .spinner {
    border: 2px solid #f3f3f3;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .animate-fade-in {
    animation: fadeIn 0.2s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>