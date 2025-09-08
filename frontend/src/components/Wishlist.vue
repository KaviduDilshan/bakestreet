<template>
  <div class="bg-white px-4 md:px-20 py-10">
    
    <h1 class="text-3xl font-bold mb-2 text-[#4C4C4C] pl-2 md:pl-6">Wishlist</h1>
    <div class="h-1 w-full bg-secondary mb-8"></div>

    <!-- Breadcrumb -->
    <p class="text-sm text-gray-500 mb-6">Home / Wishlist</p>

   
    <div class="bg-[#F5F5F5] p-4 md:p-6 rounded-md">
      <!-- Table Header -->
      <div class="hidden md:grid grid-cols-4 font-semibold text-center text-sm pb-4">
        <div class="text-left">Products</div>
        <div>Price</div>
        <div>Stock Status</div>
        <div class="flex justify-end pr-4">
          <button class="bg-black text-white px-4 py-2 text-sm rounded flex items-center gap-2">
            <img src="../assets/product/delete.png" alt="delete icon" class="w-5 h-5" />
            DELETE ALL
          </button>
        </div>
      </div>

      <!-- Wishlist Items -->
      <div
        v-for="(item, index) in wishlist"
        :key="index"
        class="grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-4 md:gap-0 py-6  text-sm"
      >
        <!-- Product -->
        <div class="flex items-center gap-4">
          <button class="w-5 h-5 text-gray-400">
            <img src="../assets/product/close.png" alt="remove icon" />
          </button>
          <img :src="item.image" alt="book cover" class="w-12 h-16 object-cover" />
          <span>{{ item.title }}</span>
        </div>

        <!-- Price -->
        <div class="text-left md:text-center">Rs.{{ item.price.toFixed(2) }}</div>

        <!-- Stock Status -->
        <div class="text-left md:text-center">
          <span :class="item.stock ? 'text-green-600' : 'text-secondary'">
            {{ item.stock ? 'In Stock' : 'Out of Stock' }}
          </span>
        </div>

        <!-- Actions -->
        <div class="flex md:justify-end text-xs text-gray-500 pr-0 md:pr-4">
          <div class="flex flex-col items-start md:items-end gap-1 w-full">
            <span>Added on {{ item.date }}</span>
            <button
              :disabled="!item.stock"
              :class="[
                'px-8 py-2 rounded-lg text-white font-semibold w-full md:w-auto text-center',
                item.stock ? 'bg-secondary ' : 'bg-gray-500 cursor-not-allowed'
              ]"
            >
              {{ item.stock ? 'Add To Cart' : 'Out Of Stock' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>

import book1 from '../assets/img/home/book-1.png'
import book2 from '../assets/img/home/book-2.png'
import book3 from '../assets/img/home/book-3.png'

const wishlist = [
  {
    title: 'Leading with Dignity',
    price: 480000,
    stock: true,
    date: 'Dec 5, 2024',
    image: book1,
  },
  {
    title: 'Victorian Psycho',
    price: 480000,
    stock: true,
    date: 'Dec 5, 2024',
    image: book2,
  },
  {
    title: 'Psycho Therapy',
    price: 480000,
    stock: false,
    date: 'Dec 5, 2024',
    image: book3,
  }
]
</script>

<style scoped>
/* Optional custom styles if needed */
</style>
