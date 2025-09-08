<template>
  <section class="bg-white py-10 px-4 md:px-16">
    <!-- Shop Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
      <!-- Card 1 -->
      <div
        class="bg-white text-white p-6 flex flex-col justify-between items-center text-center md:row-span-2 h-[330px] border border-secondary shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)]"
      >
        <div>
          <button
            class="bg-text-color text-white text-xs px-8 py-2 mb-3 rounded-lg"
          >
            SHOP NOW
          </button>
          <p class="text-sm leading-relaxed lg:px-10 px-2 text-text-color">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <img
          src="../../assets/home/01.png"
          alt="Product 1"
          class="mt-4 w-full h-[220px] object-contain"
        />
      </div>

      <!-- Card 2 -->
      <div
        class="bg-white text-text-color p-6 flex flex-col justify-between items-center text-center h-[157px] border border-secondary shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)]"
      >
        <div>
          <h3 class="text-base font-semibold mb-2">The standard Lorem Ipsum</h3>
          <p class="text-xs lg:mb-6 md:mb-2 mb-6">
            Lorem Ipsum is simply dummy text
          </p>
          <button class="border-[#929292] border text-xs px-8 py-2 rounded-lg">
            SHOP NOW
          </button>
        </div>
      </div>

      <!-- Card 3 -->
      <div
        class="bg-white text-text-color p-6 flex flex-col justify-between items-center text-center md:row-span-2 h-[330px] border border-secondary shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)]"
      >
        <div>
          <button
            class="bg-text-color text-white text-xs px-8 py-2 mb-3 rounded-lg"
          >
            SHOP NOW
          </button>
          <p class="text-sm leading-relaxed lg:px-10 px-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <img
          src="../../assets/home/02.png"
          alt="Product 3"
          class="w-full h-[240px] object-contain"
        />
      </div>

      <!-- Card 4 -->
      <div
        class="bg-white text-text-color lg:p-6 p-10 flex items-center justify-between h-[157px] border border-secondary shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)]"
      >
        <h3 class="text-base font-semibold">The standard Lorem Ipsum</h3>
        <img
          src="../../assets/home/03.png"
          alt="Product 4"
          class="w-full h-[280px] object-contain"
        />
      </div>
    </div>

    <!-- Logo Slider -->
    <div class="pt-10 px-4 md:px-16">
      <Swiper
        :modules="[Autoplay]"
        :slides-per-view="1"
        :space-between="16"
        :breakpoints="breakpoints"
        :autoplay="{ delay: 2500, disableOnInteraction: false }"
        loop
      >
        <!-- 1 -->
        <SwiperSlide>
          <div class="flex justify-center">
            <img
              src="../../assets/home/atlas.png"
              alt="Atlas"
              class="object-contain h-10 sm:h-12 md:h-14 lg:h-16"
            />
          </div>
        </SwiperSlide>
        <!-- 2 -->
        <SwiperSlide>
          <div class="flex justify-center">
            <img
              src="../../assets/home/arpico.png"
              alt="Arpico"
              class="object-contain h-10 sm:h-12 md:h-14 lg:h-16"
            />
          </div>
        </SwiperSlide>
        <!--  3 -->
        <SwiperSlide>
          <div class="flex justify-center">
            <img
              src="../../assets/home/lexco.png"
              alt="LexCo"
              class="object-contain h-10 sm:h-12 md:h-14 lg:h-16"
            />
          </div>
        </SwiperSlide>
        <!-- 4 -->
        <SwiperSlide>
          <div class="flex justify-center">
            <img
              src="../../assets/home/lakehousenew.png"
              alt="Lake House"
              class="object-contain h-10 sm:h-12 md:h-14 lg:h-16"
            />
          </div>
        </SwiperSlide>
        <!--  5 -->
        <SwiperSlide>
          <div class="flex justify-center">
            <img
              src="../../assets/home/sarasavi.png"
              alt="Sarasavi"
              class="object-contain h-10 sm:h-12 md:h-14 lg:h-16"
            />
          </div>
        </SwiperSlide>

        <!-- Repeat  -->
        <SwiperSlide>
          <div class="flex justify-center">
            <img
              src="../../assets/home/atlas.png"
              alt="Atlas"
              class="object-contain h-10 sm:h-12 md:h-14 lg:h-16"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="flex justify-center">
            <img
              src="../../assets/home/arpico.png"
              alt="Arpico"
              class="object-contain h-10 sm:h-12 md:h-14 lg:h-16"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="flex justify-center">
            <img
              src="../../assets/home/lexco.png"
              alt="LexCo"
              class="object-contain h-10 sm:h-12 md:h-14 lg:h-16"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="flex justify-center">
            <img
              src="../../assets/home/lakehousenew.png"
              alt="Lake House"
              class="object-contain h-10 sm:h-12 md:h-14 lg:h-16"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="flex justify-center">
            <img
              src="../../assets/home/sarasavi.png"
              alt="Sarasavi"
              class="object-contain h-10 sm:h-12 md:h-14 lg:h-16"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Autoplay } from "swiper/modules";
  import "swiper/css";
  import "swiper/css/autoplay";

  const breakpoints = {
    640: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
  };
</script>

<style scoped>
  /* No additional styles needed */
</style>
