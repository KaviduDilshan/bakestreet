<template>
  <div class="flex flex-col justify-center lg:px-20 px-5 bg-white">
    <div class="w-full flex justify-start mb-8">
      <span
        class="text-[20px] md:text-[32px] font-quicksand font-[700] pb-2 border-b-4 border-secondary w-full text-[#4C4C4C] md:pt-8 pl-6 pt-2"
      >
        Account Details
      </span>
    </div>
    <div class="ml-2 font-quicksand pb-5 font-[600] text-[11px] text-[#898989]">
      <span class="mr-1">Home</span>/<span class="ml-1">Account Details</span>
    </div>
    <div class="grid md:grid-cols-5 gap-5">
      <AccountNav />
      <div class="md:col-span-4 md:pr-[100px]">
        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
        >
          {{ successMessage }}
        </div>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
        >
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="full-name grid lg:grid-cols-2 gap-2">
            <div class="mb-4">
              <label
                for="oldPassword"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Old Password *
              </label>
              <input
                type="text"
                id="oldPassword"
                v-model="oldPassword"
                class="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                required
                placeholder="Old Password"
                :disabled="isLoading"
              />
            </div>
            <div class="mb-4">
              <label
                for="user_last_name"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password *
              </label>
              <input
                type="text"
                id="newPassword"
                v-model="newPassword"
                class="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                required
                placeholder="New Password"
                :disabled="isLoading"
              />
            </div>
          </div>

          <div class="mb-4">
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full mt-5 py-4 px-4 bg-[#D22245] text-white font-semibold hover:bg-[#00512F] uppercase font-poppins rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <span
                v-if="isLoading"
                class="mr-2"
              >
                <svg
                  class="animate-spin h-5 w-5 text-white"
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
              </span>
              {{ isLoading ? "Updating..." : "Update Details" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useAuth } from "../../composables/useAuth.js";
  import { customerPassword } from "../../services/customer.js";
  import AccountNav from "../account/AccountNav.vue";

  const router = useRouter();
  const { user, initAuth, setAuth, logout } = useAuth();

  const isLoading = ref(false);
  const successMessage = ref("");
  const errorMessage = ref("");

  const oldPassword = ref("");
  const newPassword = ref("");

  // Handle form submission
  const handleSubmit = async () => {
    console.log("test");
    // Clear previous messages
    successMessage.value = "";
    errorMessage.value = "";

    isLoading.value = true;

    try {
      const response = await customerPassword.reset({
        oldPassword: oldPassword.value, // Access ref values here
        newPassword: newPassword.value, // Access ref values here
      });

      if (response.isSuccess) {
        successMessage.value = "Password Updated";

        logout();

        // Clear success message after 3 seconds
        setTimeout(() => {
          successMessage.value = "";
        }, 3000);
      } else {
        errorMessage.value = response.message || "Failed to update password.";
      }
    } catch (error) {
      console.error("Update error:", error);
      errorMessage.value =
        error.response?.data?.message ||
        "An error occurred while updating your password. Please try again.";
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    initAuth();

    // if (user.value) {
    //   // Initialize form with current user data
    //   userInfo.value = {
    //     user_first_name:
    //       user.value.first_name || user.value.user_first_name || "",
    //     user_last_name: user.value.last_name || user.value.user_last_name || "",
    //   };
    // } else {
    //   router.push("/login");
    // }
  });
</script>
