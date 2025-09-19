<template>
  <section class="relative w-full py-10 lg:mb-10 mb-0">
    <!-- Background Image -->
    <div
      class="absolute inset-0 bg-cover bg-center opacity-90 md:flex hidden"
      style="background-image: url('/src/assets/home/product.png')"
    ></div>

    <!-- Desktop -->
    <div
      class="flex flex-col lg:flex-row items-start gap-10 lg:gap-20 w-full px-5 lg:px-20 relative z-10 md:flex hidden"
    >
      <!-- Left content -->
      <div class="w-full lg:flex-1 flex flex-col items-center lg:items-start">
        <h2 class="text-[20px] text-text-color font-[700] font-quicksand">
          Top Featured Product
        </h2>
        <div class="border-b-[2px] border-b-primary w-[120px] mt-[2px] mb-10"></div>

        <!-- Featured Product Card -->
        <div class="flex flex-col sm:flex-row items-center sm:items-start lg:flex hidden">
          <img
            src="../../assets/home/phoneImg.png"
            alt="Phone 1"
            class="w-60 sm:w-[380px] h-[220px] sm:h-[300px] object-contain mt-0 lg:ml-[-94px] ml-0"
          />
          <div class="flex flex-col justify-start text-center sm:text-left lg:mt-16 md:mt-16 mt-0">
            <div class="text-base font-medium mb-2">
              Lorem ipsum dolor sit amet, consectetur
            </div>
            <div class="mb-2">
              <img
                src="../../assets/home/rate.png"
                alt="Rating"
                class="h-6 w-auto mx-auto sm:mx-0"
              />
            </div>
            <div class="flex justify-center sm:justify-start items-center mb-3">
              <span class="text-2xl font-bold text-text-primary text-nowrap mr-3">
                Rs. 450000.00
              </span>
              <span class="text-[#B8B8B8] line-through text-nowrap text-base">
                Rs. 550000.00
              </span>
            </div>
            <button
              @click="goToSingle(products.value[0])"
              class="bg-secondary text-white px-8 py-2 rounded-md font-semibold hover:bg-primary transition w-full sm:w-fit"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <!-- Right side - Swiper -->
      <div class="w-full lg:w-[680px] flex flex-col items-center relative lg:px-0 md:px-10 px-5">
        <button
          ref="prevElRef"
          class="swiper-button-prev-custom absolute top-0 lg:left-[620px] left-[300px] md:left-[730px] z-20 w-8 h-8 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          ref="nextElRef"
          class="swiper-button-next-custom absolute top-0 right-0 z-20 w-8 h-8 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <Swiper
          :modules="[Navigation]"
          :slides-per-view="1"
          :navigation="{ nextEl: nextElRef, prevEl: prevElRef }"
          class="w-full md:mt-10 mt-4"
        >
          <SwiperSlide v-for="(group, idx) in groupedProducts" :key="idx">
            <div class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 md:gap-x-8 md:gap-y-8 gap-x-4 gap-y-4">
              <div
                v-for="product in group"
                :key="product.item_id"
                class="flex items-center p-4 cursor-pointer"
                @click="goToSingle(product)"
              >
                <img :src="product.item_image_1" alt="Product" class="w-20 h-20 object-contain mr-4"/>
                <div>
                  <div class="text-sm font-medium mb-1">{{ product.item_name }}</div>
                  <div class="text-lg font-bold text-text-primary mb-2">
                    Rs. {{ product.min_price }} - {{ product.max_price }}
                  </div>
                  <button
                    @click.stop="goToSingle(product)"
                    class="bg-secondary text-white px-4 py-2 rounded-md font-semibold hover:bg-primary transition text-sm whitespace-nowrap"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>

    <!-- Mobile -->
    <div class="absolute inset-0 bg-cover bg-center opacity-90 block md:hidden"
         style="background-image: url('/src/assets/home/product.png')"></div>
    <div class="block md:hidden px-5 z-10 relative">
      <h2 class="text-start text-xl font-semibold text-text-color mb-2">
        Top Featured Product
      </h2>
      <div class="w-32 h-1 bg-primary mb-6 rounded"></div>

      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="product in products.slice(0, 4)"
          :key="product.item_id"
          class="p-2 flex flex-col items-center text-center cursor-pointer"
          @click="goToSingle(product)"
        >
          <img :src="product.item_image_1" alt="Product" class="mb-2 w-24 h-20 object-contain"/>
          <p class="text-sm text-[#4C4C4C] leading-tight mb-1">{{ product.item_name }}</p>
          <div class="flex justify-center gap-0.5 text-yellow-400 my-2">
            <span v-for="star in 5" :key="star">★</span>
          </div>
          <p class="text-text-color font-bold text-base mb-2">
            Rs. {{ product.min_price }}
            <span v-if="product.max_price && product.max_price !== product.min_price"
                  class="text-[#B8B8B8] line-through text-sm ml-2">
              Rs. {{ product.max_price }}
            </span>
          </p>
          <button
            @click.stop="goToSingle(product)"
            class="bg-secondary hover:bg-[#c52f4f] text-white text-sm font-medium px-4 py-1 rounded"
          >
            Add To Cart
          </button>
        </div>
      </div>
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
import { useRouter } from "vue-router";
import { encryptId } from "../../utils/crypto.js";

const nextElRef = ref(null);
const prevElRef = ref(null);
const products = ref([]);
const groupedProducts = ref([]);
const router = useRouter();

// Fetch Featured Items
onMounted(async () => {
  try {
    const { data } = await api.get("/featured-items");
    products.value = data;

    // Group products in chunks of 4 for Swiper
    groupedProducts.value = [];
    for (let i = 0; i < products.value.length; i += 4) {
      groupedProducts.value.push(products.value.slice(i, i + 4));
    }
  } catch (err) {
    console.error("Error fetching featured items:", err);
  }
});

// Navigate to single product page
function goToSingle(product) {
  router.push({ name: "single", params: { id: encryptId(product.item_id) } });
}
</script>
