import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { refreshAccessToken, shouldRefreshToken } from "../utils/authUtils.js";
import { jwtDecode } from "jwt-decode";
import api from "../services/api.js";

export function useAuth() {
  const router = useRouter();

  // Reactive authentication state
  const isAuthenticated = ref(false);
  const user = ref(null);
  const accessToken = ref(null);

  // Computed property to check if user is authenticated
  const isAuth = computed(() => {
    return isAuthenticated.value && accessToken.value && user.value;
  });

  // Initialize authentication state from localStorage
  const initAuth = () => {
    const storedIsAuth = localStorage.getItem("isAuth") === "true";
    const storedToken = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");

    isAuthenticated.value = storedIsAuth;
    accessToken.value = storedToken;

    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  };

  // Set authentication data
  const setAuth = (authData) => {
    const { token, isSuccess, customer } = authData;
    
    localStorage.setItem("access_token", token);
    localStorage.setItem("isAuth", isSuccess);
    
    const { refresh_token, access_token, user: userData } = authData;
    localStorage.setItem("user", JSON.stringify(customer)); 
    localStorage.setItem("refresh_token", token);
    
    isAuthenticated.value = true; 
    accessToken.value = token; 
    user.value = userData; 
  };

  const getAuthData = () => {
    const token = localStorage.getItem("access_token");
    // if (!token) return null; // no token → not logged in

    // try {
    const decoded = jwtDecode(token);
    const { customer_id, phone } = decoded;

    return {
      token,
      customerId: customer_id,
      phone,
    };
    // } catch (error) {
    //   console.error("Invalid JWT:", error);
    //   return null;
    // }
  };

  const fetchUserById = async (id) => {
  try {
    // Use full URL path or axios instance with baseURL
    const response = await api.get(`getUser/${id}`);
    console.log("Fetched User Data:", response.data);
    if (response.data.isSuccess) {
      return response.data.user;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};

  // Clear authentication data
  const clearAuth = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuth");

    isAuthenticated.value = false;
    accessToken.value = null;
    user.value = null;
  };

  // Refresh authentication token
  const refreshAuth = async () => {
    try {
      const newAuthData = await refreshAccessToken();
      if (newAuthData) {
        setAuth(newAuthData);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to refresh authentication:", error);
      clearAuth();
      return false;
    }
  };

  // Check if token needs refresh
  const needsRefresh = () => {
    return accessToken.value && shouldRefreshToken(accessToken.value);
  };

  // Logout function
  const logout = () => {
    clearAuth();
    router.push("/login");
  };

  // Check if user can access a route
  const canAccess = (routeName) => {
    const protectedRoutes = ["profile", "wishlist", "cart", "checkout"];
    const guestRoutes = ["login", "account", "reset"];

    if (protectedRoutes.includes(routeName)) {
      return isAuth.value;
    }

    if (guestRoutes.includes(routeName)) {
      return !isAuth.value;
    }

    return true;
  };

  // Redirect based on authentication status
  const redirectIfNeeded = (routeName) => {
    if (!canAccess(routeName)) {
      if (isAuth.value) {
        router.push("/profile");
      } else {
        router.push("/login");
      }
      return false;
    }
    return true;
  };

  return {
    // State
    isAuthenticated,
    user,
    accessToken,
    isAuth,

    // Methods
    initAuth,
    setAuth,
    clearAuth,
    refreshAuth,
    needsRefresh,
    logout,
    canAccess,
    redirectIfNeeded,
    getAuthData,
    fetchUserById
  };
}
