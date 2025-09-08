<script setup>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import HeaderMob from "../components/HeaderMob.vue";
import ProductSingle from "../components/ProductSingle.vue";
import RelatedProduct from "../components/RelatedProduct.vue";
</script>

<template>

  <main class="w-lg overflow-x-hidden">
    <Header/>
    <HeaderMob/>
    <ProductSingle/>
    <RelatedProduct/>
    <Footer/>
   
  </main>
</template>
