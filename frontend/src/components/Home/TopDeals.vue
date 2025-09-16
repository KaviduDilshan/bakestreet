<template>
  <section class="md:px-20 px-5 bg-white">
    <!-- Desktop -->
    <div class="pt-10 pb-10 text-text-color md:block hidden">
      <div class="flex justify-between items-center">
        <div class="text-[20px] font-[700] font-quicksand">Top Selling Products</div>
        <div class="flex gap-2 pt-[3px]">
          <img id="topdeals-swiper-prev" src="../../assets/img/home/next-left.png" alt="prev"
            class="w-[23px] h-[23px] cursor-pointer" />
          <img id="topdeals-swiper-next" src="../../assets/img/home/next-right.png" alt="next"
            class="w-[23px] h-[23px] cursor-pointer" />
        </div>
      </div>

      <div class="border-b-[2px] border-b-primary w-[120px] mt-[2px] mb-10"></div>

      <Swiper :modules="[Navigation]" :navigation="{ nextEl: '#topdeals-swiper-next', prevEl: '#topdeals-swiper-prev' }"
        :breakpoints="breakpoints" :space-between="20">
        <SwiperSlide v-for="card in pros" :key="card.item_id">
          <div class="relative grid justify-items-center p-5 bg-[#F5F5F5] rounded-lg drop-shadow-xl mb-1" @click="goToSingle(card)">
            <img src="../../assets/img/home/fav.png" alt="Heart Icon"
              class="absolute top-3 right-3 w-[20px] h-[20px] cursor-pointer z-10" />
            <div class="h-[150px] flex items-center justify-center">
              <img :src="card.item_image_1 || '/placeholder.png'" alt="Product" class="max-h-[150px] object-contain" />
            </div>

            <div class="pt-5 text-[14px] text-center font-[700] font-quicksand">{{ card.item_name }}</div>

            <div class="flex gap-[2px] pt-3">
              <img v-for="i in 5" :key="i" src="../../assets/img/home/star.png" alt="Rating Star"
                class="w-[15px] h-[15px]" />
            </div>

            <!-- Prices -->
            <div class="text-[14px] font-[700] font-quicksand pt-3">
              {{ card.min_price }} LKR - {{ card.max_price }} LKR
            </div>

            <!-- Sold -->
            <div class="text-[14px] font-[700] font-quicksand pt-2">Sold: {{ card.total_sold }}</div>

            <!-- Add To Cart -->
            <button @click.stop="goToSingle(card)"
              class="bg-secondary hover:bg-primary cursor-pointer text-[#FFFFFF] lg:text-[15px] text-[12px] rounded-[8px] font-quicksand mt-3 font-[700] w-full text-center py-1">
              Add To Cart
            </button>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Shop All -->
      <router-link to="/product">
        <div class="mt-6 px-4">
          <button class="w-full bg-secondary hover:bg-[#c52f4f] text-white text-sm font-semibold py-2 rounded">
            SHOP ALL
          </button>
        </div>
      </router-link>
    </div>

    <!-- Mobile -->
    <div class="block md:hidden py-10">
      <h2 class="text-start text-xl font-semibold text-text-color mb-2">Top Deals Of The Day</h2>
      <div class="w-32 h-1 bg-primary mb-6 rounded"></div>

      <div class="grid grid-cols-2 gap-6">
        <div v-for="card in pros" :key="card.item_id"
          class="p-2 rounded-lg shadow flex flex-col items-center text-center relative bg-white min-h-[300px]" @click="goToSingle(card)">
          <img src="../../assets/img/home/fav.png" alt="Heart Icon" class="absolute top-2 right-2 w-[18px] h-[18px]" />
          <img :src="card.item_image_1 || '/placeholder.png'" alt="Product" class="mb-2 max-h-[120px] object-contain" />
          <p class="text-sm font-bold mb-1 leading-tight px-1">{{ card.item_name }}</p>
          <div class="flex justify-center gap-0.5 pt-1">
            <img v-for="i in 5" :key="i" src="../../assets/img/home/star.png" alt="Star" class="w-[14px] h-[14px]" />
          </div>
          <div class="text-[14px] font-[700] font-quicksand pt-3">
            {{ card.min_price }} LKR - {{ card.max_price }} LKR
          </div>
          <p class="text-base font-bold pt-2">Sold: {{ card.total_sold }}</p>

          <button @click.stop="goToSingle(card)"
            class="bg-secondary hover:bg-primary cursor-pointer text-[#FFFFFF] lg:text-[15px] text-[12px] rounded-[8px] font-quicksand mt-3 font-[700] w-full text-center py-1">
            Add To Cart
          </button>
        </div>
      </div>

      <router-link to="/product">
        <div class="mt-6">
          <button class="w-full bg-secondary hover:bg-[#c52f4f] text-white text-sm font-semibold py-2 rounded">
            SHOP ALL
          </button>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../../services/api.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRouter } from "vue-router";
import { encryptId } from "../../utils/crypto.js";

const pros = ref([]);
const router = useRouter();

const breakpoints = {
  320: { slidesPerView: 1, spaceBetween: 20 },
  768: { slidesPerView: 3, spaceBetween: 20 },
  1024: { slidesPerView: 6, spaceBetween: 20 },
};

async function getTopDeals() {
  try {
    const res = await api.get("most-sold-items");
    pros.value = res.data.map(item => ({
      ...item,
      min_price: item.min_price || 0,
      max_price: item.max_price || 0,
      total_sold: item.total_sold || 0,
      item_image_1: item.item_image_1 || "/placeholder.png",
      item_name: item.item_name || "Unknown Product",
    }));
  } catch (err) {
    console.error("Error fetching top deals:", err);
    pros.value = [];
  }
}

// ✅ Navigate to single product page
function goToSingle(card) {
  router.push({ name: "single", params: { id: encryptId(card.item_id) } });
}



onMounted(() => getTopDeals());
</script>
