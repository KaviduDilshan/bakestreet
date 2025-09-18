<template>
  <div class="flex flex-col justify-center lg:px-20 px-5 bg-white">
    <div class="w-full flex justify-start mb-8">
      <span
        class="text-[20px] md:text-[32px] font-quicksand font-[700] pb-2 border-b-4 border-primary w-full text-[#4C4C4C] md:pt-8 pl-6 pt-2"
      >
        Checkout
      </span>
    </div>

    <div class="ml-2 font-quicksand pb-5 font-[600] text-[11px] text-[#898989]">
      <span class="mr-1">Home</span>/<span class="ml-1">Checkout</span>
    </div>

    <div class="grid lg:grid-cols-2 gap-2">
      <!-- ================= LEFT (Products) ================= -->
      <div class="bg-[#F5F5F5] py-5">
        <div class="flex justify-between md:px-20 mb-5">
          <div
            class="font-quicksand font-[700] text-[15px] text-[#000000] text-start pl-3"
          >
            Products
          </div>
          <div
            class="font-quicksand font-[700] text-[15px] text-[#000000] text-end pr-3"
          >
            Price
          </div>
        </div>

        <div
          v-for="(product, index) in products"
          :key="index"
          class="flex justify-between px-3 md:px-20 py-5 items-center"
        >
          <div
            class="font-quicksand font-[700] text-[15px] text-[#000000] ml-3"
          >
            <div
              class="md:flex items-center gap-1 md:gap-10 justify-items-center"
            >
              <img
                :src="product.image"
                :alt="product.name"
                class="w-[48px] h-[61px] object-cover rounded"
              />
              <div
                class="font-quicksand font-[400] text-[15px] text-text-color"
              >
                {{ product.name }}
                <span class="text-xs text-gray-500">{{
                  product.variationsnames
                }}</span>
              </div>
              <div
                class="font-quicksand font-[400] text-[15px] text-text-color"
              >
                Qty {{ product.quantity }}
              </div>
            </div>
          </div>
          <div
            class="font-quicksand text-center font-[600] text-[15px] text-[#000000]"
          >
            Rs.{{ formatPrice(product.price * product.quantity) }}
          </div>
        </div>

        <!-- Total -->
        <div class="flex justify-between px-3 md:px-20 py-2 items-center">
          <div
            class="font-quicksand font-[500] text-[15px] justify-start text-text-color md:pl-[110px]"
          >
            Subtotal
          </div>
          <div
            class="font-quicksand text-center font-[600] text-[15px] text-text-color"
          >
            Rs.{{ formatPrice(subtotal) }}
          </div>
        </div>
        <div class="flex justify-between px-3 md:px-20 py-2 items-center">
          <div
            class="font-quicksand font-[500] text-[15px] justify-start text-text-color md:pl-[110px]"
          >
            Discount
          </div>
          <div
            class="font-quicksand text-center font-[600] text-[15px] text-text-color"
          >
            10%
          </div>
        </div>
        <div class="flex justify-between px-3 md:px-20 py-2 items-center">
          <div
            class="font-quicksand font-[500] text-[15px] justify-start text-text-color md:pl-[110px]"
          >
            Shipping
          </div>
          <div
            class="font-quicksand text-center font-[600] text-[15px] text-text-color"
          >
            Free
          </div>
        </div>
        <div class="flex justify-between px-3 md:px-20 py-5 items-center">
          <div
            class="font-quicksand font-[700] text-[20px] justify-start text-text-color md:pl-[110px]"
          >
            Total
          </div>
          <div
            class="font-quicksand text-center font-[700] text-[20px] text-text-color"
          >
            Rs.{{ formatPrice(total) }}
          </div>
        </div>
      </div>

      <!--================= Right Section (Register / Login / Billing) -->
      <div class="bg-[#F5F5F5] py-5 mt-2">
        <!-- Checkbox for Existing Customer -->
        <!-- <div v-if="!isExistingCustomer" class="ml-5 space-y-3 mb-4">
          <label class="flex items-center ml-5 cursor-pointer mb-5">
            <input
              type="checkbox"
              v-model="isExistingCustomerButNotLogin"
              class="w-[20px] h-[20px] accent-green-600 rounded mr-2 cursor-pointer"
            />
            <span class="font-quicksand font-[500] text-[#818181] text-[12px]"
              >Are you an existing customer?</span
            >
          </label>

          <div v-if="!isExistingCustomerButNotLogin">
            <div
              class="font-quicksand font-[700] text-[15px] text-[#000000] text-start pb-5"
            >
              Register Details
            </div>

            <div class="mb-3">
              <input
                type="text"
                v-model="first_name"
                placeholder="First name"
                class="w-full md:w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>

            <div class="mb-3">
              <input
                type="text"
                v-model="last_name"
                placeholder="Last name"
                class="w-full md:w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>

            <div class="mb-3">
              <input
                type="text"
                v-model="phone"
                placeholder="7xxxxxxxx"
                @input="validatePhone"
                class="w-full md:w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
              <p v-if="phoneError" class="text-red-500 text-xs mt-1">
                {{ phoneError }}
              </p>
            </div>

            <div class="mb-3">
              <input
                type="password"
                v-model="password"
                placeholder="Enter Password"
                class="w-full md:w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              />
              <p v-if="passwordError" class="text-red-500 text-xs mt-1">
                {{ passwordError }}
              </p>
            </div>
          </div>

          <div v-if="isExistingCustomerButNotLogin">
            <div
              class="font-quicksand font-[700] text-[15px] text-[#000000] text-start pb-5"
            >
              Login Details
            </div>

            <div class="mb-3">
              <input
                type="text"
                v-model="phone"
                placeholder="7xxxxxxxx"
                @input="validatePhone"
                class="w-full md:w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
              <p v-if="phoneError" class="text-red-500 text-xs mt-1">
                {{ phoneError }}
              </p>
            </div>

            <div class="mb-3">
              <input
                type="password"
                v-model="password"
                placeholder="Enter Password"
                class="w-full md:w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              />
              <p v-if="passwordError" class="text-red-500 text-xs mt-1">
                {{ passwordError }}
              </p>
            </div>
          </div>
        </div> -->

        <!-- Billing & Card Info (hidden if existing customer) -->
        <div
          v-if="!isExistingCustomerButNotLogin"
          class="md:grid md:grid-cols-2 px-5 gap-5 mb-5"
        >
          <div>
            <div
              class="font-quicksand font-[700] text-[15px] text-[#000000] text-start pb-5"
            >
              Billing Address
            </div>
            <input
              type="text"
              placeholder="Full Name"
              v-model="billingDetails.fullname"
              class="font-quicksand font-[500] py-3 text-[12px] bg-white border border-[#494949]/70 rounded-[8px] text-[#818181] pl-3 w-full"
            />
            <input
              type="text"
              placeholder="Phone"
              v-model="billingDetails.contact"
              class="font-quicksand mt-5 font-[500] py-3 text-[12px] bg-white border border-[#494949]/70 rounded-[8px] text-[#818181] pl-3 w-full"
            />
            <input
              type="text"
              placeholder="Address 1"
              v-model="billingDetails.addressStreet"
              class="font-quicksand mt-5 font-[500] py-3 text-[12px] bg-white border border-[#494949]/70 rounded-[8px] text-[#818181] pl-3 w-full"
            />
            <input
              type="text"
              placeholder="City"
              v-model="billingDetails.addressCity"
              class="font-quicksand mt-5 font-[500] py-3 text-[12px] bg-white border border-[#494949]/70 rounded-[8px] text-[#818181] pl-3 w-full"
            />
            <select
              v-model="billingDetails.addressState"
              class="font-quicksand mt-5 font-[500] p-3 text-[12px] bg-white border border-[#494949]/70 rounded-[8px] w-full"
            >
              <option disabled selected>Select State</option>
              <option value="Central">Central</option>
              <option value="Western">Western</option>
              <option value="Eastern">Eastern</option>
            </select>
            <input
              type="text"
              placeholder="Zip Code"
              v-model="billingDetails.addressZip"
              class="font-quicksand mt-5 font-[500] py-3 text-[12px] bg-white border border-[#494949]/70 rounded-[8px] text-[#818181] pl-3 w-full"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div v-if="!isExistingCustomerButNotLogin" class="w-full px-5 mt-5">
          <button
            :disabled="!isExistingCustomer"
            @click="submitOrder"
            class="w-full cursor-pointer text-[24px] text-center font-quicksand font-[700] uppercase text-[#FFFFFF] bg-secondary rounded-[8px] py-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            RS.{{ formatPrice(total) }}
          </button>
        </div>
        <!-- login and continue -->
        <!-- <div v-if="isExistingCustomerButNotLogin" class="w-full px-5 mt-5">
          <button
            :disabled="!isFormValid || !isExistingCustomerButNotLogin"
            @click="submitOrder"
            class="w-full cursor-pointer text-[24px] text-center font-quicksand font-[700] uppercase text-[#FFFFFF] bg-secondary rounded-[8px] py-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login & Continue
          </button> 
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../services/api.js";
import { useAuth } from "../composables/useAuth.js";
import { login_register } from "../services/login_register.js";

const { initAuth, getAuthData, fetchUserById } = useAuth();
const { loginUser, registerUser } = login_register();

const products = ref([]);
const isExistingCustomer = ref(false);
// const isExistingCustomerButNotLogin = ref(false);
// const phone = ref("");
// const password = ref("");
const phoneError = ref("");
const passwordError = ref("");
const errorMessage = ref("");

const billingDetails = ref({
  token: "",
  user_id: "",
  fullname: "",
  contact: "",
  addressStreet: "",
  addressCity: "",
  addressState: "",
  addressZip: "",
});

// Load cart
onMounted(() => {
  const stored = localStorage.getItem("cart");
  if (stored) products.value = JSON.parse(stored);
});

// Price calculations
const subtotal = computed(() =>
  products.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
const total = computed(() => subtotal.value * 0.9);
const formatPrice = (val) =>
  Number(val).toLocaleString("en-LK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// Validate Phone
function validatePhone() {
  const val = phone.value.trim();

  if (!val) {
    phoneError.value = "Phone number is required";
    return false;
  }

  if (!/^[0-9]{9}$/.test(val)) {
    phoneError.value = "Phone number must be exactly 9 digits";
    return false;
  }

  if (!val.startsWith("7")) {
    phoneError.value = "Phone number must start with 7";
    return false;
  }

  const validPrefixes = ["70", "71", "72", "73", "74", "75", "76", "77", "78"];
  if (!validPrefixes.includes(val.substring(0, 2))) {
    phoneError.value = "Please enter a valid Sri Lankan mobile number";
    return false;
  }

  phoneError.value = "";
  return true;
}

// Validate Password
function validatePassword() {
  if (!password.value.trim()) {
    passwordError.value = "Password is required";
    return false;
  }
  passwordError.value = "";
  return true;
}

// Form valid
// const isFormValid = computed(() => {
//   return validatePhone() && validatePassword();
// });

// Fetch user info if logged in
onMounted(async () => {
  localStorage.removeItem("nextHiddenPath");
  // Initialize authentication state
  initAuth();

  const authData = getAuthData();
  if (authData && authData.customerId) {
    isExistingCustomer.value = true;
    try {
      // Fetch full user details
      const customer = await fetchUserById(authData.customerId);
      

      if (customer) {
        console.log("Fetched Phone Number:", customer.user_username);
        
        billingDetails.value = {
          token: authData.token,
          user_id: customer.customer_id || "",
          fullname:
            customer.user_first_name + " " + customer.user_last_name || "",
          contact: customer.user_username || "",
          addressStreet: customer.address_street || "",
          addressCity: customer.address_city || "",
          addressState: customer.address_state || "",
          addressZip: customer.address_zip || ""
          // ...customer, // spread full user info from API
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

// Submit order
const submitOrder = async () => {
  if (
    !products.value.length ||
    (isExistingCustomer.value && !isFormValid.value)
  )
    return;

  try {
    const orderCode = Math.floor(Math.random() * 1000000);

    const orderRes = await api.post("/order", {
      order_code: orderCode,
      products: products.value,
      phone: phone.value,
      password: password.value,
      isExisting: isExistingCustomer.value,
      billingDetails: !isExistingCustomer.value ? billingDetails.value : null,
    });

    if (!orderRes.data.success) return;

    const rowRes = await api.post("/order_row", {
      order_code: orderCode,
      products: products.value,
    });

    if (rowRes.data.success) {
      localStorage.removeItem("cart");
      products.value = [];
      window.location.href = `http://localhost:5000/api/v1/e-commerce/payhere/pay?order=${orderCode}`;
    }
  } catch (err) {
    console.error("Checkout error:", err);
  }
};
</script>
