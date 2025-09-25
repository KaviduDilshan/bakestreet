<template>
  <div class="col-span-1 sm:grid flex space-y-0 sm:space-y-10">
    <router-link to="/profile">
      <div class="bg-[#F5F5F5] py-2 px-4 cursor-pointer">
        <span class="text-black font-bold sm:block hidden"> Dashboard</span>
        <i class="pi pi-qrcode sm:invisible block"></i>
      </div>
    </router-link>
    <router-link to="/orders">
      <div class="bg-[#F5F5F5] py-2 px-4 cursor-pointer">
        <span class="text-black font-bold sm:block hidden"> Order</span>
        <i class="pi pi-box sm:invisible block"></i>
      </div>
    </router-link>
    <!-- <router-link to="/address">
      <div class="bg-[#F5F5F5] py-2 px-4 cursor-pointer">
        <span class="text-black font-bold sm:block hidden">Address</span>
        <i class="pi pi-map-marker sm:invisible block"></i>
      </div>
    </router-link> -->
    <router-link to="/account-details">
      <div class="bg-[#F5F5F5] py-2 px-4 cursor-pointer">
        <span class="text-black font-bold sm:block hidden"
          >Account Details</span
        >
        <i class="pi pi-user sm:invisible block"></i>
      </div>
    </router-link>
    <router-link to="/reset">
      <div class="bg-[#F5F5F5] py-2 px-4 cursor-pointer">
        <span class="text-black font-bold sm:block hidden">Rest Password</span>
        <i class="pi pi-key sm:invisible block"></i>
      </div>
    </router-link>
    <div
      @click="logout"
      class="bg-[#F5F5F5] py-2 px-4 sm:mt-1 sm:ml-0 ml-1 cursor-pointer"
    >
      <span class="text-black font-bold sm:block hidden">Logout</span>
      <i class="pi pi-sign-out sm:invisible block"></i>
    </div>
  </div>
</template>

<script setup>
  import "primeicons/primeicons.css";
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useAuth } from "../../composables/useAuth.js";

  const router = useRouter();
  const { cus_id, logout: authLogout, initAuth } = useAuth();
  const customer_id = ref({});

  const logout = () => {
    authLogout();
  };

  onMounted(() => { 
    // Initialize authentication state
    initAuth();

    // Set user info from the composable
    if (cus_id.value) {
      customer_id.value = cus_id.value;
    } else {
      // If no user data, redirect to login
      router.push("/login");
    }
  });
</script>
