<script>
  export let person;
  export let featured = false;
  
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }
</script>

<div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 {featured ? 'border-2 border-blue-200' : 'border border-gray-200'}">
  <!-- Header with Avatar and Name -->
  <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-t-xl">
    <div class="flex items-center space-x-4">
      <img 
        src={person.avatar} 
        alt="{person.fullName}'s avatar" 
        class="w-16 h-16 rounded-full border-4 border-white shadow-lg"
      />
      <div class="text-white">
        <h3 class="text-xl font-bold">{person.fullName}</h3>
        <p class="text-blue-100 text-sm">{person.gender} • {person.zodiacSign}</p>
        <p class="text-blue-100 text-xs">Born: {formatDate(person.birthdate)}</p>
      </div>
    </div>
  </div>

  <!-- Content -->
  <div class="p-6 space-y-6">
    <!-- Personal Information -->
    <div>
      <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center">
        <span class="mr-2">👤</span> Personal Information
      </h4>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-gray-600">First Name:</span>
          <span class="font-medium text-gray-900">{person.firstName}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Last Name:</span>
          <span class="font-medium text-gray-900">{person.lastName}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-600">ID:</span>
          <button 
            class="text-xs bg-gray-100 px-2 py-1 rounded font-mono hover:bg-gray-200 transition-colors"
            on:click={() => copyToClipboard(person.id)}
            title="Click to copy"
          >
            {person.id.slice(0, 8)}...
          </button>
        </div>
      </div>
    </div>

    <!-- Contact Information -->
    <div>
      <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center">
        <span class="mr-2">📞</span> Contact
      </h4>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between items-center">
          <span class="text-gray-600">Email:</span>
          <a 
            href="mailto:{person.email}" 
            class="text-blue-600 hover:text-blue-700 transition-colors font-medium"
            title="Send email"
          >
            {person.email}
          </a>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Phone:</span>
          <a 
            href="tel:{person.phone}" 
            class="text-blue-600 hover:text-blue-700 transition-colors font-medium"
          >
            {person.phone}
          </a>
        </div>
      </div>
    </div>

    <!-- Address -->
    <div>
      <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center">
        <span class="mr-2">📍</span> Address
      </h4>
      <div class="text-sm text-gray-700 leading-relaxed">
        <p class="font-medium">{person.address.street}</p>
        {#if person.address.barangay}
          <p>{person.address.barangay}</p>
        {/if}
        <p>{person.address.city}, {person.address.state} {person.address.zipCode}</p>
        <p class="text-gray-500">{person.address.country}</p>
        {#if person.nationality}
          <p class="text-blue-600 text-xs font-medium mt-1">🏳️ {person.nationality}</p>
        {/if}
        {#if person.address.coordinates}
          <p class="text-xs text-gray-400 mt-1">
            📌 {parseFloat(person.address.coordinates.latitude).toFixed(4)}, {parseFloat(person.address.coordinates.longitude).toFixed(4)}
          </p>
        {/if}
      </div>
    </div>

    <!-- Work Information -->
    <div>
      <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center">
        <span class="mr-2">💼</span> Work
      </h4>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-gray-600">Position:</span>
          <span class="font-medium text-gray-900">{person.job.title}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Company:</span>
          <span class="font-medium text-gray-900">{person.job.company}</span>
        </div>
        {#if person.job.department}
          <div class="flex justify-between">
            <span class="text-gray-600">Department:</span>
            <span class="text-gray-700">{person.job.department}</span>
          </div>
        {/if}
      </div>
    </div>

    <!-- Bio -->
    {#if person.bio}
      <div>
        <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center">
          <span class="mr-2">📝</span> Bio
        </h4>
        <p class="text-sm text-gray-700 leading-relaxed italic bg-gray-50 p-3 rounded-lg">
          "{person.bio}"
        </p>
      </div>
    {/if}
  </div>

  {#if featured}
    <div class="bg-blue-50 px-6 py-3 rounded-b-xl">
      <p class="text-center text-xs text-blue-600 font-medium">🌟 Latest Generated Person</p>
    </div>
  {/if}
</div> 