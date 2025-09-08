<template>
  <div class="px-5 md:px-20 py-10">
    <h1 class="text-3xl font-semibold text-[#4C4C4C] mb-2">Shopping Cart</h1>
    <div class="h-1 bg-secondary w-full mb-4"></div>
    <p class="text-sm text-[#898989] mb-6">Home / Shopping Cart</p>

    <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
      <!-- Products Table -->
      <div class="col-span-2 bg-[#F5F5F5]">
        <div class="hidden md:grid grid-cols-4 gap-4 px-6 py-4 font-semibold">
          <span>Products</span><span>Price</span><span>Quantity</span><span>Subtotal</span>
        </div>

        <div v-for="(product,index) in products" :key="product.id"
             class="flex flex-col md:grid md:grid-cols-4 gap-4 items-center md:items-center text-center md:text-left px-6 py-6 border-b border-[#EEEEEE]">
          
          <!-- Product -->
          <div class="flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-4 w-full md:w-auto">
            <img :src="product.image" :alt="product.name" class="w-12 h-16 object-cover rounded" />
            <div class="flex flex-col">
              <span class="text-sm text-gray-700 font-semibold">{{ product.name }}</span>
              <span class="text-xs text-gray-500">{{ product.variationsnames }}</span>
            </div>
          </div>

          <!-- Price -->
          <div class="text-sm text-gray-700 mt-2 md:mt-0">Rs.{{ formatPrice(product.price) }}</div>

          <!-- Quantity -->
          <div class="flex items-center justify-center space-x-2 mt-2 md:mt-0">
            <button class="border px-2 py-1 text-sm" @click="decreaseQty(index)">-</button>
            <span class="px-3 py-1 border">{{ product.quantity }}</span>
            <button class="border px-2 py-1 text-sm" @click="increaseQty(index)">+</button>
            <button class="ml-2" @click="removeItem(index)">
              <img src="../assets/product/black.png" alt="delete icon" class="w-5 h-5" />
            </button>
          </div>

          <!-- Subtotal -->
          <div class="text-sm text-gray-700 mt-2 md:mt-0">Rs.{{ formatPrice(product.price * product.quantity) }}</div>
        </div>
      </div>

      <!-- Summary -->
      <div class="bg-[#F5F5F5] mt-2 lg:mt-0 w-full p-6 lg:ml-0 md:h-[270px]">
        <div class="flex justify-between mb-3"><span>Subtotal</span><span>Rs.{{ formatPrice(subtotal) }}</span></div>
        <div class="flex justify-between mb-3"><span>Discount</span><span>10%</span></div>
        <div class="flex justify-between mb-3"><span>Shipping</span><span>Free</span></div>
        <div class="flex justify-between font-semibold text-lg mt-4 border-t border-[#EEEEEE] pt-4">
          <span>Total</span><span>Rs.{{ formatPrice(total) }}</span>
        </div>

        <router-link to="/checkout">
          <button class="w-full mt-6 bg-secondary text-white py-2 rounded font-medium hover:bg-red-700 transition">
            PROCEED TO CHECKOUT
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const products = ref([]);

// Load cart from localStorage
onMounted(() => {
  const stored = localStorage.getItem("cart");
  if(stored) products.value = JSON.parse(stored);
});

// Update localStorage
function updateCart() { localStorage.setItem("cart", JSON.stringify(products.value)); }

const subtotal = computed(() => products.value.reduce((sum, i)=>sum + i.price*i.quantity,0));
const total = computed(() => subtotal.value*0.9); // 10% discount

const increaseQty = (i)=>{ products.value[i].quantity++; updateCart(); }
const decreaseQty = (i)=>{ if(products.value[i].quantity>1){products.value[i].quantity--; updateCart();} }
const removeItem = (i)=>{ products.value.splice(i,1); updateCart(); }

const formatPrice = (val) => Number(val).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2});
</script>
