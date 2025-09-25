<template>
  <div class="bg-white px-4 md:px-20 py-10">

    <h1 class="text-3xl font-bold mb-2 text-[#4C4C4C] pl-2 md:pl-6">Wishlist</h1>
    <div class="h-1 w-full bg-secondary mb-8"></div>

    <!-- Breadcrumb -->
    <p class="text-sm text-gray-500 mb-6">Home / Wishlist</p>

    <div class="bg-[#F5F5F5] p-4 md:p-6 rounded-md">
      <!-- Table Header -->
      <div class="hidden md:grid grid-cols-4 font-semibold text-center text-sm pb-4">
        <div class="text-left">Products</div>
        <div>Price</div>
        <div>Stock Status</div>
        <div class="flex justify-end pr-4">
          <button class="bg-black text-white px-4 py-2 text-sm rounded flex items-center gap-2"
            @click="removeAllWishlist">
            <img src="../assets/product/delete.png" alt="delete icon" class="w-5 h-5" />
            DELETE ALL
          </button>
        </div>
      </div>

      <!-- Wishlist Items -->
      <div v-for="(item, index) in wishlist" :key="index"
        class="grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-4 md:gap-0 py-6 text-sm">
        <!-- Product -->
        <div class="flex items-center gap-4">
          <button class="w-5 h-5 text-gray-400" @click="removeFromWishlist(item)">
            <img src="../assets/product/close.png" alt="remove icon" />
          </button>
          <img :src="item.image || '/placeholder.png'" alt="product" class="w-12 h-16 object-cover" />
          <span>{{ item.title }}</span>
        </div>

        <!-- Price -->
        <div class="text-left md:text-center">
          Rs.{{ Number(item.price).toFixed(2) }}
        </div>

        <!-- Stock Status -->
        <div class="text-left md:text-center">
          <span :class="item.stock ? 'text-green-600' : 'text-secondary'">
            {{ item.stock ? 'In Stock' : 'Out of Stock' }}
          </span>
        </div>

        <!-- Actions -->
        <div class="flex md:justify-end text-xs text-gray-500 pr-0 md:pr-4">
          <div class="flex flex-col items-start md:items-end gap-1 w-full">
            <span>Added on {{ item.date }}</span>
            <button @click.stop="goToSingle(item)" :disabled="!item.stock" :class="[
              'px-8 py-2 rounded-lg text-white font-semibold w-full md:w-auto text-center',
              item.stock ? 'bg-secondary  hover:bg-primary cursor-pointer' : 'bg-gray-500 cursor-not-allowed'
            ]">
              {{ item.stock ? 'Add To Cart' : 'Out Of Stock' }}
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api.js";// your axios instance
import { useAuth } from "../composables/useAuth.js";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
import { encryptId } from "../utils/crypto.js";

const router = useRouter();
const wishlist = ref([]);
const { getAuthData } = useAuth();
const customerId = ref(null);

async function removeAllWishlist() {
  if (!customerId.value) return;

  try {
    // Call API to delete all wishlist items for this customer
    await api.delete(`/wishlist/all/${customerId.value}`);

    // Clear the local wishlist array
    wishlist.value = [];
    alert("All items removed from wishlist!");
  } catch (err) {
    console.error("Error removing all wishlist items:", err);
  }
} 
async function getWishlist() {
  if (!customerId.value) return;

  try {
    const res = await api.get(`/wishlist/${customerId.value}`);
    if (res.data.success) {
      wishlist.value = res.data.wishlist.map(item => ({
        title: item.item_name,
        price: item.price,
        stock: item.stock > 0,
        date: dayjs(item.date).format("YYYY-MM-DD"),
        image: item.item_image_1 || '/placeholder.png',
        item_id: item.item_id,
        item_prid: item.item_prid,
      }));
    }
  } catch (err) {
    console.error("Error fetching wishlist:", err);
  }
}

async function removeFromWishlist(item) {
  try {
    await api.delete(`/wishlist/${item.item_id}/${customerId.value}`);
    wishlist.value = wishlist.value.filter(i => i.item_id !== item.item_id);
  } catch (err) {
    console.error("Error removing item:", err);
  }
}

onMounted(() => {
  const authData = getAuthData();
  if (authData && authData.customerId) {
    customerId.value = authData.customerId;
    getWishlist();
  }
});

function goToSingle(card) {
  router.push({ name: "single", params: { id: encryptId(card.item_id) } });
}



</script>


<style scoped>
/* Optional custom styles if needed */
</style>
