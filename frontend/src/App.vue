<script setup>
  import { RouterLink, RouterView } from "vue-router";
  import { onMounted, onUnmounted } from "vue";
  import { useAuth } from "./composables/useAuth.js";
  // import { shouldRefreshToken, refreshAccessToken } from "./utils/authUtils.js";

  const { initAuth, needsRefresh, refreshAuth } = useAuth();

  // Initialize authentication on app start
  onMounted(() => {
    initAuth();

    // Set up periodic token refresh check (every 5 minutes)
    const refreshInterval = setInterval(async () => {
      if (needsRefresh()) {
        console.log("Token needs refresh, attempting to refresh...");
        const success = await refreshAuth();
        if (!success) {
          console.log("Token refresh failed, user will need to login again");
        }
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    // Clean up interval on component unmount
    onUnmounted(() => {
      clearInterval(refreshInterval);
    });
  });
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
