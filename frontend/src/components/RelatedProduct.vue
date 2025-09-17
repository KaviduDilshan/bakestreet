<template>
  <section class="bg-white py-10 md:px-20 px-2">
    <div class="max-w-7xl mx-auto">
      <!-- Title -->
      <h2 class="text-2xl font-bold text-center mb-8">Related Products</h2>

      <!-- Mobile grid -->
      <div v-if="isMobile" class="grid grid-cols-2 gap-4 px-4">
        <div v-for="(item, idx) in relatedProducts" :key="'mobile-' + idx"
          class="bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center transition hover:shadow-lg">
          <img :src="item.img" :alt="item.desc" class="h-40 w-auto object-contain mb-4" />
          <div class="text-center text-[15px] font-medium mb-1">{{ item.desc }}</div>
          <div class="text-center text-[15px] font-medium mb-1">{{ item.brand }}</div>
          <div class="font-bold text-lg mb-2">
            Rs.{{ formatPrice(item.price) }}
          </div>

          <!-- Stars -->
          <div class="flex items-center justify-center mb-2">
            <template v-for="i in 5" :key="'star-mobile-' + i + '-' + idx">
              <svg v-if="i <= item.rating" class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
              <svg v-else class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
            </template>
          </div>

          <button
            class="bg-green-600 hover:bg-green-700 text-white text-[15px] rounded-lg font-semibold w-full py-2 transition"
            @click="$router.push(`/product/${encryptId(item.item_id)}`)">
            Add To Cart
          </button>

        </div>
      </div>

      <!-- Desktop swiper -->
      <div v-else class="relative flex items-center">
        <button id="related-swiper-prev" class="absolute left-[-60px] md:block hidden" aria-label="Previous">
          <svg class="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <Swiper :modules="[Navigation, Pagination]"
          :navigation="{ nextEl: '#related-swiper-next', prevEl: '#related-swiper-prev' }"
          :pagination="{ el: '.related-swiper-pagination', clickable: true }" :breakpoints="breakpoints"
          :space-between="24" class="w-full">
          <SwiperSlide v-for="(item, idx) in relatedProducts" :key="'desktop-' + idx">
            <div class="bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center transition hover:shadow-lg">
              <img :src="item.img" :alt="item.desc" class="h-40 w-auto object-contain mb-4" />
              <div class="text-center text-[15px] font-medium mb-1">{{ item.desc }}</div>
              <div class="text-center text-[15px] font-medium mb-1">{{ item.brand }}</div>
              <div class="font-bold text-lg mb-2">Rs.{{ formatPrice(item.price) }}</div>

              <div class="flex items-center justify-center mb-2">
                <template v-for="i in 5" :key="'star-desktop-' + i + '-' + idx">
                  <svg v-if="i <= item.rating" class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                  </svg>
                  <svg v-else class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                  </svg>
                </template>
              </div>

              <button
                class="bg-green-600 hover:bg-green-700 text-white text-[15px] rounded-lg font-semibold w-full py-2 transition"
                @click="$router.push(`/product/${encryptId(item.item_id)}`)">
                Add To Cart
              </button>

            </div>
          </SwiperSlide>
        </Swiper>

        <button id="related-swiper-next" class="absolute right-[-60px] md:block hidden" aria-label="Next">
          <svg class="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Pagination bullets -->
      <div v-if="!isMobile" class="flex justify-center items-center mt-6 w-full lg:block hidden">
        <div class="related-swiper-pagination space-x-2"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import api from "../services/api.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { decryptId, encryptId } from "../utils/crypto.js";

const route = useRoute();
const product = ref(null);
const relatedProducts = ref([]);
const isMobile = ref(false);

const breakpoints = {
  320: { slidesPerView: 1.2, spaceBetween: 16 },
  640: { slidesPerView: 2, spaceBetween: 16 },
  768: { slidesPerView: 3, spaceBetween: 20 },
  1024: { slidesPerView: 4, spaceBetween: 24 },
  1280: { slidesPerView: 5, spaceBetween: 24 },
};

function checkMobile() {
  isMobile.value = window.innerWidth < 768;
}

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkMobile);
});

watch(
  () => route.params.id,
  async (id) => {
    if (!id) return;

    try {
      // Decrypt product ID
      const realId = decryptId(id);
      if (!realId) {
        console.error("Invalid product ID");
        return;
      }

      // Fetch main product
      const res = await api.get(`items/${realId}`);
      product.value = res.data;

      // Determine subcategory
      const subcatId = product.value.subcategory_id || product.value.scategory_id;
      if (subcatId) {
        // Fetch related products
        const relatedRes = await api.get(`products/related/${subcatId}/${product.value.item_id}`);
        console.log("Related products:", relatedRes.data);

        relatedProducts.value = relatedRes.data.map((p) => ({
          item_id: p.item_id,
          encryptedId: encryptId(p.item_id), // Use for routing
          desc: p.item_name,
          brand: p.brand_name,
          img: p.item_image_1,
          price: p.min_price || 0,
          rating: 4,
        }));
      }
    } catch (err) {
      console.error("Error fetching product or related products:", err);
    }
  },
  { immediate: true }
);

function formatPrice(value) {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
</script>


<style>
.related-swiper-pagination {
  display: block !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.swiper-pagination-bullet {
  background-color: #d9d9d9;
  opacity: 1;
}

.swiper-pagination-bullet-active {
  background-color: #00512f;
  opacity: 1;
}
</style>
