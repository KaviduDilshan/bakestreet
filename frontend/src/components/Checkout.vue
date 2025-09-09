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
      <!-- Products -->
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
                class="w-[48.22px] h-[61px] object-cover rounded"
              />
              <div
                class="font-quicksand font-[400] text-[15px] text-text-color"
              >
                {{ product.name }}
                <span class="text-xs text-gray-500">{{ product.variationsnames }}</span>
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

      <!-- Right Section -->
      <div class="bg-[#F5F5F5] py-5 mt-2">
        <!-- Checkbox for Existing Customer -->
        <label class="flex items-center ml-5 cursor-pointer mb-5">
          <input
            type="checkbox"
            v-model="isExistingCustomer"
            class="hidden peer"
          />
          <div
            class="font-quicksand grid place-items-center w-[20px] h-[20px] border border-[#494949]/70 rounded-[8px] bg-white peer-checked:bg-[url('../assets/img/checkout/correct-icon.png')] peer-checked:bg-no-repeat peer-checked:bg-center peer-checked:bg-[length:13px_13px]"
          ></div>
          <span
            class="font-quicksand font-[500] p-3 text-[#818181] text-[12px]"
          >
            You are an existing customer
          </span>
        </label>

        <!-- Billing & Card Info (hidden if existing customer) -->
        <div v-if="!isExistingCustomer" class="md:grid md:grid-cols-2 px-5 gap-5 mb-5">
          <div class="">
            <div
              class="font-quicksand font-[700] text-[15px] text-[#000000] text-start pb-5"
            >
              Billing Address
            </div>
            <input
              type="text"
              placeholder="Full Name"
              class="font-quicksand font-[500] py-3 text-[12px] bg-white border border-[#494949]/70 rounded-[8px] text-[#818181] pl-3 w-full"
            />
            <input
              type="text"
              placeholder="Phone"
              class="font-quicksand mt-5 font-[500] py-3 text-[12px] bg-white border border-[#494949]/70 rounded-[8px] text-[#818181] pl-3 w-full"
            />
            <input
              type="text"
              placeholder="Email"
              class="font-quicksand mt-5 font-[500] py-3 text-[12px] bg-white border border-[#494949]/70 rounded-[8px] text-[#818181] pl-3 w-full"
            />
            <input
              type="text"
              placeholder="Address 1"
              class="font-quicksand mt-5 font-[500] py-3 text-[12px] bg-white border border-[#494949]/70 rounded-[8px] text-[#818181] pl-3 w-full"
            />
            <input
              type="text"
              placeholder="Address 2"
              class="font-quicksand mt-5 font-[500] py-3 text-[12px] bg-white border border-[#494949]/70 rounded-[8px] text-[#818181] pl-3 w-full"
            />
            <input
              type="text"
              placeholder="City"
              class="font-quicksand mt-5 font-[500] py-3 text-[12px] bg-white border border-[#494949]/70 rounded-[8px] text-[#818181] pl-3 w-full"
            />
            <div class="flex gap-5">
              <select
                class="font-quicksand mt-5 font-[500] p-3 text-[12px] bg-white border border-[#494949]/70 rounded-[8px] text-[#818181] pl-3 pr-10 w-full appearance-none bg-[url('../assets/img/checkout/drop-down.png')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:12px_7px]"
              >
                <option disabled selected>Select States</option>
                <option value="state1">State 1</option>
                <option value="state2">State 2</option>
                <option value="state3">State 3</option>
              </select>
              <input
                type="text"
                placeholder="Zip Code"
                class="font-quicksand mt-5 font-[500] py-3 text-[12px] bg-white border border-[#494949]/70 rounded-[8px] text-[#818181] pl-3 w-full"
              />
            </div>
          </div>
          <div class="mt-5 md:mt-0">
            <div
              class="font-quicksand font-[700] text-[15px] text-[#000000] text-start pr-3"
            >
              Credit Card Info
            </div>
            <input
              type="text"
              placeholder="Name on Card"
              class="font-quicksand mt-5 font-[500] py-3 text-[12px] bg-white border border-[#494949]/70 rounded-[8px] text-[#818181] pl-3 w-full"
            />
            <input
              type="text"
              placeholder="Card Number"
              class="font-quicksand mt-5 font-[500] py-3 text-[12px] bg-white border border-[#494949]/70 rounded-[8px] text-[#818181] pl-3 w-full"
            />
            <div class="md:flex gap-5">
              <input
                type="text"
                placeholder="CVV"
                class="font-quicksand mt-5 font-[500] py-3 text-[12px] bg-white border border-[#494949]/70 rounded-[8px] text-[#818181] pl-3 w-full"
              />
              <select
                class="font-quicksand mt-5 font-[500] p-3 text-[12px] bg-white border border-[#494949]/70 rounded-[8px] text-[#818181] pl-3 pr-10 w-full appearance-none bg-[url('../assets/img/checkout/drop-down.png')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:12px_7px]"
              >
                <option disabled selected>Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
              </select>
              <select
                class="font-quicksand mt-5 font-[500] p-3 text-[12px] bg-white border border-[#494949]/70 rounded-[8px] text-[#818181] pl-3 pr-10 w-full appearance-none bg-[url('../assets/img/checkout/drop-down.png')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:12px_7px]"
              >
                <option disabled selected>Year</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>
          </div>
        </div>

        <label class="flex items-center ml-5 cursor-pointer">
          <input type="checkbox" class="hidden peer" />
          <div
            class="font-quicksand grid place-items-center w-[20px] h-[20px] border border-[#494949]/70 rounded-[8px] bg-white peer-checked:bg-[url('../assets/img/checkout/correct-icon.png')] peer-checked:bg-no-repeat peer-checked:bg-center peer-checked:bg-[length:13px_13px]"
          ></div>
          <span
            class="font-quicksand font-[500] p-3 text-[#818181] text-[12px]"
          >
            Use Current Billing address as Delivery address
          </span>
        </label>
        <div class="w-full px-5 mt-5">
          <div
  @click="submitOrder"
  class="cursor-pointer text-[24px] text-center place-items-center font-quicksand font-[700] uppercase text-[#FFFFFF] bg-secondary rounded-[8px] py-[10px]"
>
  RS.{{ formatPrice(total) }}
</div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../services/api.js"; // axios instance
import { useRouter } from "vue-router";

const router = useRouter();
const products = ref([]);
const isExistingCustomer = ref(false);

// Load cart from localStorage
onMounted(() => {
  const stored = localStorage.getItem("cart");
  if (stored) products.value = JSON.parse(stored);
});

// Subtotal
const subtotal = computed(() =>
  products.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

// Total (after 10% discount)
const total = computed(() => subtotal.value * 0.9);

// Format price
const formatPrice = (val) =>
  Number(val).toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const payNow = (order) => {
  const query = new URLSearchParams({order}).toString();
  window.location.href = `http://localhost:5000/api/v1/e-commerce/payhere/pay?${query}`;
};

// Submit order when Total button is clicked
const submitOrder = async () => {
  if (!products.value.length) {
    // Cart is empty, do nothing
    return;
  }

  try {
    const orderCode = Math.floor(Math.random() * 1000000); // generate unique order code

    const response = await api.post("/orders", {
      order_code: orderCode,
      products: products.value,
    });

    if (response.data.success) {

      /// REDIRECT TO PAYHERE AFTER ORDER SAVE INTO DB

      payNow(orderCode)

      // END - REDIRECT TO PAYHERE

      localStorage.removeItem("cart"); // clear cart
      products.value = [];
      router.push("/paymentsuccessfull"); // redirect
    } 
    // no alerts for failure either
  } catch (err) {
    console.error(err); // keep console log for debugging
    // no alert
  }
};
</script>


