<template>
  <!-- Full-Screen Popup Menu -->
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="menuOpen"
      class="inset-0 fixed bg-black/90 backdrop-blur-md z-50 w-full h-screen lg:px-10 px-4 lg:pt-10 pt-2"
    >
      <div class="close-icon w-full flex justify-end">
        <img
          @click="closeMenu"
          src="../../assets/ui/close.png"
          alt="close"
          class="lg:w-[84px] lg:h-[84px] w-[32px] h-[32px] cursor-pointer hover:rotate-90 transition-all duration-300"
        />
      </div>

      <!-- navigation -->
      <div
        class="navigation px-20 lg:pt-0 pt-20 grid lg:justify-start justify-center gap-4"
      >
        <!-- home -->
        <div
          class="menu-item"
          :style="{ animationDelay: '0.1s' }"
          @click="handleNavClick('/', 'home')"
        >
          <h1
            class="text-secondary lg:text-[58px] text-[25px] uppercase lg:text-left text-center hover:text-white transition-all duration-300 hover:translate-x-4"
          >
            Home
          </h1>
        </div>

        <!-- About-us -->
        <div
          class="menu-item"
          :style="{ animationDelay: '0.2s' }"
          @click="handleNavClick('/about')"
        >
          <h1
            class="text-white lg:text-[58px] text-[25px] uppercase lg:text-left text-center hover:text-secondary transition-all duration-300 hover:translate-x-4"
          >
            about us
          </h1>
        </div>

        <!-- shop -->
        <div
          class="menu-item"
          :style="{ animationDelay: '0.3s' }"
          @click="handleNavClick('/product')"
        >
          <h1
            class="text-white lg:text-[58px] text-[25px] uppercase lg:text-left text-center hover:text-secondary transition-all duration-300 hover:translate-x-4"
          >
            Shop
          </h1>
        </div>

        <!-- contact -->
        <div
          class="menu-item"
          :style="{ animationDelay: '0.4s' }"
          @click="handleNavClick('/contact')"
        >
          <h1
            class="text-white lg:text-[58px] text-[25px] uppercase lg:text-left text-center hover:text-secondary transition-all duration-300 hover:translate-x-4"
          >
            contact
          </h1>
        </div>

        <!-- contact -->
        <!-- <div
              class="menu-item"
              :style="{ animationDelay: '0.5s' }"
              @click="handleNavClick('/', 'contact')"
            >
              <h1
                class="text-white lg:text-[58px] text-[25px] uppercase lg:text-left text-center hover:text-secondary transition-all duration-300 hover:translate-x-4"
              >
                contact
              </h1>
            </div> -->
      </div>
    </div>
  </Transition>
</template>

<script setup>
  import {
    defineProps,
    defineEmits,
    onMounted,
    onBeforeUnmount,
    watch,
  } from "vue";
  import { useRouter } from "vue-router";
  // import phoneIcon from "../../assets/hero/phone.png";
  // import emailIcon from "../../assets/hero/email.png";

  const router = useRouter();

  const props = defineProps({
    menuOpen: {
      type: Boolean,
      required: true,
    },
  });

  const emit = defineEmits(["close-menu"]);

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  // const contactInfo = [
  //   { type: "phone", icon: phoneIcon, value: "+94 112 569 444" },
  //   { type: "email", icon: emailIcon, value: "info@beyond.lk" },
  // ];

  const closeMenu = () => {
    emit("close-menu");
  };

  const handleNavClick = async (route, sectionId = null) => {
    closeMenu();

    if (route !== router.currentRoute.value.path) {
      await router.push(route);
    }

    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  };

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "auto";
  };

  onMounted(() => {
    if (props.menuOpen) {
      disableScroll();
    }
  });

  watch(
    () => props.menuOpen,
    (newVal) => {
      if (newVal) {
        disableScroll();
      } else {
        enableScroll();
      }
    }
  );

  onBeforeUnmount(() => {
    enableScroll();
  });
</script>

<style scoped>
  .menu-item {
    @apply border-b border-[#FFFFFF] lg:w-[30rem] w-[10rem] border-opacity-20 cursor-pointer hover:border-opacity-100 transition-all duration-300;
    animation: slideIn 0.5s ease-out forwards;
    opacity: 0;
    transform: translateX(-20px);
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .close-icon img {
    animation: fadeIn 0.3s ease-out forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: rotate(-180deg);
    }
    to {
      opacity: 1;
      transform: rotate(0);
    }
  }
</style>
