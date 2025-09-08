<template>
  <div class="bg-white">
    <div class="px-4 xs:px-6 sm:px-10 md:px-16 lg:px-20 pt-8">
      <h1
        class="text-[20px] md:text-[32px] font-medium text-[#4C4C4C] border-b-4 border-[#D22245] mb-8 pl-6"
      >
        Create Account
      </h1>
    </div>

    <div class="flex flex-col lg:flex-row items-stretch">
      <!-- Left Side -->
      <div
        class="w-full lg:w-1/2 flex-shrink-0 flex items-stretch pt-0 pl-4 pr-4 pb-4 lg:pl-20 lg:pr-4 lg:pb-0"
      >
        <img
          src="../../assets/account/leftImg.png"
          alt="Office"
          class="object-cover w-full h-56 xs:h-72 sm:h-96 md:h-[28rem] lg:h-full"
        />
      </div>

      <!-- Right Side: Form -->
      <div
        class="w-full lg:w-1/2 flex flex-col justify-center px-4 xs:px-6 sm:px-10 md:px-16 py-6 lg:py-0"
      >
        <div class="w-full mx-auto">
          <h2 class="text-[16px] mb-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry.
          </h2>

          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
          >
            {{ errorMessage }}
          </div>
          <form
            @submit.prevent="onSubmit"
            class="space-y-6"
          >
            <div>
              <div class="relative">
                <span class="absolute left-3 top-3 text-gray-500">+94</span>
                <input
                  v-model="phoneNumber"
                  type="tel"
                  placeholder="7XXXXXXXX"
                  class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#D22245]"
                  :class="{ 'border-red-500': phoneError }"
                  required
                  @input="validatePhone"
                  @blur="validatePhone"
                />
              </div>
              <p
                v-if="phoneError"
                class="text-red-500 text-sm mt-1"
              >
                {{ phoneError }}
              </p>
            </div>
            <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="w-full bg-[#D22245] text-white py-3 rounded font-semibold text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span
                v-if="isLoading"
                class="flex items-center justify-center"
              >
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
                Creating...
              </span>
              <span v-else>Create</span>
            </button>
          </form>
          <div class="login flex justify-center mt-2">
            <a
              href="/login"
              class="text-[#818181] underline"
              >Login</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { customerCreate } from "../../services/customer.js";
  import { useAuth } from "../../composables/useAuth.js";

  const router = useRouter();
  const { setAuth } = useAuth();

  const phoneNumber = ref("");
  const password = ref("");
  const isLoading = ref(false);
  const errorMessage = ref("");
  const phoneError = ref("");

  // Computed property to check if form is valid
  const isFormValid = computed(() => {
    return (
      phoneNumber.value.length === 9 && /^[0-9]{9}$/.test(phoneNumber.value)
    );
  });

  // Phone number validation function
  function validatePhone() {
    const phone = phoneNumber.value.trim();

    if (!phone) {
      phoneError.value = "Phone number is required";
      return false;
    }

    if (phone.length !== 9) {
      phoneError.value = "Phone number must be exactly 9 digits";
      return false;
    }

    if (!/^[0-9]{9}$/.test(phone)) {
      phoneError.value = "Phone number must contain only digits";
      return false;
    }

    if (!phone.startsWith("7")) {
      phoneError.value = "Phone number must start with 7";
      return false;
    }

    // Additional validation for Sri Lankan mobile numbers
    const validPrefixes = [
      "70",
      "71",
      "72",
      "73",
      "74",
      "75",
      "76",
      "77",
      "78",
    ];
    const prefix = phone.substring(0, 2);
    if (!validPrefixes.includes(prefix)) {
      phoneError.value = "Please enter a valid Sri Lankan mobile number";
      return false;
    }

    phoneError.value = "";
    return true;
  }

  async function onSubmit() {
    // Clear previous errors
    errorMessage.value = "";

    // Validate phone number
    if (!validatePhone()) {
      return;
    }

    isLoading.value = true;

    try {
      const credentials = {
        user_username: `+94${phoneNumber.value}`,
      };

      const response = await customerCreate.create(credentials);

      if (response.isSuccess && response.value.user_username) {
        // Set authentication data using the composable
        // setAuth(response.value.user_username);

        // Redirect to profile page
        router.push("/otp");
      } else {
        errorMessage.value = "Login failed. Please check your credentials.";
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.data?.message) {
        errorMessage.value = error.response.data.message;
      } else if (error.response?.status === 401) {
        errorMessage.value = "Invalid phone number or password";
      } else if (error.response?.status === 404) {
        errorMessage.value = "User not found";
      } else {
        errorMessage.value =
          "An error occurred during login. Please try again.";
      }
    } finally {
      isLoading.value = false;
    }
  }
</script>

<style scoped>
  .input {
    @apply border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-rose-400 transition;
    font-size: 1rem;
  }
</style>
