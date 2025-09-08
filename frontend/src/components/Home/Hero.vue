<template>
  <section class="relative w-full  bg-gradient-to-r from-secondary to-[white] py-10 lg:py-8  overflow-hidden md:block hidden ">
   
    <div class="absolute inset-0 bg-hero-img opacity-80 bg-cover bg-center "></div>

    <!--  white shape on the right -->
    <div class="absolute top-0 right-0 lg:w-[40%]  h-full bg-white clip-diagonal "></div>

    
    <div class="relative z-10  mx-auto px-5 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-8">
      
      <!-- Left  Section -->
      <div class="text-center lg:text-center max-w-lg space-y-4">
        <div class="inline-block bg-white text-text-color px-10 py-2 rounded-full font-medium text-sm shadow ">
          What is Lorem Ipsum
        </div>

        <h1 class="text-white text-2xl sm:text-xl md:text-4xl font-bold leading-tight">
          The standard Lorem Ipsum passage,<br />
          used since the 1500s
        </h1>

        <p class="text-white text-sm sm:text-base md:text-lg">
          Lorem Ipsum is simply dummy text of the printing<br />
          and typesetting industry.
        </p>

        <button class="mt-4 bg-secondary hover:bg-[#c52f4f] text-white font-semibold px-12 py-2 rounded-md shadow transition">
          SHOP NOW
        </button>
        
        <!-- Pagination dots -->
         <div class="pt-12 flex ml-[540px] lg:flex hidden">
          <div class="flex gap-2">
            <span class="w-12 h-1.5 bg-secondary rounded-full"></span>
            <span class="w-4 h-1.5 bg-primary rounded-full"></span>
            <span class="w-4 h-1.5 bg-primary rounded-full"></span>
          </div>
        </div>
      </div>


      <!-- Right Image  -->
      <div class="flex-shrink-0 max-w-[550px]">
        <img
          src="../../assets/home/giftPack.png"
          alt="Gift Basket"
          class="md:w-full w-[250px] h-auto object-contain"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.clip-diagonal {
  clip-path: polygon(60% 0, 100% 0, 100% 100%, 0% 100%);
}
</style>
