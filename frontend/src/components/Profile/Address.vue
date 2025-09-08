<template>
  <div class="flex flex-col justify-center lg:px-20 px-5 bg-white">
    <div class="w-full flex justify-start mb-8">
      <span
        class="text-[20px] md:text-[32px] font-quicksand font-[700] pb-2 border-b-4 border-secondary w-full text-[#4C4C4C] md:pt-8 pl-6 pt-2"
      >
        Address
      </span>
    </div>
    <div class="ml-2 font-quicksand pb-5 font-[600] text-[11px] text-[#898989]">
      <span class="mr-1">Home</span>/<span class="ml-1">Address</span>
    </div>
    <div class="grid md:grid-cols-5 gap-5">
      <AccountNav />
      <div class="md:col-span-4 py-4 md:pr-[100px]">
        <div class="full- grid lg:grid-cols-2 gap-2">
          <div class="mb-4">
            <input
              type="street"
              id="street"
              class="w-full mt-2 p-2 border border-gray-300"
              placeholder="Street"
              required
            />
          </div>

          <div class="mb-4">
            <input
              type="city"
              id="city"
              class="w-full mt-2 p-2 border border-gray-300"
              required
              placeholder="City"
            />
          </div>
        </div>

        <div class="full- grid lg:grid-cols-2 gap-2">
          <div class="mb-4">
            <input
              type="state"
              id="state"
              class="w-full mt-2 p-2 border border-gray-300"
              placeholder="State"
              required
            />
          </div>

          <div class="mb-4">
            <input
              type="zip"
              id="zip"
              class="w-full mt-2 p-2 border border-gray-300"
              required
              placeholder="Zip"
            />
          </div>
        </div>
        <div class="full- grid lg:grid-cols-2 gap-2">
          <div class="mb-4">
            <input
              type="country"
              id="country"
              class="w-full mt-2 p-2 border border-gray-300"
              placeholder="Country"
              required
            />
          </div>
        </div>
        <div class="full- grid lg:grid-cols-2 gap-2">
          <button
            type="submit"
            class="w-full mt-5 py-4 px-4 bg-[#D22245] text-white font-semibold hover:bg-[#00512F] uppercase font-poppins"
          >
            Update Details
          </button>
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
  const { user, logout: authLogout, initAuth } = useAuth();
  const userInfo = ref({});

  const logout = () => {
    authLogout();
  };

  onMounted(() => {
    // Initialize authentication state
    initAuth();

    // Set user info from the composable
    if (user.value) {
      userInfo.value = user.value;
    } else {
      // If no user data, redirect to login
      router.push("/login");
    }
  });
</script>
