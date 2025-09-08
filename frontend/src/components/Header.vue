<template>
  <!-- Full Header (before scroll) -->
  <section
    v-if="!isScrolled"
    class="hidden lg:block sticky top-0 z-20"
    style="background: linear-gradient(to bottom, #ffffff 0%, #cfcfcf 100%)"
  >
    <!-- Top Bar -->
    <div class="flex justify-between pt-5 pb-5 md:px-20 px-5 border-b-[0.43px] border-[#D22245]">
      <div class="font-[700] font-quicksand text-secondary text-[12px]">
        Welcome to <span class="text-primary">Baker Street</span>
      </div>

      <!-- Authentication -->
      <div v-if="!isAuth" class="flex gap-3">
        <router-link to="/login">
          <div class="font-[700] font-quicksand text-text-color text-[15px]">Login</div>
        </router-link>
        <div class="font-[700] font-quicksand text-text-color text-[15px]">/</div>
        <router-link
          to="/create-account"
          class="font-[700] font-quicksand text-text-color text-[15px]"
        >
          Register
        </router-link>
      </div>
      <div v-else class="flex items-center gap-3">
        <div class="flex items-center gap-2">
          <img src="../assets/img/home/profile-icon.png" alt="Profile" class="w-[20px] h-[20px]" />
          <span class="font-[700] font-quicksand text-text-color text-[15px]">
            {{ userInfo.user_first_name || "User" }}
          </span>
        </div>
        <div class="font-[700] font-quicksand text-text-color text-[15px]">|</div>
        <button
          @click="logout"
          class="font-[700] font-quicksand text-text-color text-[15px] hover:text-[#D22245] transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>

    <!-- Main Header -->
    <div class="md:px-20 px-5 pt-2">
      <div class="grid lg:grid-cols-12 items-center">
        <!-- Logo -->
        <div class="lg:col-span-2">
          <router-link to="/">
            <img src="../assets/img/home/Logo.png" alt="Logo" class="w-[91px] h-[90px]" />
          </router-link>
        </div>

        <!-- Search Bar -->
        <div class="grid lg:col-span-7 h-[48px] w-[1000px] pl-20">
          <div class="flex">
            <div class="flex bg-[#FFFFFF] items-center rounded-l-[2px] border-text-color/10 p-2 lg:w-[580px]">
              <!-- Category Dropdown -->
              <div class="flex items-center gap-3 pl-3 border-r-[0.71px] pr-3 border-[#3E3E3E] py-2">
                <select
                  v-model="selectedMain"
                  @change="onMainChange($event.target.value)"
                  class="font-[600] font-quicksand text-text-color text-[15px] bg-transparent outline-none border-none"
                >
                  <option value="">All Categories</option>
                  <option v-for="c in categories" :key="c.mcategory_id" :value="c.mcategory_id">
                    {{ c.mcategory_name }}
                  </option>
                </select>
              </div>
              <!-- Search Input -->
              <input
                v-model="searchQuery"
                @input="searchProducts"
                type="text"
                placeholder="Search All Products..."
                class="w-full border-none outline-none px-3 text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
            <div
              class="bg-secondary h-full grid justify-items-center items-center w-[62px] rounded-r-[2px] cursor-pointer"
              @click="searchProducts"
            >
              <img src="../assets/img/home/searchIcon.png" alt="Search" class="w-[20px] h-[20px]" />
            </div>
          </div>
        </div>

        <!-- Account / Wishlist / Cart -->
        <div class="flex lg:col-span-3 justify-between">
          <router-link to="/profile">
            <div class="flex items-center gap-2">
              <img src="../assets/img/home/profile-icon.png" alt="Profile" class="w-[33px] h-[31px]" />
              <div>
                <div
                  v-if="!isAuth"
                  class="font-[400] font-quicksand text-text-color text-[12px]"
                >
                  Login
                </div>
                <div v-else class="font-[400] font-quicksand text-text-color text-[12px]">
                  Welcome
                </div>
                <div class="font-[600] font-quicksand text-text-color text-[12px]">
                  My Account
                </div>
              </div>
            </div>
          </router-link>
          <router-link to="/wishlist">
            <div class="flex items-center gap-2">
              <img src="../assets/img/home/heart-icon.png" alt="Wishlist" class="w-[34px] h-[33px]" />
              <div>
                <div class="font-[400] font-quicksand text-text-color text-[12px]">Favorite</div>
                <div class="font-[600] font-quicksand text-text-color text-[12px]">My Favorite</div>
              </div>
            </div>
          </router-link>
          <router-link to="/cart">
            <div class="flex items-center gap-2">
              <img src="../assets/img/home/cart.png" alt="Cart" class="w-[33px] h-[30px]" />
              <div>
                <div class="font-[400] font-quicksand text-text-color text-[12px]">Cart</div>
                <div class="font-[600] font-quicksand text-text-color text-[12px]">My Cart</div>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Divider -->
        <div class="lg:col-span-12 border-b-[0.43px] border-[#D22245] pt-5"></div>

        <!-- Bottom Menu -->
        <div class="lg:col-span-2 flex items-center gap-4">
          <img src="../assets/img/home/menu.png" alt="Menu" class="w-[18px] h-[16px]" />
          <select
            v-model="selectedMain"
            @change="onMainChange($event.target.value)"
            class="font-[600] font-quicksand text-text-color text-[15px] bg-transparent outline-none border-none"
          >
            <option value="">Shop by department</option>
            <option v-for="c in categories" :key="c.mcategory_id" :value="c.mcategory_id">
              {{ c.mcategory_name }}
            </option>
          </select>
        </div>
        <div class="flex lg:col-span-10 justify-items-center h-[48px] lg:gap-[50px] pt-[13px] ml-1">
          <router-link to="/product" class="font-[700] font-quicksand text-text-color text-[15px]">
            SHOP
          </router-link>
          <router-link to="/contact" class="font-[700] font-quicksand text-text-color text-[15px]">
            CONTACT US
          </router-link>
        </div>
      </div>
    </div>

    <!-- Search Results Dropdown -->
    <div
      v-if="showResults && searchResults.length"
      class="absolute mt-2 left-[280px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-[580px] max-h-80 overflow-y-auto"
    >
      <div
        v-for="item in searchResults"
        :key="item.item_id"
        class="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
        @click="goToProduct(item.item_id)"
      >
        <img :src="item.item_image_1" alt="product" class="w-10 h-12 object-cover rounded" />
        <div>
          <div class="text-sm font-semibold text-gray-700">{{ item.item_name }}</div>
          <div class="text-xs text-gray-500">{{ item.brand_name }}</div>
        </div>
      </div>
    </div>
    <div
      v-if="showResults && !searchResults.length"
      class="absolute mt-2 left-[280px] bg-white border border-gray-200 rounded-lg shadow p-2 text-sm text-gray-500 w-[580px]"
    >
      No products found
    </div>
  </section>

  <!-- Compact Header (after scroll) -->
  <section
    v-else
    class="hidden lg:flex items-center justify-between px-10 py-3 sticky top-0 z-20 bg-white shadow-md"
  >
    <router-link to="/">
      <img src="../assets/img/home/Logo.png" alt="Logo" class="w-[91px] h-[90px]" />
    </router-link>
    <div class="flex gap-4">
      <router-link to="/profile">
        <div class="flex items-center gap-2">
          <img src="../assets/img/home/profile-icon.png" alt="Profile" class="w-[33px] h-[31px]" />
          <div>
            <div
              v-if="!isAuth"
              class="font-[400] font-quicksand text-text-color text-[12px]"
            >
              Login
            </div>
            <div v-else class="font-[400] font-quicksand text-text-color text-[12px]">
              {{ userInfo.user_first_name || "User" }}
            </div>
            <div class="font-[600] font-quicksand text-text-color text-[12px]">My Account</div>
          </div>
        </div>
      </router-link>
      <router-link to="/wishlist">
        <div class="flex items-center gap-2">
          <img src="../assets/img/home/heart-icon.png" alt="Wishlist" class="w-[34px] h-[33px]" />
          <div>
            <div class="font-[400] font-quicksand text-text-color text-[12px]">Favorite</div>
            <div class="font-[600] font-quicksand text-text-color text-[12px]">My Favorite</div>
          </div>
        </div>
      </router-link>
      <router-link to="/cart">
        <div class="flex items-center gap-2">
          <img src="../assets/img/home/cart.png" alt="Cart" class="w-[33px] h-[30px]" />
          <div>
            <div class="font-[400] font-quicksand text-text-color text-[12px]">Cart</div>
            <div class="font-[600] font-quicksand text-text-color text-[12px]">My Cart</div>
          </div>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuth } from "../composables/useAuth.js";
import api from "../services/api.js";

const isScrolled = ref(false);
const { isAuth, user, logout: authLogout, initAuth } = useAuth();
const userInfo = ref({});

// Categories
const categories = ref([]);
const selectedMain = ref("");

// Search
const searchQuery = ref("");
const searchResults = ref([]);
const showResults = ref(false);

// Scroll handler
const handleScroll = () => {
  isScrolled.value = window.scrollY > 2;
};

// Fetch categories
const fetchCategories = async () => {
  try {
    const res = await api.get("/categories");
    categories.value = res.data;
  } catch (err) {
    console.error("❌ Failed to fetch categories:", err);
  }
};

// Search items
const searchProducts = async () => {
  if (!searchQuery.value.trim()) return;

  try {
    const res = await api.get("/items/search", {
      params: { q: searchQuery.value },
    });
    searchResults.value = res.data;
    showResults.value = true;
  } catch (err) {
    console.error("❌ Search failed:", err);
    searchResults.value = [];
    showResults.value = false;
  }
};

function goToProduct(id) {
  searchQuery.value = "";
  searchResults.value = [];
  showResults.value = false;
  window.location.href = `/product/${id}`;
}

// Handle category change
const onMainChange = (id) => {
  selectedMain.value = id;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  initAuth();
  if (user.value) userInfo.value = user.value;
  fetchCategories();
});
</script>
