import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { refreshAccessToken, shouldRefreshToken } from "../utils/authUtils.js";
import { jwtDecode } from "jwt-decode";
import api from "../services/api.js";

export function useAuth() {
  const router = useRouter();

  // Reactive authentication state
  const isAuthenticated = ref(false);
  const accessToken = ref(null);
  const cus_id = ref(() => localStorage.getItem("cus_id") || null);
  // const user = ref(null);
  
  // Computed property to check if user is authenticated
  const isAuth = computed(() => {
    return isAuthenticated.value && accessToken.value && cus_id.value;
  });

  // Initialize authentication state from localStorage
  const initAuth = () => {
    const storedIsAuth = localStorage.getItem("isAuth") === "true";
    const storedToken = localStorage.getItem("access_token");
    
    isAuthenticated.value = storedIsAuth;
    accessToken.value = storedToken;
    // const storedUser = localStorage.getItem("user");
    // const storedUser = localStorage.getItem("cus_id");
    // if (storedUser) {
    //   user.value = JSON.parse(storedUser);
    // }
  };

  // Set authentication data
  const setAuth = (authData) => {
    const { token, isSuccess, customer } = authData;
    
    localStorage.setItem("access_token", token);
    localStorage.setItem("isAuth", isSuccess);
    
    localStorage.setItem("refresh_token", token);
    localStorage.setItem("cus_id", customer.customer_id);
    cus_id.value = customer.customer_id;
    isAuthenticated.value = true; 
    accessToken.value = token; 
    // user.value = userData;
    const { refresh_token, access_token, user: userData } = authData;
    // localStorage.setItem("user", JSON.stringify(customer));  
  };

  const getAuthData = () => {
    const token = localStorage.getItem("access_token");
    
    if (!token || token === "undefined" || token === "null") {
    // no valid token stored
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    const { customer_id, phone } = decoded;

    return {
      token,
      customerId: customer_id,
      phone,
    };
    } catch (error) {
    console.error("Invalid JWT:", error.message);
    return null; // or call clearAuth() here if you want auto-logout
  }
  };
  // if (!token) return null; // no token → not logged in
    // try {
    // } catch (error) {
    //   console.error("Invalid JWT:", error);
    //   return null;
    // }

  const fetchUserById = async (id) => {
  try {
    // Use full URL path or axios instance with baseURL
    const response = await api.get(`getUser/${id}`);
    // console.log("Fetched User Data:", response.data);
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
    // localStorage.removeItem("refresh_token");
    // localStorage.removeItem("user");
    localStorage.removeItem("cus_id");
    localStorage.removeItem("isAuth");

    isAuthenticated.value = false;
    accessToken.value = null;
    // user.value = null;
    cus_id.value = null;
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
    // user,
    cus_id,
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
