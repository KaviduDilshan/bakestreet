<template>
  <section class="md:px-20 px-5 bg-white">
    <!-- Desktop -->
    <div class="pt-10 pb-10 text-text-color md:block hidden">
      <div class="flex justify-between items-center">
        <div class="text-[20px] text-text-color font-[700] font-quicksand">
          New Arrivals Products
        </div>
        <div class="flex gap-2 pt-[3px]">
          <img
            id="newarrivals-swiper-prev"
            src="../../assets/img/home/next-left.png"
            alt="prev"
            class="w-[23px] h-[23px] cursor-pointer"
          />
          <img
            id="newarrivals-swiper-next"
            src="../../assets/img/home/next-right.png"
            alt="next"
            class="w-[23px] h-[23px] cursor-pointer"
          />
        </div>
      </div>

      <div class="border-b-[2px] border-b-primary w-[120px] mt-[2px] mb-10"></div>

      <!-- Swiper Carousel -->
      <Swiper
        :modules="[Navigation]"
        :navigation="{
          nextEl: '#newarrivals-swiper-next',
          prevEl: '#newarrivals-swiper-prev',
        }"
        :breakpoints="breakpoints"
        :space-between="20"
      >
        <SwiperSlide v-for="card in pros" :key="card.item_id">
          <div
            class="relative grid justify-items-center p-5 bg-[#F5F5F5] rounded-lg drop-shadow-xl mb-1"
          >
            <!-- Heart -->
            <img
              src="../../assets/img/home/fav.png"
              alt="Heart Icon"
              class="absolute top-3 right-3 w-[20px] h-[20px] cursor-pointer z-10"
            />

            <!-- Product Image -->
            <div class="h-[150px] flex items-center justify-center">
              <img
                :src="card.item_image_1 || '/placeholder.png'"
                alt="Product Img"
                class="max-h-[150px] object-contain"
              />
            </div>

            <!-- Title -->
            <div
              class="pt-5 text-[14px] text-center text-text-color font-[700] font-quicksand"
            >
              {{ card.item_name }}
            </div>

            <!-- Rating -->
            <div class="flex gap-[2px] pt-3">
              <img
                v-for="i in 5"
                :key="i"
                src="../../assets/img/home/star.png"
                alt="Rating Star"
                class="w-[15px] h-[15px]"
              />
            </div>

            <!-- Prices -->
            <div
              class="font-[700] font-quicksand pt-3"
              :class="card.total_count > 0 ? 'text-text-color' : 'text-[#B1B1B1]'"
            >
              {{ card.min_price }} LKR - {{ card.max_price }} LKR
            </div>

            <!-- Old Price -->
            <div class="text-[16px] text-[#B8B8B8] font-[600] font-quicksand pt-3 line-through">
              {{ card.oldPrice || '' }}
            </div>

            <!-- Add To Cart -->
            <button :disabled="card.total_count >= 0" @click="addToCartAndNavigate(card)" :class="[
              card.total_count > 0
                ? 'bg-secondary hover:bg-primary cursor-pointer'
                : 'bg-[#828282] cursor-not-allowed',
              'text-[#FFFFFF] lg:text-[15px] text-[12px] rounded-[8px] font-quicksand mt-3 font-[700] w-full text-center py-1',
            ]">
              {{ card.total_count > 0 ? "Add To Cart" : "Out Of Stock" }}
            </button>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Shop All -->
      <router-link to="/product">
        <div class="mt-6">
          <button
            class="w-full bg-secondary hover:bg-[#c52f4f] text-white text-sm font-semibold py-2 rounded"
          >
            SHOP ALL
          </button>
        </div>
      </router-link>
    </div>

    <!-- Mobile -->
    <div class="block md:hidden py-10">
      <h2 class="text-start text-xl font-semibold text-text-color mb-2">
        New Arrivals Products
      </h2>
      <div class="w-32 h-1 bg-primary mb-6 rounded"></div>

      <div class="grid grid-cols-2 gap-6">
        <div
          v-for="card in pros"
          :key="card.item_id"
          class="p-2 rounded-lg shadow flex flex-col items-center text-center relative bg-white min-h-[300px]"
        >
          <!-- Heart -->
          <img
            src="../../assets/img/home/fav.png"
            alt="Heart Icon"
            class="absolute top-2 right-2 w-[18px] h-[18px]"
          />

          <!-- Image -->
          <img
            :src="card.item_image_1 || '/placeholder.png'"
            alt="Product"
            class="mb-2 max-h-[120px] object-contain"
          />

          <!-- Title -->
          <p class="text-sm text-text-color font-bold mb-1 leading-tight px-1">
            {{ card.item_name }}
          </p>

          <!-- Rating -->
          <div class="flex justify-center gap-0.5 pt-1">
            <img
              v-for="i in 5"
              :key="i"
              src="../../assets/img/home/star.png"
              alt="Rating Star"
              class="w-[14px] h-[14px]"
            />
          </div>

          <!-- Prices -->
          <p class="text-text-color text-base font-bold leading-snug pt-2">
            {{ card.min_price }} LKR - {{ card.max_price }} LKR
          </p>
          <p class="text-[#B8B8B8] line-through text-sm">
            {{ card.oldPrice || '' }}
          </p>

          <!-- Add To Cart -->
          <button
            :disabled="isAddedToCart(card.item_id)"
            @click="addToCart(card.item_id)"
            :class="[
              card.total_count > 0
                ? 'bg-secondary hover:bg-primary cursor-pointer'
                : 'bg-[#828282] cursor-not-allowed',
              'text-[#FFFFFF] lg:text-[15px] text-[12px] rounded-[8px] font-quicksand mt-3 font-[700] w-full text-center py-1',
            ]"
          >
            {{ isAddedToCart(card.item_id) ? "Add to Cart" : "Add To Cart" }}
          </button>
        </div>
      </div>

      <!-- Shop All -->
      <router-link to="/product">
        <div class="mt-6">
          <button
            class="w-full bg-secondary hover:bg-[#c52f4f] text-white text-sm font-semibold py-2 rounded"
          >
            SHOP ALL
          </button>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import api from "../../services/api.js";

const pros = ref([]);
const isLoading = ref(true);

// Breakpoints for Swiper
const breakpoints = {
  320: { slidesPerView: 1, spaceBetween: 20 },
  768: { slidesPerView: 3, spaceBetween: 20 },
  1024: { slidesPerView: 6, spaceBetween: 20 },
};

// Fetch items + prices
async function fetchNewArrivals() {
  try {
    isLoading.value = true;

    const [itemsRes, pricesRes] = await Promise.all([
      api.get("items-with-brand"),
      api.get("item-prices"),
    ]);

    const items = itemsRes.data || [];
    const prices = pricesRes.data || [];

    pros.value = items.map((item) => {
      const priceObj = prices.find((p) => p.item_id === item.item_id);
      return {
        ...item,
        min_price: priceObj ? Number(priceObj.min_price) : 0,
        max_price: priceObj ? Number(priceObj.max_price) : 0,
        oldPrice: priceObj ? Number(priceObj.old_price || 0) : 0,
      };
    });
  } catch (err) {
    console.error("Error fetching new arrivals:", err);
    pros.value = [];
  } finally {
    isLoading.value = false;
  }
}

// Cart functions
function addToCart(item_id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.includes(item_id)) {
    cart.push(item_id);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

function isAddedToCart(item_id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.includes(item_id);
}

onMounted(() => {
  fetchNewArrivals();
});
</script>
