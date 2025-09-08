import axios from "axios";

// Create axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // from your .env
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // optional: 30s timeout
});

// Optional: Interceptors for logging / auth if needed
instance.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error.response || error);
    return Promise.reject(error);
  }
);

// Category service
export const categoryService = {
  // Fetch all main categories
  async getAll() {
    try {
      const response = await instance.get("/e_pos_item_maincategory");
      console.log("Fetched categories:", response.data);

      // Handle backend response variations
      if (Array.isArray(response.data)) return response.data;
      if (response.data.data) return response.data.data;

      return [];
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw error;
    }
  },

  // Fetch single category by ID (example)
  async getById(id) {
    try {
      const response = await instance.get(`/e_pos_item_maincategory/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch category ${id}:`, error);
      throw error;
    }
  }
};

// Export axios instance in case you want to reuse
export default instance;
