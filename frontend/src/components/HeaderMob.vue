<template>
  <section
    class="block lg:hidden sticky top-0 z-20 bg-gradient-to-b from-white to-[#CFCFCF] pb-2 shadow-md"
  >
    <div class="flex items-center justify-between px-4 pt-3">
      <div class="flex items-center gap-3">
        <div class="relative">
          <router-link to="/cart">
            <img
              src="../assets/img/home/cart.png"
              alt="Basket Icon"
              class="w-[24px] h-[24px]"
            />
          </router-link>

          <span
            class="absolute -top-1 -right-1 bg-[#046736] text-white text-[10px] rounded-full w-[14px] h-[14px] flex items-center justify-center"
            >0</span
          >
        </div>
        <router-link to="/wishlist">
          <img
            src="../assets/img/home/heart-icon.png"
            alt="Heart Icon"
            class="w-[30px] h-[30px]"
          />
        </router-link>

        <!-- Profile Icon with Authentication State -->
        <div class="relative">
          <router-link v-if="!isAuth" to="/login">
            <img
              src="../assets/img/home/profile-icon.png"
              alt="Profile Icon"
              class="w-[33px] h-[31px] cursor-pointer"
            />
          </router-link>
          <div v-else class="flex items-center gap-2">
            <router-link to="/profile">
              <img
                src="../assets/img/home/profile-icon.png"
                alt="Profile Icon"
                class="w-[33px] h-[31px] cursor-pointer"
              />
            </router-link>
            <!-- User Info Tooltip -->
            <div class="hidden sm:block">
              <div class="text-[10px] font-quicksand text-text-color">
                {{ userInfo.user_first_name || "User" }}
              </div>
              <button
                @click="logout"
                class="text-[8px] font-quicksand text-[#D22245] hover:underline"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Center Logo -->
      <div class="flex flex-col items-center">
        <router-link to="/">
          <img
            src="../assets/img/home/Logo.png"
            alt="Baker Street Logo"
            class="w-[40px] h-[40px]"
          />
          <!-- <span class="text-[#046736] text-[10px] font-semibold font-quicksand"
            >BakerStreet</span
          > -->
        </router-link>
      </div>

      <!-- Right icons -->
      <div
        class="menu lg:hidden md:flex sm:flex flex-col justify-center items-center space-y-2 cursor-pointer"
        @click="toggleMenu"
      >
        <div
          class="flex flex-col items-center justify-center gap-2 relative w-10 h-10"
        >
          <span
            class="w-2 h-[2px] bg-primary transform transition-all duration-300 ease-in-out ml-4"
            :class="menuOpen ? 'rotate-45 translate-y-2.5' : ''"
          ></span>
          <span
            class="w-8 h-[2px] bg-primary transform transition-all duration-300 ease-in-out"
            :class="menuOpen ? 'opacity-0' : ''"
          ></span>
          <span
            class="w-2 h-[2px] bg-primary transform transition-all duration-300 ease-in-out mr-4"
            :class="menuOpen ? '-rotate-45 -translate-y-2.5' : ''"
          ></span>
        </div>
      </div>
      <NavMenu :menuOpen="menuOpen" @close-menu="toggleMenu" />
    </div>

    <!-- Welcome message -->
    <div
      class="text-center text-[12px] text-black mt-2 bg-gradient-to-t from-[#CFCFCF] to-[white]"
    >
      Welcome to Baker Street
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import NavMenu from "../components/UI/NavMenu.vue";
import { useAuth } from "../composables/useAuth.js";

const menuOpen = ref(false);
const { isAuth, fetchUserById, getAuthData, logout: authLogout, initAuth } = useAuth();
const userInfo = ref({
  cus_id: "",
  user_first_name: "",
  user_last_name: "",
});

// Toggle the full-screen menu
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const logout = () => {
  authLogout();
};

onMounted(async () => {
  initAuth();

  const authData = getAuthData();
  if (authData && authData.customerId) {
    const usersfetch = await fetchUserById(authData.customerId);
    try {
      userInfo.value = {
          cus_id: authData.customerId || "",
          user_first_name: usersfetch.user_first_name || "",
          user_last_name: usersfetch.user_last_name || "",
        };
    } catch (error) {
      console.error("Error fetching customer:", error);
      router.push("/login");
    }
  }

  // // Set user info from the composable
  // if (user.value) {
  //   userInfo.value = user.value;
  // }
});
</script>

<style scoped>
.menu {
  transition: background-color 0.3s ease;
}

.menu:hover {
  /* background-color: rgba(0, 0, 0, 0.4); */
}

.nav-link {
  color: white;
  padding: 0.5rem 1rem;
  display: inline-block;
  transform: translateX(-0.5rem);
  position: relative;
}

.nav-link::after {
  content: "";
  position: absolute;
  width: 25%;
  height: 2px;
  bottom: 0;
  left: 40%;
  transform: translateX(-50%);
  background-color: #ffffff;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease;
}

.nav-link:hover::after {
  transform: scaleX(1);
}

.nav-active {
  color: #ffffff;
}

.nav-active::after {
  transform: scaleX(1);
}
.nav {
  transition: background-color 0.3s ease; /* Smooth transition for background color change */
}
</style>
