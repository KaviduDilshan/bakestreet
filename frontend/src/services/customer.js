// src/services/api.js
import axios from 'axios';
import { shouldRefreshToken, refreshAccessToken, getAccessToken } from '../utils/authUtils.js';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Use environment variables for base URL
  timeout: 30000, // Increased timeout to 30 seconds
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers like Authorization if needed
  },
});

// Flag to prevent multiple refresh requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Optional: Add request interceptor for authentication
instance.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    
    if (token) {
      // Check if token needs refresh before making the request
      if (shouldRefreshToken(token)) {
        if (!isRefreshing) {
          isRefreshing = true;
          
          try {
            const newAuthData = await refreshAccessToken();
            if (newAuthData) {
              config.headers.Authorization = `Bearer ${newAuthData.access_token}`;
              processQueue(null, newAuthData.access_token);
            } else {
              processQueue(new Error('Failed to refresh token'));
            }
          } catch (error) {
            processQueue(error);
          } finally {
            isRefreshing = false;
          }
        } else {
          // If already refreshing, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
          }).catch(err => {
            return Promise.reject(err);
          });
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add response interceptor for error handling
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      if (!isRefreshing) {
        isRefreshing = true;
        
        try {
          const newAuthData = await refreshAccessToken();
          if (newAuthData) {
            originalRequest.headers.Authorization = `Bearer ${newAuthData.access_token}`;
            processQueue(null, newAuthData.access_token);
            return instance(originalRequest);
          } else {
            processQueue(new Error('Failed to refresh token'));
            // Redirect to login if refresh fails
            window.location.href = '/login';
            return Promise.reject(error);
          }
        } catch (refreshError) {
          processQueue(refreshError);
          // Redirect to login if refresh fails
          window.location.href = '/login';
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return instance(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }
    }
    
    // Handle specific error codes (e.g., 401 unauthorized, 404 not found)
    // Display user-friendly messages or redirect
    return Promise.reject(error);
  }
);

// Customer authentication services
export const customerAuthService = {
  async login(credentials) {
    try {
      const response = await instance.post('/customer/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Customer refresh token service
export const customerRefreshToken = {
  async refresh(refreshToken) {
    try {
      const response = await instance.post('/customer/auth/refresh-token', {
        refresh_token: refreshToken
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Customer update service
export const customerUpdate = {
  async update(userData) {
    try {
      const response = await instance.put('/customer/update', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};


// Customer authentication services
export const customerCreate = {
    async create(credentials) {
      try {
        const response = await instance.post('/customer/auth/signup-otp', credentials);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  };

  export const customerPassword = {
    async reset(tempData) {
      try {
        const response = await instance.patch('customer/pwd-change', tempData);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  };

// Customer signup verification service
export const customerSignupVerify = {
  async verify(verificationData) {
    try {
      const response = await instance.post('/customer/auth/signup', verificationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const customerRestOTP = {
  async reset(tempData) {
    try {
      const response = await instance.post('/customer/auth/signup-otp-resent', tempData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
export const customerGet = {
  async get() {
    try {
      const response = await instance.get('/customer');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};


export default instance;