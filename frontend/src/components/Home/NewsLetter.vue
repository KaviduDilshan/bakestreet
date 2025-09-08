<!-- Newsletter Section -->
<template>
  <div class="bg-secondary">
    <div
      class="px-5 lg:px-20 py-3 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-10"
    >
      <div class="flex items-center gap-2 mb-4 md:mb-0">
        <svg
          class="w-12 h-12 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 5L2 12.5L9 13.5M21 5L18.5 20L9 13.5M21 5L9 13.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span class="text-lg sm:text-lg md:text-xl text-white"
          >Sign up to Newsletter</span
        >
      </div>
      <!-- desktop -->
      <div
        class="flex flex-col md:flex-row gap-3 md:gap-0 w-full md:w-auto md:block hidden"
      >
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email address"
          class="flex-1 md:w-[400px] px-4 py-2 text-black focus:outline-none rounded-l-lg"
        />
        <button
          @click="handleSubscribe"
          class="bg-[#2B3131] px-6 py-2 w-full md:w-auto hover:bg-primary font-semibold transition-colors text-white rounded-r-lg"
        >
          Sign Up
        </button>
      </div>

      <!-- mobile -->
      <div
        class="flex flex-col md:flex-row gap-3 md:gap-0 w-full md:w-auto md:hidden"
      >
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email address"
          class="flex-1 md:w-[400px] px-4 py-2 text-black focus:outline-none rounded-lg"
        />
        <button
          @click="handleSubscribe"
          class="bg-[#2B3131] px-6 py-2 w-full md:w-auto hover:bg-[#8B7045] font-semibold transition-colors text-white rounded-lg"
        >
          Sign Up
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const email = ref("");

  const handleSubscribe = () => {
    // Handle newsletter subscription
    console.log("Subscribing email:", email.value);
    email.value = ""; // Clear input after submission
  };
</script>
