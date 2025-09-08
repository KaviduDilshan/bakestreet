<template>
  <div class=" bg-white">
   
    <div class="px-4 sm:px-8 md:px-12 lg:px-16 pt-8">
      <h1 class="text-[20px] md:text-[32px] font-medium text-[#4C4C4C] border-b-4 border-secondary  mb-8 pl-6">
        Contact Us
      </h1>
    </div>
   
    <div class="flex flex-col lg:flex-row items-stretch">
      <!-- Map Side (Left) -->
      <div class="w-full lg:w-1/2 flex-shrink-0 flex items-stretch">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.206196573539!2d21.0080723158007!3d52.229675979757834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc669c5f8b9f%3A0x6c7c8c1b1c1b1c1b!2sWarsaw%2C%20Poland!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="object-cover w-full h-80 lg:h-[550px]"
        ></iframe>
      </div>
      
      <!-- Form Side (Right) -->
      <div class="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-8">
        <div class="max-w-xl w-full mx-auto">
          <p class="text-[#4C4C4C] text-base md:text-lg mb-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
            Lorem Ipsum has been the industry.
          </p>
          <form class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" class="input" />
              <input type="text" placeholder="Last Name" class="input" />
            </div>
            <input type="text" placeholder="Address" class="input" />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="email" placeholder="Email" class="input" />
              <input type="tel" placeholder="Phone Number" class="input" />
            </div>
            <textarea placeholder="Message" rows="5" class="input resize-none"></textarea>
            <button
              type="submit"
              class="w-full md:w-auto px-8 py-3 bg-secondary text-white text-base font-semibold rounded mt-2 hover:bg-[#b81c3a] transition"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.input {
  @apply border border-gray-400 rounded px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-secondary transition;
  font-size: 1rem;
}
</style>
