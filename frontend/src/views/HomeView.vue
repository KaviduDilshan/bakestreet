<script setup>
  import DeliveryBar from "../components/Home/DeliveryBar.vue";
  import Footer from "../components/Footer.vue";
  import ShopNow from "../components/Home/ShopNow.vue";
  import NewsLetter from "../components/Home/NewsLetter.vue";
  import TopFeatured from "../components/Home/TopFeatured.vue";
  import TopDeals from "../components/Home/TopDeals.vue";
  import TopSelling from "../components/Home/TopSelling.vue";
  import Header from "../components/Header.vue";
  import HeaderMob from "../components/HeaderMob.vue";
  import Cards from "../components/Home/Cards.vue";
  import TwoCards from "../components/Home/TwoCards.vue";
  import Hero from "../components/Home/Hero.vue";
  import DeliverBarMob from "../components/Home/DeliverBarMob.vue";
  import HeroMob from "../components/Home/HeroMob.vue";
</script>

<template>
  <main>
    <Header :isScrolled="isScrolled" />
    <HeaderMob />
    <Hero />
    <HeroMob />
    <DeliveryBar />
    <DeliverBarMob />
    <Cards />
    <TopDeals />
    <TwoCards />
    <TopSelling />
    <TopFeatured />
    <NewsLetter />
    <ShopNow />
    <Footer />
  </main>
</template>
