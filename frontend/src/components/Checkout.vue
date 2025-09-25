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

    <div class="grid lg:grid-cols-3 gap-2">
      <!-- ================= LEFT (Products) ================= -->
      <div class="bg-[#F5F5F5] py-5 lg:col-span-2">
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
        

        <!-- Billing & Card Info (hidden if existing customer) -->
        <div v-if="!isExistingCustomerButNotLogin" class="w-full px-5 mb-5">
          <!-- md:grid md:grid-cols-2 px-5 gap-5 mb-5 -->
          <div>
            <div
              class="font-quicksand font-[700] text-[15px] text-[#000000] text-start pb-5"
            >
              Billing Address
            </div>
            <div
              v-if="errorMessage"
              class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
            >
              {{ errorMessage }}
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
            <p v-if="phoneError" class="text-red-500 text-sm mt-1">
              {{ phoneError }}
            </p>
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

            <h2
              class="text-[15px] mb-3 mt-3 text-sky-600 font-semibold text-left"
            >
              Payment Method
            </h2>
            <div class="w-full flex gap-3">
              <label
                for="payment-online"
                class="flex items-center gap-3 cursor-pointer font-quicksand font-[500] text-[12px] bg-white border border-[#494949]/70 rounded-[8px] px-4 py-3 text-[#818181] hover:bg-sky-50 flex-1"
              >
                <input
                  type="radio"
                  value="1"
                  class="cursor-pointer"
                  v-model="billingDetails.paymentMethod"
                />
                <span class="text-gray-700">ONLINE PAYMENT</span>
              </label>

              <label
                for="payment-cod"
                class="flex items-center gap-3 cursor-pointer font-quicksand font-[500] text-[12px] bg-white border border-[#494949]/70 rounded-[8px] px-4 py-3 text-[#818181] hover:bg-sky-50 flex-1"
              >
                <input
                  type="radio"
                  value="2"
                  class="cursor-pointer"
                  v-model="billingDetails.paymentMethod"
                />
                <span class="text-gray-700">CASH ON DELIVERY</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div v-if="!isExistingCustomerButNotLogin" class="w-full px-5 mt-5">
          <button
            @click="submitOrder"
            class="w-full cursor-pointer text-[24px] text-center font-quicksand font-[700] uppercase text-[#FFFFFF] bg-secondary rounded-[8px] py-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            RS.{{ formatPrice(total) }}
          </button>
        </div>

        <!-- Popup -->
        <div
          v-if="showPopup"
          class="fixed inset-0 w-200 flex items-center justify-center bg-black/50"
        >
          <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 class="text-xl font-semibold mb-2">🎉 Thank you!</h2>
            <p>Your order has been placed successfully.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../services/api.js";
import { useAuth } from "../composables/useAuth.js";
import { login_register } from "../services/login_register.js";
import router from "../router/index.js";

const { initAuth, getAuthData, fetchUserById } = useAuth();
// const { loginUser, registerUser } = login_register();

const products = ref([]);
const isExistingCustomer = ref(false);
const phoneError = ref("");
const errorMessage = ref("");
const showPopup = ref(false);
const billingDetails = ref({
  token: "",
  user_id: "",
  fullname: "",
  contact: "",
  addressStreet: "",
  addressCity: "",
  addressState: "",
  addressZip: "",
  paymentMethod: "",
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
function validatePhone(phone) {
  const val = phone.trim();

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

// Fetch user info if logged in
onMounted(async () => {
const stored = localStorage.getItem("cart");
  if (stored) {
    products.value = JSON.parse(stored);
  }

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
          contact: (customer.user_username || "").slice(-9),
          addressStreet: customer.address_street || "",
          addressCity: customer.address_city || "",
          addressState: customer.address_state || "",
          addressZip: customer.address_zip || "",
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
  if (!products.value.length) return;

  if (
    !billingDetails.value.fullname.trim() ||
    !billingDetails.value.contact.trim() ||
    !billingDetails.value.addressStreet.trim() ||
    !billingDetails.value.addressCity.trim() ||
    !billingDetails.value.addressState.trim() ||
    !billingDetails.value.addressZip.trim()
  ) {
    errorMessage.value = "Please fill in all billing details.";
    return;
  }
  if (!validatePhone(billingDetails.value.contact)) {
    errorMessage.value = "Please enter a valid phone number.";
    return;
  }

  if (!billingDetails.value.paymentMethod) {
    errorMessage.value = "Please select a payment method.";
    return;
  } else if (billingDetails.value.paymentMethod) {

    try {
      const orderCode = Math.floor(Math.random() * 1000000);

      const orderRes = await api.post("/order", {
        order_code: orderCode,
        products: products.value,
        user_id: billingDetails.value.user_id,
        fullname: billingDetails.value.fullname,
        contact: billingDetails.value.contact,
        addressStreet: billingDetails.value.addressStreet,
        addressCity: billingDetails.value.addressCity,
        addressState: billingDetails.value.addressState,
        addressZip: billingDetails.value.addressZip,
        paymentMethod: billingDetails.value.paymentMethod,
      });

      if (!orderRes.data.success) {
        console.error("Order creation failed:", orderRes.data.message);
        return;
      }
      // alert("Redirecting to payment gateway...");

      const rowRes = await api.post("/order_row", {
        order_code: orderCode,
        products: products.value,
      });

      if (rowRes.data.success && billingDetails.value.paymentMethod === "1") {
        
        window.location.href = `http://localhost:5000/api/v1/e-commerce/payhere/pay`;
      } else {
        showPopup.value = true;

        // Hide after 3 seconds
        setTimeout(() => {
          showPopup.value = false; // hide popup
          localStorage.removeItem("cart"); // clear cart
          products.value = []; // reset products
          window.location.href = "/product"; // navigate to product page
        }, 2000);
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  }
};
</script>
