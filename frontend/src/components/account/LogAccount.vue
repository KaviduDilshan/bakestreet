<template>
  <div class="flex flex-col items-center justify-center lg:px-20 px-5 bg-white">
    <!-- Title -->
    <div class="w-full flex justify-start mb-8">
      <span
        class="text-[20px] md:text-[32px] font-medium pb-2 border-b-4 border-[#D22245] w-full text-[#4C4C4C] md:pt-8 pl-6 pt-2"
      >
        Login
      </span>
    </div>

    <div class="flex flex-col md:flex-row w-full bg-white overflow-hidden">
      <!-- Left: Image -->
      <div
        class="w-full md:w-1/2 bg-gray-100 flex items-center justify-center h-48 md:h-auto"
      >
        <img
          src="../../assets/account/login.png"
          alt="Office Worker"
          class="object-cover w-full h-full"
        />
      </div>

      <!-- Right: Login Form -->
      <div
        class="w-full md:w-1/2 p-4 sm:p-8 md:p-10 flex flex-col justify-center md:ml-10"
      >
        <h2 class="text-[16px] font-semibold mb-2">
          Welcome back! Please sign in to continue.
        </h2>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
        >
          {{ errorMessage }}
        </div>

        <form @submit.prevent="onSubmit" class="space-y-6">
          <!-- Phone Input -->
          <div>
            <div class="relative">
              <span class="absolute left-3 top-3 text-gray-500">+94</span>
              <input
                v-model="phoneNumber"
                type="tel"
                placeholder="7XXXXXXXX"
                class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#D22245]"
                :class="{ 'border-red-500': phoneError }"
                @input="validatePhone"
              />
            </div>
            <p v-if="phoneError" class="text-red-500 text-sm mt-1">
              {{ phoneError }}
            </p>
          </div>

          <!-- Password Input -->
          <div>
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#D22245]"
            />
          </div>

          <!-- Forgot Password -->
          <div class="flex justify-start">
            <a href="#" class="text-sm text-[#818181] underline">
              Forgot your password?
            </a>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading || !isFormValid"
            class="w-full bg-[#D22245] text-white py-3 rounded font-semibold text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Signing In...
            </span>
            <span v-else>SIGN IN</span>
          </button>
        </form>

        <!-- Create Account -->
        <div class="mt-6 text-center">
          <a href="/create-account" class="text-[#818181] underline">
            Create account
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
// import api from "../../services/api.js";
// import { useAuth } from "../../composables/useAuth.js";
import { login_register } from "../../services/login_register.js";

const router = useRouter();
// const { setAuth } = useAuth();
const { loginUser } = login_register();
// user
const phoneNumber = ref("");
const password = ref(""); 
const isLoading = ref(false);
const errorMessage = ref("");
const phoneError = ref("");

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return validatePhone() && password.value.trim().length > 0;
});

// Phone number validation
function validatePhone() {
  const phone = phoneNumber.value.trim();

  if (!phone) {
    phoneError.value = "Phone number is required";
    return false;
  }

  if (!/^[0-9]{9}$/.test(phone)) {
    phoneError.value = "Phone number must be exactly 9 digits";
    return false;
  }

  if (!phone.startsWith("7")) {
    phoneError.value = "Phone number must start with 7";
    return false;
  }

  const validPrefixes = ["70", "71", "72", "73", "74", "75", "76", "77", "78"];
  if (!validPrefixes.includes(phone.substring(0, 2))) {
    phoneError.value = "Please enter a valid Sri Lankan mobile number";
    return false;
  }

  phoneError.value = "";
  return true;
}

// Submit handler
async function onSubmit() {
  errorMessage.value = "";

  if (!validatePhone() || !password.value.trim()) {
    errorMessage.value = "Please fix the errors before submitting";
    return;
  }

  let nextPath = localStorage.getItem("nextHiddenPath") || "/profile";

  if (nextPath === "1") {
    nextPath = "/profile";
  } else if (nextPath === "2") {
    nextPath = "/checkout";
  }
  isLoading.value = true;
  errorMessage.value = await loginUser(
    phoneNumber.value,
    password.value,
    nextPath
  );
  isLoading.value = false;

  // try {
  //   // Send login request to backend
  //   const response = await api.post("/customers/login", {
  //     phoneNumber: phoneNumber.value,
  //     password: password.value,
  //   });

  //   if (response.data.isSuccess && response.data) {
  //     setAuth(response.data); // Save JWT to composable/localStorage
  //     router.push("/profile");
  //   } else {
  //     errorMessage.value = response.data.message || "Login failed. Please check your credentials.";
  //   }
  // } catch (error) {
  //   console.error("Login error:", error);

  //   if (error.response?.status === 401) {
  //     errorMessage.value = "Invalid phone number or password";
  //   } else if (error.response?.status === 404) {
  //     errorMessage.value = "User not found";
  //   } else if (error.response?.status === 403) {
  //     errorMessage.value =
  //       error.response?.data?.errorMessage?.message ||
  //       "Access denied. Please try again.";
  //   } else if (error.response?.data?.message) {
  //     errorMessage.value = error.response.data.message;
  //   } else {
  //     errorMessage.value = "An error occurred during login. Please try again.";
  //   }
  // } finally {
  //   isLoading.value = false;
  // }
}
</script>
