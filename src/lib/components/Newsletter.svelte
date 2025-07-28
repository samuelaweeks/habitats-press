<script>
  import { browser } from '$app/environment';
  
  // Newsletter signup state
  let email = $state('');
  let isLoading = $state(false);
  let message = $state('');
  let isSuccess = $state(false);

  async function handleSubmit(event) {
    event.preventDefault();
    
    if (!email.trim()) {
      message = 'Please enter your email address';
      isSuccess = false;
      return;
    }

    isLoading = true;
    message = '';

    try {
      // Dynamically import Shopify function only in the browser
      if (browser) {
        const { subscribeToNewsletter } = await import('$lib/shopify.js');
        const result = await subscribeToNewsletter(email.trim());
        
        if (result.success) {
          message = 'Thank you for subscribing';
          isSuccess = true;
          // Reset form
          email = '';
        } else {
          message = result.error || 'Failed to subscribe. Please try again.';
          isSuccess = false;
        }
      } else {
        message = 'Newsletter signup is not available during server-side rendering.';
        isSuccess = false;
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      message = `Error: ${error.message || 'Something went wrong. Please try again.'}`;
      isSuccess = false;
    } finally {
      isLoading = false;
    }
  }
</script>

<!-- Newsletter Section -->
<div class="flex flex-col p-8" style="height: calc(100vh - 5rem);">
  <!-- Main content -->
  <div class="flex-1 flex items-center justify-center py-1">
    <div class="max-w-4xl w-full">
      <div class="mb-1 text-center">
        <h1 class="text-2xl md:text-4xl lg:text-5xl text-black leading-tight mb-1" style="font-family: 'Items Text', sans-serif;">Newsletter</h1>
        <p class="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-6 md:mb-8">Sign up for optimistic science fiction and fantasy updates in your inbox.</p>
      </div>
      
      {#if isSuccess}
        <div class="text-center">
          <div class="text-lg md:text-2xl lg:text-3xl text-black pb-2">
            {message}
          </div>
        </div>
      {:else}
        <form onsubmit={handleSubmit} class="space-y-2">
          <div class="relative">
            <div class="flex items-end">
              <div class="flex-1">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  disabled={isLoading}
                  bind:value={email}
                  class="w-full text-lg md:text-2xl lg:text-3xl bg-transparent border-0 focus:outline-none pb-2 md:pb-3 placeholder-gray-400 transition-colors duration-200"
                />
              </div>
              <button
                disabled={isLoading || !email.trim()}
                class="text-lg md:text-2xl lg:text-3xl hover:opacity-70 transition-opacity duration-200 disabled:opacity-40 disabled:cursor-not-allowed pb-2 md:pb-3 pl-3 md:pl-4"
                type="submit"
                style="font-family: 'GT America', sans-serif;"
              >
                {#if isLoading}
                  <div class="w-6 h-6 md:w-8 md:h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                {:else}
                  ←
                {/if}
              </button>
            </div>
            <!-- Extended underline that goes under both input and arrow -->
            <div class="w-full h-0.5 bg-gray-300 focus-within:bg-black transition-colors duration-200 mt-0"></div>
          </div>
          
          {#if message && !isSuccess}
            <div class="mt-1 text-base md:text-lg text-red-700">
              {message}
            </div>
          {/if}
        </form>
      {/if}
    </div>
  </div>

  <!-- Footer -->
  <footer class="flex flex-col md:flex-row md:justify-between md:items-end gap-2 pt-2">
    <div class="max-w-lg">
      <p class="text-md text-black leading-tight">
        Celebrating optimism in science fiction and fantasy, Habitats Press publishes stories, illustrations and comics that explore the boundless possibilities of tomorrow. Our carefully crafted releases blend unique worldbuilding and heartfelt narratives, imagining worlds where wonder, adventure, kindness, creativity and nature's enduring spirit shape the future.
      </p>
    </div>
    
    <div class="text-left md:text-right flex-shrink-0">
      <div class="text-xs text-stone-400 mb-1">
        © 2025 Habitats Press. All Rights Reserved
      </div>
      <div class="flex items-center gap-2 text-xs">
        <a 
          href="https://instagram.com/habitatspress" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-black hover:opacity-70 transition-opacity"
        >
          Instagram @habitatspress
        </a>
        <span class="text-stone-400">•</span>
        <a 
          href="https://bsky.app/profile/habitatspress.com" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-black hover:opacity-70 transition-opacity"
        >
          Bluesky @habitatspress.com
        </a>
      </div>
    </div>
  </footer>
</div>