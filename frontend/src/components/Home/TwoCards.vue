<template>
  <div class="relative flex flex-col lg:flex-row gap-6 w-full px-5 md:px-20 lg:pb-10  bg-white">
    <!-- desktop -->

    <!-- Card 1 -->
    <div class="flex-1 bg-[#F4F4F4] overflow-hidden flex items-stretch relative h-[240px] lg:flex hidden rounded-xl">
      <!-- Background Vector -->
      <img
        src="../../assets/home/black.png"
        alt="Diagonal Vector"
        class="absolute bottom-0 right-0 w-[63%] object-cover z-0 pointer-events-none select-none"
      />

      <!-- Left Content -->
      <div class="flex flex-col justify-end p-6 w-2/3 relative z-5 min-w-[0]">
        <!-- Logo at top -->
        <img
          src="../../assets/home/appleLogo.png"
          alt="Apple Logo"
          class="w-[200px] mb-5"
        />

        <!-- Card Content -->
        <div class="bg-[#F4F4F4]/20 shadow-xl p-3 max-w-[380px] ">
          <div class="font-bold text-[20px] text-text-color mb-1">Top Deals Of The Day</div>
          <div class="text-[15px] text-text-color mb-2">
            The standard Lorem Ipsum passage,<br />used since the 1500s
          </div>
          <a href="#" class="font-semibold text-text-color underline text-sm">Shop Now</a>
        </div>
      </div>

      <!-- Right Product Image -->
      <div class="w-1/3 relative z-5 min-w-[0]">
        <img
          src="../../assets/home/iphone.png"
          alt="Product 1"
          class="absolute top-1/2 -translate-y-[45%] left-1/3 -translate-x-1/2 h-[120px] mt-[-40] sm:h-[200px] drop-shadow-xl"
        />
      </div>
    </div>

    <!-- Card 2 -->
    <div class="flex-1 min-w-[300px] bg-gradient-to-b from-secondary to-[#3B0913] overflow-hidden flex items-stretch relative h-[240px] lg:flex hidden rounded-xl">
      <!-- Background Vector -->
      <img
        src="../../assets/home/red.png"
        alt="Decorative Vector"
        class="absolute bottom-0 right-0 w-[60%] object-cover z-0 pointer-events-none select-none"
      />

      <!-- Left Content -->
      <div class="flex flex-col justify-end p-6 w-2/3 relative z-5 min-w-[0]">
        <img
          src="../../assets/home/logitech.png"
          alt="Tresemme Logo"
          class="w-[130px] h-[40px] mb-4 ml-4"
        />
        <div class="bg-transparent p-3">
          <div class="font-bold text-[20px] text-white mb-1">Top Deals Of The Day</div>
          <div class="text-[15px] text-white mb-2">
            The standard Lorem Ipsum passage,<br />used since the 1500s
          </div>
          <a href="#" class="font-semibold text-white underline text-sm">Shop Now</a>
        </div>
      </div>

      <!-- Right Product Image -->
      <div class="w-1/3 relative z-5 min-w-[0]">
        <img
          src="../../assets/home/mouse.png"
          alt="Product 2"
          class="absolute top-1/2 -translate-y-[50%] left-1/4 -translate-x-1/2 h-[280px] sm:h-[320px] object-contain drop-shadow-xl"
        />
      </div>
    </div>

    <!-- mobile / tablet -->

    <!-- Card 1 -->
    <div class="flex-1 bg-[#F4F4F4] overflow-hidden flex items-stretch relative md:h-[200px] h-[100px] sm:mt-0 md:mt-0 lg:hidden rounded-xl">
      <!-- Background Vector -->
      <img
        src="../../assets/home/black.png"
        alt="Diagonal Vector"
        class="absolute bottom-0 right-0 w-[90%] md:w-[70%] object-cover z-0 pointer-events-none select-none"
      />

      <!-- Left Content -->
      <div class="flex flex-col justify-end p-10 w-2/3 relative z-5 min-w-[0]">
        <img
          src="../../assets/home/appleLogo.png"
          alt="L'Oreal Logo"
          class="w-[100px] h-[20px] md:h-[40px] md:w-[200px] mb-4"
        />
        <div class="bg-[#F4F4F4]/20  shadow-xl p-2 max-w-[340px] md:max-w-[540px]">
          <div class="font-bold text-sm md:text-xl text-text-color mb-1">Top Deals Of The Day</div>
          <div class="text-xs md:text-lg text-text-color mb-2">
            The standard Lorem Ipsum passage,<br />used since the 1500s
          </div>
          <a href="#" class="font-semibold text-text-color underline text-sm">Shop Now</a>
        </div>
      </div>

      <!-- Right Product Image -->
      <div class="w-1/3 relative z-5 min-w-[0]">
        <img
          src="../../assets/home/iphone.png"
          alt="Product 1"
          class="absolute top-1/2 -translate-y-[50%] left-1/2 -translate-x-1/2 h-[145px] sm:h-[250px] drop-shadow-xl"
        />
      </div>
    </div>

    <!-- Card 2 -->
    <div class="flex-1 min-w-[300px] bg-gradient-to-b from-secondary to-[#3B0913] overflow-hidden flex items-stretch relative md:h-[220px] h-[160px] lg:hidden md:mt-10 mt-5 rounded-xl">
      <!-- Background Vector -->
      <img
        src="../../assets/home/red.png"
        alt="Decorative Vector"
        class="absolute bottom-0 right-0 w-[90%] md:w-[70%] object-cover z-0 pointer-events-none select-none"
      />

      <!-- Left Content -->
      <div class="flex flex-col justify-end p-10 w-2/3 relative z-5 min-w-[0]">
        <img
          src="../../assets/home/logitech.png"
          alt="Tresemme Logo"
          class="w-[100px] h-[27px] md:w-[250px] md:h-[60px] mb-10"
        />
        <div class="bg-transparent">
          <div class="font-bold text-sm md:text-xl text-white mb-1">Top Deals Of The Day</div>
          <div class="text-xs md:text-lg text-white mb-2">
            The standard Lorem Ipsum passage,<br />used since the 1500s
          </div>
          <a href="#" class="font-semibold text-white underline text-sm">Shop Now</a>
        </div>
      </div>

      <!-- Right Product Image -->
      <div class="w-1/3 relative z-5">
        <img
          src="../../assets/home/mouse.png"
          alt="Product 2"
          class="absolute top-1/2 -translate-y-[51%] left-1/2 -translate-x-1/2 h-[110px] sm:h-[230px] w-[160px] md:w-[260px] drop-shadow-xl"
        />
      </div>
    </div>
  </div>
</template>
