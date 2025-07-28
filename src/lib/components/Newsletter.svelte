<script>
  import { browser } from "$app/environment";

  // Newsletter signup state
  let email = $state("");
  let isLoading = $state(false);
  let message = $state("");
  let isSuccess = $state(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      message = "Please enter your email address";
      isSuccess = false;
      return;
    }

    isLoading = true;
    message = "";

    try {
      // Dynamically import Shopify function only in the browser
      if (browser) {
        const { subscribeToNewsletter } = await import("$lib/shopify.js");
        const result = await subscribeToNewsletter(email.trim());

        if (result.success) {
          message = "Thank you for subscribing";
          isSuccess = true;
          // Reset form
          email = "";
        } else {
          message = result.error || "Failed to subscribe. Please try again.";
          isSuccess = false;
        }
      } else {
        message =
          "Newsletter signup is not available during server-side rendering.";
        isSuccess = false;
      }
    } catch (error) {
      console.error("Newsletter signup error:", error);
      message = `Error: ${error.message || "Something went wrong. Please try again."}`;
      isSuccess = false;
    } finally {
      isLoading = false;
    }
  }
</script>

<!-- Newsletter Section -->
<div class="flex flex-col p-8" style="height: calc(100vh - 5rem);">
  <!-- Main content -->
  <div class="flex flex-1 items-center justify-center py-1">
    <div class="w-full max-w-4xl">
      <div class="mb-1 text-center">
        <h1
          class="mb-1 text-2xl leading-tight text-black md:text-4xl lg:text-5xl"
          style="font-family: 'Items Text', sans-serif;"
        >
          Newsletter
        </h1>
        <p
          class="mx-auto mb-6 max-w-2xl text-base text-gray-700 md:mb-8 md:text-lg"
        >
          Sign up for optimistic science fiction and fantasy updates in your
          inbox.
        </p>
      </div>

      {#if isSuccess}
        <div class="text-center">
          <div class="pb-2 text-lg text-black md:text-2xl lg:text-3xl">
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
                  class="w-full border-0 bg-transparent pb-2 text-lg placeholder-gray-400 transition-colors duration-200 focus:outline-none md:pb-3 md:text-2xl lg:text-3xl"
                />
              </div>
              <button
                disabled={isLoading || !email.trim()}
                class="pb-2 pl-3 text-lg transition-opacity duration-200 hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40 md:pb-3 md:pl-4 md:text-2xl lg:text-3xl"
                type="submit"
                style="font-family: 'GT America', sans-serif;"
              >
                {#if isLoading}
                  <div
                    class="h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent md:h-8 md:w-8"
                  ></div>
                {:else}
                  ←
                {/if}
              </button>
            </div>
            <!-- Extended underline that goes under both input and arrow -->
            <div
              class="mt-0 h-0.5 w-full bg-gray-300 transition-colors duration-200 focus-within:bg-black"
            ></div>
          </div>

          {#if message && !isSuccess}
            <div class="mt-1 text-base text-red-800 md:text-lg">
              {message}
            </div>
          {/if}
        </form>
      {/if}
    </div>
  </div>

  <!-- Footer -->
  <footer
    class="flex flex-col gap-2 pt-2 md:flex-row md:items-end md:justify-between"
  >
    <div class="max-w-lg">
      <p class="text-md leading-tight text-black">
        Celebrating optimism in science fiction and fantasy, Habitats Press
        publishes stories, illustrations and comics that explore the boundless
        possibilities of tomorrow. Our carefully crafted releases blend unique
        worldbuilding and heartfelt narratives, imagining worlds where wonder,
        adventure, kindness, creativity and nature's enduring spirit shape the
        future.
      </p>
    </div>

    <div class="flex-shrink-0 text-left md:text-right">
      <div class="mb-1 text-xs text-stone-400">
        © 2025 Habitats Press. All Rights Reserved
      </div>
      <div class="flex items-center gap-2 text-xs">
        <a
          href="https://instagram.com/habitatspress"
          target="_blank"
          rel="noopener noreferrer"
          class="text-black transition-opacity hover:opacity-70"
        >
          Instagram @habitatspress
        </a>
        <span class="text-stone-400">•</span>
        <a
          href="https://bsky.app/profile/habitatspress.com"
          target="_blank"
          rel="noopener noreferrer"
          class="text-black transition-opacity hover:opacity-70"
        >
          Bluesky @habitatspress.com
        </a>
      </div>
    </div>
  </footer>
</div>
