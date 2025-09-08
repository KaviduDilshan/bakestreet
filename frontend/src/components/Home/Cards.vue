<template>
  <section class="md:px-20 px-5 bg-white pb-10">
    <!-- Desktop Swiper (lg and up) -->
    <div class="hidden lg:block">
      <Swiper
        :modules="[]"
        :slides-per-view="3"
        :space-between="20"
        :autoplay="{ delay: 2500, disableOnInteraction: false }"
        loop
        class="pt-10 pb-10"
      >
        <SwiperSlide>
          <div class="flex justify-center items-center gap-5 mt-3 bg-white rounded-[8px] p-5 border-2 border-secondary shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] mb-2">
            <div>
              <div class="text-[21px] text-text-color font-[700] font-quicksand">The standard Lorem Ipsum passage,</div>
              <div class="text-[14px] text-text-color font-[600] font-quicksand">Lorem Ipsum is simply dummy text of the printing.</div>
            </div>
            <img src="../../assets/img/home/book-1.png" alt="Card 1 img" class="w-[142px] h-[179px] pt-3">
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="flex justify-center items-center gap-5 mt-3 bg-white rounded-[8px] p-5 border-2 border-secondary shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)]">
            <div>
              <div class="text-[21px] text-text-color font-[700] font-quicksand">The standard Lorem Ipsum passage,</div>
              <div class="text-[14px] text-text-color font-[600] font-quicksand">Lorem Ipsum is simply dummy text of the printing.</div>
            </div>
            <img src="../../assets/img/home/book-2.png" alt="Card 2 img" class="w-[142px] h-[179px] pt-3">
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="flex justify-center items-center gap-5 mt-3 bg-white rounded-[8px] p-5 border-2 border-secondary shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)]">
            <div>
              <div class="text-[21px] text-text-color font-[700] font-quicksand">The standard Lorem Ipsum passage,</div>
              <div class="text-[14px] text-text-color font-[600] font-quicksand">Lorem Ipsum is simply dummy text of the printing.</div>
            </div>
            <img src="../../assets/img/home/book-3.png" alt="Card 3 img" class="w-[142px] h-[179px] pt-3">
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="flex justify-center items-center gap-5 mt-3 bg-white rounded-[8px] p-5 border-2 border-secondary shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)]">
            <div>
              <div class="text-[21px] text-text-color font-[700] font-quicksand">The standard Lorem Ipsum passage,</div>
              <div class="text-[14px] text-text-color font-[600] font-quicksand">Lorem Ipsum is simply dummy text of the printing.</div>
            </div>
            <img src="../../assets/img/home/book-1.png" alt="Card 4 img" class="w-[142px] h-[179px] pt-3">
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="flex justify-center items-center gap-5 mt-3 bg-white rounded-[8px] p-5 border-2 border-secondary shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)]">
            <div>
              <div class="text-[21px] text-text-color font-[700] font-quicksand">The standard Lorem Ipsum passage,</div>
              <div class="text-[14px] text-text-color font-[600] font-quicksand">Lorem Ipsum is simply dummy text of the printing.</div>
            </div>
            <img src="../../assets/img/home/book-2.png" alt="Card 5 img" class="w-[142px] h-[179px] pt-3">
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="flex justify-center items-center gap-5 mt-3 bg-white rounded-[8px] p-5 border-2 border-secondary shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)]">
            <div>
              <div class="text-[21px] text-text-color font-[700] font-quicksand">The standard Lorem Ipsum passage,</div>
              <div class="text-[14px] text-text-color font-[600] font-quicksand">Lorem Ipsum is simply dummy text of the printing.</div>
            </div>
            <img src="../../assets/img/home/book-3.png" alt="Card 6 img" class="w-[142px] h-[179px] pt-3">
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- Mobile & Tablet  -->
    <div class="block lg:hidden space-y-5 pt-10">
      <div class="flex justify-center items-center gap-5 bg-white rounded-[8px] p-5 border-2 border-secondary shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)]">
        <div>
          <div class="text-[21px] text-text-color font-[700] font-quicksand">The standard Lorem Ipsum passage,</div>
          <div class="text-[14px] text-text-color font-[600] font-quicksand">Lorem Ipsum is simply dummy text of the printing.</div>
        </div>
        <img src="../../assets/img/home/book-1.png" alt="Card 1 img" class="w-[142px] h-[179px] pt-3">
      </div>
      <div class="flex justify-center items-center gap-5 bg-white rounded-[8px] p-5 border-2 border-secondary shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)]">
        <div>
          <div class="text-[21px] text-text-color font-[700] font-quicksand">The standard Lorem Ipsum passage,</div>
          <div class="text-[14px] text-text-color font-[600] font-quicksand">Lorem Ipsum is simply dummy text of the printing.</div>
        </div>
        <img src="../../assets/img/home/book-2.png" alt="Card 2 img" class="w-[142px] h-[179px] pt-3">
      </div>
      <div class="flex justify-center items-center gap-5 bg-white rounded-[8px] p-5 border-2 border-secondary shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)]">
        <div>
          <div class="text-[21px] text-text-color font-[700] font-quicksand">The standard Lorem Ipsum passage,</div>
          <div class="text-[14px] text-text-color font-[600] font-quicksand">Lorem Ipsum is simply dummy text of the printing.</div>
        </div>
        <img src="../../assets/img/home/book-3.png" alt="Card 3 img" class="w-[142px] h-[179px] pt-3">
      </div>

    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

</script>
