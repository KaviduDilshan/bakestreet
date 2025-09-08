<template>
  <section class="md:px-20 px-5 bg-white">
    <!-- Desktop -->
    <div class="pt-10 pb-10 text-text-color md:block hidden">
      <div class="flex justify-between items-center">
        <div class="text-[20px] text-text-color font-[700] font-quicksand">
          Top Selling Products
        </div>
        <div class="flex gap-2 pt-[3px]">
          <img
            id="topdeals-swiper-prev"
            src="../../assets/img/home/next-left.png"
            alt="next left"
            class="w-[23px] h-[23px] cursor-pointer"
          />
          <img
            id="topdeals-swiper-next"
            src="../../assets/img/home/next-right.png"
            alt="next right"
            class="w-[23px] h-[23px] cursor-pointer"
          />
        </div>
      </div>

      <div
        class="border-b-[2px] border-b-primary w-[120px] mt-[2px] mb-10"
      ></div>
      <!-- Swiper Carousel -->
      <Swiper
        :modules="[Navigation]"
        :navigation="{
          nextEl: '#topdeals-swiper-next',
          prevEl: '#topdeals-swiper-prev',
        }"
        :breakpoints="breakpoints"
        :space-between="20"
        class="pt-10"
      >
        <SwiperSlide
          v-for="(card, item_id) in pros || []"
          :key="item_id"
        >
          <div
            class="relative grid justify-items-center p-5 bg-[#F5F5F5] rounded-lg drop-shadow-xl mb-1"
          >
            <img
              src="../../assets/img/home/fav.png"
              alt="Heart Icon"
              class="absolute top-3 right-3 w-[20px] h-[20px] cursor-pointer z-10"
            />

            <div class="h-[150px]">
              <img
                :src="card.item_image_1"
                alt="Product Img"
                :class="card.imgClass"
              />
            </div>

            <div
              class="pt-5 text-[14px] text-center text-text-color font-[700] font-quicksand"
            >
              {{ card.item_name }}
            </div>
            <div class="flex gap-[2px] pt-3">
              <img
                v-for="i in 5"
                :key="i"
                src="../../assets/img/home/star.png"
                alt="Raiting Img"
                class="w-[15px] h-[15px]"
              />
            </div>
            <div
              :class="
                card.total_count > 0
                  ? 'text-[14px] text-text-color'
                  : 'text-[14px] text-[#B1B1B1]'
              "
              class="font-[700] font-quicksand pt-3"
            >
              {{ card.item_sell_min }} LKR - {{ card.item_sell_max }} LKR
            </div>
            <div
              class="text-[16px] text-[#B8B8B8] font-[600] font-quicksand pt-3 line-through"
            >
              {{ card.oldPrice }}
            </div>
            <div
              :class="[
                card.total_count > 0
                  ? 'bg-secondary hover:bg-primary cursor-pointer'
                  : 'bg-[#828282] cursor-not-allowed',
                'text-[#FFFFFF] lg:text-[15px] text-[12px] rounded-[8px] font-quicksand mt-3 font-[700] w-full text-center py-1',
              ]"
              @click="addToCart(card.item_id)"
              :disabled="isAddedToCart(card)"
            >
              {{ isAddedToCart(card) ? "Added to Cart" : "Add To Cart" }}
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
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
        Top Selling Products
      </h2>
      <div class="w-32 h-1 item-start bg-primary mb-6 rounded"></div>

      <div class="grid grid-cols-2 gap-6">
        <div
          v-for="(card, item_id) in pros || []"
          :key="item_id"
          class="p-2 rounded-lg shadow flex flex-col items-center text-center relative bg-white min-h-[300px]"
        >
          <!-- Heart Icon -->
          <img
            src="../../assets/img/home/fav.png"
            alt="Heart Icon"
            class="absolute top-2 right-2 w-[18px] h-[18px]"
          />

          <!-- Product Image -->
          <img
            :src="card.item_image_1"
            alt="Product"
            :class="[card.imgClass, 'mb-2']"
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
            {{ card.item_sell_min }}LKR - {{ card.item_sell_max }}LKR
          </p>
          <p class="text-[#B8B8B8] line-through text-sm">
            {{ card.oldPrice }}
          </p>

          <!-- Push button to bottom -->
          <div
            :class="[
              card.total_count > 0
                ? 'bg-secondary hover:bg-primary cursor-pointer'
                : 'bg-[#828282] cursor-not-allowed',
              'text-[#FFFFFF] lg:text-[15px] text-[12px] rounded-[8px] font-quicksand mt-3 font-[700] w-full text-center py-1',
            ]"
            @click="addToCart(card.item_id)"
            :disabled="isAddedToCart(card)"
          >
            {{ isAddedToCart(card) ? "Added to Cart" : "Add To Cart" }}
          </div>
        </div>
      </div>

      <!-- Shop All Button -->
      <router-link to="/product">
        <!-- Shop All Button -->
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
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Navigation } from "swiper/modules";
  import { getProduct } from "../../services/product";
  import "swiper/css";
  import "swiper/css/navigation";
  import { onMounted, ref } from "vue";

  const pros = ref([]); // pros as a reactive reference

  const isLoading = ref(true);

  async function getTopDeals() {
    try {
      isLoading.value = true;
      const proData = {
        pageIndex: 0,
        pageSize: 5,
        sortField: "created_at",
        sortOrder: -1,
        filters: {
          search_text: "",
          second_cat: null,
          min_price: null,
          max_price: null,
        },
      };

      const response = await getProduct.get(proData);

      if (
        response &&
        response.isSuccess &&
        response.values &&
        response.values.data
      ) {
        pros.value = response.values.data;
      } else {
        console.error(
          "Failed to fetch top deals or invalid response structure"
        );
        pros.value = [];
      }
    } catch (error) {
      console.error("Error fetching top deals:", error);
      pros.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  // Add to cart and save only item_id to localStorage
  const addToCart = (item_id) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.includes(item_id)) {
      cart.push(item_id);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  // Check if item_id is already in the cart
  const isAddedToCart = (item_id) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.includes(item_id);
  };

  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
  };

  // Fetch top deals when the component is mounted
  onMounted(() => {
    getTopDeals();
  });
</script>
