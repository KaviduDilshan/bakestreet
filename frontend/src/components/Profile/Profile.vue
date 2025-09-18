<template>
  <div class="flex flex-col justify-center lg:px-20 px-5 bg-white">
    <div class="w-full flex justify-start mb-8">
      <span
        class="text-[20px] md:text-[32px] font-quicksand font-[700] pb-2 border-b-4 border-secondary w-full text-[#4C4C4C] md:pt-8 pl-6 pt-2"
      >
        Profile
      </span>
    </div>
    <div class="ml-2 font-quicksand pb-5 font-[600] text-[11px] text-[#898989]">
      <span class="mr-1">Home</span>/<span class="ml-1">Profile</span>
    </div>
    <div class="grid md:grid-cols-5 gap-5">
      <AccountNav />
      <div class="md:col-span-4 py-4 md:pr-[100px]">
        <div class="font-quicksand font-[700] text-[15px] text-[#000000]">
          Hello {{ userInfo.user_first_name + " " + userInfo.user_last_name || "User" }}  - do you want to
          <span
            @click="logout"
            class="text-secondary cursor-pointer hover:underline"
          >
            Logout)</span
          >
        </div>
        <div class="font-quicksand font-[700] text-[15px] text-[#000000] pt-5">
          From your Account dashboard you can view your
          <span class="text-secondary"> recent orders</span>, manage your
          <span class="text-[#D22245]"> shipping and billing addresses</span>,
          and
          <span class="text-[#D22245]">
            edit your password and account details.</span
          >
        </div>

        <!-- User Information Display -->
        <div class="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 class="font-quicksand font-[700] text-[18px] text-[#000000] mb-4">
            Account Information
          </h3>
          <div class="space-y-3">
            <!-- <div class="flex">
              <span
                class="font-quicksand font-[600] text-[14px] text-[#666] w-24"
                >User ID:</span
              >
              <span
                class="font-quicksand font-[500] text-[14px] text-[#000000]"
                >{{ userInfo.user_id || "N/A" }}</span
              >
            </div> -->

<!-- 
            "created_at": "2025-09-15T09:17:38.188Z",
        "user_lastlogin": "2025-09-15T03:47:38.188Z",
        
 -->


            <div class="flex">
              <span
                class="font-quicksand font-[600] text-[14px] text-[#666] w-24"
                >Phone:</span
              >
              <span
                class="font-quicksand font-[500] text-[14px] text-[#000000]"
                >{{ userInfo.user_username || "N/A" }}</span
              >
            </div>
            <div class="flex">
              <span
                class="font-quicksand font-[600] text-[14px] text-[#666] w-24"
                >Create at:</span
              >
              <span
                class="font-quicksand font-[500] text-[14px] text-[#000000]"
                >{{ userInfo.created_at || "N/A" }}</span
              >
            </div>
            <div class="flex">
              <span
                class="font-quicksand font-[600] text-[14px] text-[#666] w-24"
                >Last login:</span
              >
              <span
                class="font-quicksand font-[500] text-[14px] text-[#000000]"
                >{{ userInfo.user_lastlogin || "N/A" }}</span
              >
            </div>
            <!-- <div class="flex">
              <span
                class="font-quicksand font-[600] text-[14px] text-[#666] w-24"
                >Type:</span
              >
              <span
                class="font-quicksand font-[500] text-[14px] text-[#000000]"
                >{{ userInfo.userType || "N/A" }}</span
              >
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useAuth } from "../../composables/useAuth.js";
  import AccountNav from "../account/AccountNav.vue";

  const router = useRouter();
  const { user, logout: authLogout, initAuth , getAuthData, fetchUserById } = useAuth();
  const userInfo = ref({});

  // console.log('Decoded JWT:', { userInfo.customerId });

  const logout = () => {
    authLogout();
    router.push("/login");
  }; 

  onMounted(async () => {
    localStorage.removeItem("nextHiddenPath");
  // Initialize authentication state
  initAuth();

  const authData = getAuthData();

  if (authData && authData.customerId) {
    try {
      // Fetch full user details
      const customer = await fetchUserById(authData.customerId);
      console.log("Fetched Customer:", customer);

      if (customer) {
        userInfo.value = {
          token: authData.token,
          ...customer, // spread full user info from API
        };
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
      router.push("/login");
    }
  } else {
    // If no user data, redirect to login
    router.push("/login");
  }
});
</script>
