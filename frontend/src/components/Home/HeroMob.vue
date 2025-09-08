<template>
  <div class="relative block md:hidden lg:hidden bg-gradient-to-r from-secondary to-[white] px-4 py-6 text-white overflow-hidden">
    <div class="absolute inset-0 bg-hero-img opacity-80 bg-cover bg-center "></div>

    <!-- White shape on the right -->
    <div class="absolute top-0 right-0 w-[40%] h-full bg-white clip-diagonal z-0"></div>

    <div class="flex items-center justify-between gap-4 relative z-10">
      <!-- Text left -->
      <div class="flex-1">
        <h2 class="text-[14px] font-semibold leading-snug mb-2">
          The standard Lorem Ipsum passage, used since the 1500s
        </h2>
        <p class="text-[10px] mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
        <button class="bg-secondary hover:bg-[#b71c3a] text-white text-[14px] font-semibold py-2 px-4 rounded-xl">
          SHOP NOW
        </button>
      </div>

      <!-- Gift Image -->
      <div class="flex-shrink-0 w-32">
        <img
          src="../../assets/home/giftPack.png"
          alt="Gift Basket"
          class="w-full h-auto object-contain"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.clip-diagonal {
  clip-path: polygon(60% 0, 100% 0, 100% 100%, 0% 100%);
}
</style>
