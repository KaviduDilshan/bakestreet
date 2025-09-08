<template>
  <section class="w-full bg-white px-4 md:px-12 lg:px-24 py-10">
    <div class="max-w-7xl mx-auto">
      <!-- Top Paragraph -->
      <div class="mb-8">
        <p class="text-[20px] md:text-[32px] font-medium pb-2 border-b-4 border-secondary w-full text-[#4C4C4C] md:pt-8 pl-6 pt-2 mb-8">About Us</p>
        <h2 class="text-3xl font-semibold text-black mb-4">Baker Street</h2>
        <p class="text-[15px] text-[#222] leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <p class="text-[15px] text-[#222] leading-relaxed mt-4">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </p>
      </div>
      <!-- Two Columns Below -->
      <div class="flex flex-col md:flex-row gap-6 items-start">
        <!-- Left: Image with right and bottom border -->
        <div class="w-full md:w-1/2 flex justify-center md:justify-start">
          <div class="relative w-[480px] h-[340px] rounded-tl-2xl rounded-bl-2xl overflow-visible lg:ml-24 ml-6">
            <!-- Image -->
            <img
              src="../assets/account/about.png"
              alt="Shopping Illustration"
              class="w-full h-full object-cover rounded-tl-2xl rounded-bl-2xl "
            />
            <!-- Right thick border -->
            <div class="absolute lg:top-20  top-0 right-0 lg:h-[260px] h-full w-[8px] bg-secondary rounded-br-2xl rounded-tr-2xl"></div>
            <!-- Bottom thick border -->
            <div class="absolute lg:left-20 left-0 bottom-0 lg:w-[400px] w-full h-[8px] bg-secondary rounded-bl-2xl rounded-br-2xl"></div>
          </div>
        </div>
        <!-- Right: Video section -->
        <div class="w-full md:w-1/2 pt-6 md:pt-0">
          <div class="mb-2">
            <span class="text-base text-black font-medium">Video</span>
          </div>
          <h3 class="text-2xl font-semibold text-black mb-4">We Start From Curiosity</h3>
          <p class="text-[15px] text-[#222] leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishin.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No JS needed for this static section
</script>
