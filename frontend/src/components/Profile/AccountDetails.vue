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
        <!--  -->
        <form @submit.prevent="handleSubmit(userInfo.value)">
          <div class="full-name grid lg:grid-cols-2 gap-2">
            <div class="mb-4">
              <label
                for="user_first_name"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="user_first_name"
                v-model="userInfo.user_first_name"
                class="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                required
                placeholder="First Name"
                :disabled="isLoading"
              />
            </div>
            <div class="mb-4">
              <label
                for="user_last_name"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="user_last_name"
                v-model="userInfo.user_last_name"
                class="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                required
                placeholder="Last Name"
                :disabled="isLoading"
              />
            </div>
            <div class="mb-4">
              <label
                for="user_last_name"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Street
              </label>
              <input
                type="text"
                id="address_street"
                v-model="userInfo.address_street"
                class="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                required
                placeholder="Street"
                :disabled="isLoading"
              />
            </div>
            <div class="mb-4">
              <label
                for="address_city"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <input
                type="text"
                id="address_city"
                v-model="userInfo.address_city"
                class="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                required
                placeholder="City"
                :disabled="isLoading"
              />
            </div>
            <div class="mb-4">
              <label
                for="address_state"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                State
              </label>
              <input
                type="text"
                id="address_state"
                v-model="userInfo.address_state"
                class="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                required
                placeholder="Street"
                :disabled="isLoading"
              />
            </div>
            <div class="mb-4">
              <label
                for="address_zip"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Zip
              </label>
              <input
                type="text"
                id="address_zip"
                v-model="userInfo.address_zip"
                class="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                required
                placeholder="Zip"
                :disabled="isLoading"
              />
            </div>
            <div class="mb-4">
              <label
                for="address_country"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Country
              </label>
              <input
                type="text"
                id="address_country"
                v-model="userInfo.address_country"
                class="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                required
                placeholder="Country"
                :disabled="isLoading"
              />
            </div>
          </div>
          <!-- @click="customerUpdate(userInfo)" -->
          <div class="mb-4">
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full mt-5 py-4 px-4 bg-[#D22245] text-white font-semibold hover:bg-[#00512F] uppercase font-poppins rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <span v-if="isLoading" class="mr-2">
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
import AccountNav from "../account/AccountNav.vue";
import api from "../../services/api.js";

const router = useRouter();
const {
  user,
  logout: authLogout,
  initAuth,
  setAuth,
  getAuthData,
  fetchUserById,
} = useAuth();

// Reactive data
const userInfo = ref({
  token: "",
  user_id: "",
  user_first_name: "",
  user_last_name: "",
  user_contact: "",
  address_street: "",
  address_city: "",
  address_state: "",
  address_zip: "",
  address_country: "",
});
const isLoading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const logout = () => {
  authLogout();
};

const handleSubmit = async (updateData) => {
  successMessage.value = "";
  errorMessage.value = "";

  // Validate required fields
  if (!userInfo.value.user_first_name || !userInfo.value.user_last_name) {
    errorMessage.value = "First name and last name are required.";
    return;
  }

  try {
    isLoading.value = true;
    
    const response = await api.put(`/customers/update/${userInfo.value.user_id}`, {
      firstName: userInfo.value.user_first_name,
      lastName: userInfo.value.user_last_name,
      addressStreet: userInfo.value.address_street,
      addressCity: userInfo.value.address_city,
      addressState: userInfo.value.address_state,
      addressZip: userInfo.value.address_zip,
      addressCountry: userInfo.value.address_country,
    });

    console.log("Update success:", response.data);
    successMessage.value =
      "Your account details have been updated successfully.";
    return response.data;
  } catch (error) {
    console.error("Update failed:", error.response?.data || error.message);
    errorMessage.value =
      error.response?.data?.message ||
      "An error occurred while updating your details. Please try again.";
    throw error;
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  // Initialize authentication state
  initAuth();

  const authData = getAuthData();

  if (authData && authData.customerId) {
    try {
      // Fetch full user details
      const customer = await fetchUserById(authData.customerId);
      console.log("Fetched Customer:", customer);

      if (customer) {
        userInfo.value = {
          token: authData.token,
          user_id: customer.customer_id || "",
          user_first_name: customer.user_first_name || "",
          user_last_name: customer.user_last_name || "",
          user_contact: customer.user_contact || "",
          address_street: customer.address_street || "",
          address_city: customer.address_city || "",
          address_state: customer.address_state || "",
          address_zip: customer.address_zip || "",
          address_country: customer.address_country || "",
        };
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
      router.push("/login");
    }
  } else {
    // If no user data, redirect to login
    router.push("/login");
  }
});

// // Handle form submission
// const handleSubmit = async () => {
//   // Clear previous messages
//   successMessage.value = "";
//   errorMessage.value = "";

//   // Validate required fields
//   if (!userInfo.value.user_first_name || !userInfo.value.user_last_name) {
//     errorMessage.value = "First name and last name are required.";
//     return;
//   }

//   isLoading.value = true;

//   // Prepare update data with default empty strings for address fields
//   const updateData = {
//     user_first_name: userInfo.value.user_first_name,
//     user_last_name: userInfo.value.user_last_name,
//     user_contact: userInfo.value.user_contact || "",
//     address_street: userInfo.value.address_street || "",
//     address_city: userInfo.value.address_city || "",
//     address_state: userInfo.value.address_state || "",
//     address_zip: userInfo.value.address_zip || "",
//     address_country: userInfo.value.address_country || "",
//   };

//   try {
//     const response = await customerUpdate.update(updateData);

//     if (response.isSuccess) {
//       successMessage.value = "Account details updated successfully!";

//       // Update the user object with all the updated fields including address
//       const updatedUser = {
//         ...user.value,
//         first_name: userInfo.value.user_first_name,
//         last_name: userInfo.value.user_last_name,
//         contact: userInfo.value.user_contact,
//         // Include address fields in the user object
//         address_street: userInfo.value.address_street,
//         address_city: userInfo.value.address_city,
//         address_state: userInfo.value.address_state,
//         address_zip: userInfo.value.address_zip,
//         address_country: userInfo.value.address_country,
//       };

//       // Update auth state with new user data
//       setAuth({
//         access_token: localStorage.getItem("access_token"),
//         refresh_token: localStorage.getItem("refresh_token"),
//         user: updatedUser,
//       });

//       // Clear success message after 3 seconds
//       setTimeout(() => {
//         successMessage.value = "";
//       }, 3000);
//     } else {
//       errorMessage.value =
//         response.message || "Failed to update account details.";
//     }
//   } catch (error) {
//     console.error("Update error:", error);
//     errorMessage.value =
//       error.response?.data?.message ||
//       "An error occurred while updating your details. Please try again.";
//   } finally {
//     isLoading.value = false;
//   }
// };
// const getCustomer = async () => {
//   try {
//     const response = await customerGet.get();

//     if (response.isSuccess && response.value) {
//       // Ensure response.value is an object to prevent errors
//       const responseData =
//         typeof response.value === "object" && response.value !== null
//           ? response.value
//           : {};

//       // Safely merge the response data with existing userInfo
//       // This ensures we don't overwrite existing values with undefined
//       userInfo.value = {
//         ...userInfo.value,
//         user_first_name:
//           responseData.user_first_name ||
//           userInfo.value.user_first_name ||
//           "",
//         user_last_name:
//           responseData.user_last_name || userInfo.value.user_last_name || "",
//         user_contact:
//           responseData.user_contact || userInfo.value.user_contact || "",
//         address_street:
//           responseData.address_street || userInfo.value.address_street || "",
//         address_city:
//           responseData.address_city || userInfo.value.address_city || "",
//         address_state:
//           responseData.address_state || userInfo.value.address_state || "",
//         address_zip:
//           responseData.address_zip || userInfo.value.address_zip || "",
//         address_country:
//           responseData.address_country ||
//           userInfo.value.address_country ||
//           "",
//       };
//     }
//   } catch (error) {
//     console.error("Get error:", error);
//     errorMessage.value =
//       error.response?.data?.message ||
//       "An error occurred while fetching your details. Please try again.";
//   }
// };

// Customer update service
// const customerUpdate = async (userData) => {
//   try {
//     const response = await api.put(`/customers/update/${userData.id}`, userData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }
</script>
