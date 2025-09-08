<template>
  <footer class="h-auto w-full bg-gradient-to-b from-[#FFFFFF] to-[#CFCFCF]">

    <!-- Background -->
    <div class="bg-footer-img bg-cover bg-center ">
      <!-- Desktop -->
      <div class="md:px-20 px-5 py-10 mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 hidden md:grid">

        <!-- Logo & Description -->
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <img src="../assets/footer/logo.png" alt="Logo" class="w-35 h-20" />
          </div> 
          <p class="text-black text">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="lg:pl-12 md:pl-0">
          <h3 class="font-semibold text-secondary mb-4 border-b-2 border-secondary w-max pb-1">Quick Links</h3>
          <ul class="space-y-2 text-text-color">
            <li class="flex items-center gap-2">
              <img src="../assets/footer/arrow.png" alt="arrow" class="w-3 h-3" /> Home
            </li>
            <li class="flex items-center gap-2">
              <img src="../assets/footer/arrow.png" alt="arrow" class="w-3 h-3" /> Shop
            </li>
            <li class="flex items-center gap-2">
              <img src="../assets/footer/arrow.png" alt="arrow" class="w-3 h-3" /> Stock Clearance
            </li>
            <li class="flex items-center gap-2">
              <img src="../assets/footer/arrow.png" alt="arrow" class="w-3 h-3" /> Buy & Sell
            </li>
            <li class="flex items-center gap-2">
              <img src="../assets/footer/arrow.png" alt="arrow" class="w-3 h-3" /> Rentals
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="font-semibold text-secondary mb-4 border-b-2 border-secondary w-max pb-1">Support</h3>
          <ul class="space-y-2 text-text-color">
            <router-link to="#">
            <li class="flex items-center gap-2">
              <img src="../assets/footer/arrow.png" alt="arrow" class="w-3 h-3" /> Blog
            </li>
            </router-link>
            <router-link to="/contact">
            <li class="flex items-center gap-2 mt-2">
              <img src="../assets/footer/arrow.png" alt="arrow" class="w-3 h-3" /> Help
            </li>
            </router-link>
            <router-link to="/faq">
            <li class="flex items-center gap-2 mt-2">
              <img src="../assets/footer/arrow.png" alt="arrow" class="w-3 h-3" /> FAQ
            </li>
            </router-link>
            <router-link to="/policy">
            <li class="flex items-center gap-2 mt-2">
              <img src="../assets/footer/arrow.png" alt="arrow" class="w-3 h-3" /> Privacy Policy
            </li>
            </router-link>
            <router-link to="/terms ">
            <li class="flex items-center gap-2 mt-2">
              <img src="../assets/footer/arrow.png" alt="arrow" class="w-3 h-3" /> Terms & Conditions
            </li>
            </router-link>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <router-link to="/contact">
          <h3 class="font-semibold text-secondary mb-4 border-b-2 border-secondary w-max pb-1">Contact</h3></router-link>
          <ul class="space-y-2 text-text-color">
            <li><a href="mailto:info@bakerstreet.com" class="hover:underline">info@bakerstreet.com</a></li>
            <li>
              <a href="tel:+9411200000" class="hover:underline">+94 11200 000</a><br />
              <a href="tel:+9477000000" class="hover:underline">(Hotline) +94 77000 00</a>
            </li>
            <li>
              53/6 Buthgamuwa Rd,<br />
              Sri Jayawardenepura Kotte,<br />
              Sri Lanka.
            </li>
          </ul>

          <!-- Custom Social Media Icons -->
          <div class="flex gap-4 mt-4">
        <img src="../assets/footer/fb.png" alt="Facebook" class="w-6 h-6 hover:opacity-80" />
        <img src="../assets/footer/insta.png" alt="Instagram" class="w-6 h-6 hover:opacity-80" />
        <img src="../assets/footer/social.png" alt="Twitter" class="w-6 h-6 hover:opacity-80" />
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="lg:px-20 px-5 py-10 mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:hidden text-center">

      <!-- Logo & Description -->
      <div class="flex flex-col items-center">
        <div class="flex items-center justify-center space-x-2 mb-4">
          <img src="../assets/footer/logo.png" alt="Logo" class="w-35 h-20" />
        </div>
        <p class="text-[#1e1e1e]/70 max-w-xs">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.
        </p>
      </div>

      <!-- Quick Links -->
      <div class="flex flex-col items-center">
        <router-link to="/contact">
        <h3 class="font-semibold text-text-color mb-2 border-b-2">Help</h3></router-link>
        <router-link to="/faq">
        <h3 class="font-semibold text-text-color mb-2 border-b-2">FAQ</h3></router-link>
        <router-link to="/policy">
        <h3 class="font-semibold text-text-color mb-4 border-b-2">Privacy Policy</h3></router-link>
        <router-link to="/terms">
        <h3 class="font-semibold text-text-color mb-4 border-b-2">Terms & Conditions</h3></router-link>
              <!-- Mobile Social Icons -->
      <div class="flex justify-evenly gap-3 ">
        <img src="../assets/footer/fb.png" alt="Facebook" class="w-6 h-6 hover:opacity-80" />
        <img src="../assets/footer/insta.png" alt="Instagram" class="w-6 h-6 hover:opacity-80" />
        <img src="../assets/footer/social.png" alt="Twitter" class="w-6 h-6 hover:opacity-80" />
       
      </div>
      </div>


    </div>

    <!-- Bottom Bar -->
    <div class="bg-[#212121] ">
      <div class="px-5 lg:px-20 py-4">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-sm text-center text-white">
            Copyright © {{ currentYear }} Baker Street All rights reserved 
          </div>
          <div class="hidden md:flex gap-2 items-center justify-center flex-wrap">
            <img src="../assets/footer/payment1.png" alt="Visa" class="h-8" />
          </div>
          <div class="flex items-center gap-1 text-center text-white">
            <span class="text-sm">Design & Developed by 
              <a
              href="https://www.victrix.tech"
              target="_blank"
              rel="noopener noreferrer"
              class=""
              >
              Victrix Tech
              </a>
            </span>
            
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>

const currentYear = new Date().getFullYear()
</script>