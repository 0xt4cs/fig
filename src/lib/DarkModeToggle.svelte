<script>
  import { createEventDispatcher } from 'svelte';
  
  export let isDarkMode = false;
  export let size = 'md'; // 'sm', 'md', 'lg'
  
  const dispatch = createEventDispatcher();
  
  function toggle() {
    dispatch('toggle');
  }
  
  $: sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }[size];
</script>

<button
  on:click={toggle}
  class="btn btn-ghost btn-icon transition-all duration-300 hover:scale-110"
  title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
  aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
>
  {#if isDarkMode}
    <!-- Sun Icon -->
    <svg class="{sizeClasses} text-yellow-500 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  {:else}
    <!-- Moon Icon -->
    <svg class="{sizeClasses} text-indigo-600 dark:text-indigo-400 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  {/if}
</button>
