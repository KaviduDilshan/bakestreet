<template>
  <div class="flex flex-col items-center justify-center lg:px-20 px-5  bg-white">
    
    <div class="w-full  flex justify-start mb-8">
      <span
        class="text-[20px] md:text-[32px] font-medium pb-2 border-b-4 border-[#D22245] w-full text-[#4C4C4C] md:pt-8 pl-6 pt-2"
      >
        Reset your password
      </span>
    </div>
    <div
      class="flex flex-col md:flex-row w-full  bg-white overflow-hidden"
    >
      <!-- Left: Image -->
      <div class="w-full md:w-1/2 bg-gray-100 flex items-center justify-center h-48 md:h-auto">
        <img
          src="../../assets/account/reset.png"
          alt="Office Worker"
          class="object-cover w-full h-full"
        />
      </div>
      <!-- Right: Login Form -->
      <div
        class="w-full md:w-1/2 p-4 sm:p-8 md:p-10 flex flex-col justify-center md:ml-10"
      >
        <h2 class="text-[16px] font-semibold mb-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
          Lorem Ipsum has been the industry.
        </h2>
        <form @submit.prevent="onSubmit" class="space-y-6">
          <div>
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#D22245]"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-[#D22245] text-white py-3 rounded font-semibold text-lg transition"
          >
            SIGN IN
          </button>
        </form>
        <div class="mt-6 text-center">
          <a href="#" class="text-[#818181] underline">Cancel</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

function onSubmit() {
  // Handle login logic here
  alert(`Email: ${email.value}\nPassword: ${password.value}`);
}
</script>
