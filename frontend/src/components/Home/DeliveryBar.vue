<template>
    <section class="md:px-16 px-5 md:block hidden">
        <div class="pt-10 pb-10">
            <!--DeliveryBar Carousel-->
            <Swiper
            :modules="[Autoplay]"
            :slides-per-view="1"
            :space-between="20"
            :breakpoints="breakpoints"
            :autoplay="{ delay: 2500, disableOnInteraction: false }"
            loop
            >
            <SwiperSlide>
                <div class="flex justify-center col-span-1 items-center gap-3">
                    <img src="../../assets/img/home/card-1.png" alt="Card 1 img" class="w-[118px] h-[65px]">
                    <div>
                        <div class=" text-[15px] text-text-color font-[700] font-quicksand">FAST DELIVERY</div>
                        <div class=" text-[15px] text-text-color font-[600] font-quicksand">Island wide Delivery</div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="flex justify-center col-span-1 items-center gap-2 mt-3">
                    <img src="../../assets/img/home/card-2.png" alt="Card 1 img" class="w-[69px] h-[52px]">
                    <div>
                        <div class=" text-[15px] text-text-color font-[700] font-quicksand">SAFE PAYMENT</div>
                        <div class=" text-[15px] text-text-color font-[600] font-quicksand">100% secure payment</div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="flex justify-center col-span-1 items-center gap-2">
                    <img src="../../assets/img/home/card-3.png" alt="Card 1 img" class="w-[84px] h-[84px]">
                    <div>
                        <div class=" text-[15px] text-text-color font-[700] font-quicksand">SHOP WITH CONFIDENCE</div>
                        <div class=" text-[15px] text-text-color font-[600] font-quicksand">World's No1 IT Brands</div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="flex justify-center col-span-1 items-center gap-2">
                    <img src="../../assets/img/home/card-4.png" alt="Card 1 img" class="w-[98px] h-[74px]">
                    <div>
                        <div class=" text-[15px] text-text-color font-[700] font-quicksand">FRIENDLY SERVICE</div>
                        <div class=" text-[15px] text-text-color font-[600] font-quicksand">Messaging Help Center</div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="flex justify-center col-span-1 items-center gap-3">
                    <img src="../../assets/img/home/card-1.png" alt="Card 1 img" class="w-[118px] h-[65px]">
                    <div>
                        <div class=" text-[15px] text-text-color font-[700] font-quicksand">FAST DELIVERY</div>
                        <div class=" text-[15px] text-text-color font-[600] font-quicksand">Island wide Delivery</div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="flex justify-center col-span-1 items-center gap-2 mt-3">
                    <img src="../../assets/img/home/card-2.png" alt="Card 1 img" class="w-[69px] h-[52px]">
                    <div>
                        <div class=" text-[15px] text-text-color font-[700] font-quicksand">SAFE PAYMENT</div>
                        <div class=" text-[15px] text-text-color font-[600] font-quicksand">100% secure payment</div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="flex justify-center col-span-1 items-center gap-2">
                    <img src="../../assets/img/home/card-3.png" alt="Card 1 img" class="w-[84px] h-[84px]">
                    <div>
                        <div class=" text-[15px] text-text-color font-[700] font-quicksand">SHOP WITH CONFIDENCE</div>
                        <div class=" text-[15px] text-text-color font-[600] font-quicksand">World's No1 IT Brands</div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="flex justify-center col-span-1 items-center gap-2">
                    <img src="../../assets/img/home/card-4.png" alt="Card 1 img" class="w-[98px] h-[74px]">
                    <div>
                        <div class=" text-[15px] text-text-color font-[700] font-quicksand">FRIENDLY SERVICE</div>
                        <div class=" text-[15px] text-text-color font-[600] font-quicksand">Messaging Help Center</div>
                    </div>
                </div>
            </SwiperSlide>
            </Swiper>

        </div>
        
    </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const breakpoints = {
  640: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  1280: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
};
</script>