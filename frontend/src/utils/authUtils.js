// Utility functions for authentication management
import { customerRefreshToken } from '../services/customer.js';

/**
 * Check if a JWT token is expired
 * @param {string} token - JWT token to check
 * @returns {boolean} - True if token is expired or invalid
 */
export function isTokenExpired(token) {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Error parsing token:', error);
    return true;
  }
}

/**
 * Get token payload
 * @param {string} token - JWT token
 * @returns {object|null} - Token payload or null if invalid
 */
export function getTokenPayload(token) {
  if (!token) return null;
  
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
}

/**
 * Check if user is authenticated with valid token
 * @returns {boolean} - True if user is authenticated
 */
export function isAuthenticated() {
  const isAuth = localStorage.getItem('isAuth') === 'true';
  const accessToken = localStorage.getItem('access_token');
  const user = localStorage.getItem('user');
  
  if (!isAuth || !accessToken || !user) {
    return false;
  }
  
  // Check if token is expired
  if (isTokenExpired(accessToken)) {
    // Clear expired authentication data
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuth');
    return false;
  }
  
  return true;
}

/**
 * Get user information from localStorage
 * @returns {object|null} - User object or null if not authenticated
 */
export function getUser() {
  if (!isAuthenticated()) {
    return null;
  }
  
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
}

/**
 * Get access token from localStorage
 * @returns {string|null} - Access token or null if not available
 */
export function getAccessToken() {
  if (!isAuthenticated()) {
    return null;
  }
  
  return localStorage.getItem('access_token');
}

/**
 * Get refresh token from localStorage
 * @returns {string|null} - Refresh token or null if not available
 */
export function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

/**
 * Refresh the access token using the refresh token
 * @returns {Promise<object|null>} - New auth data or null if refresh failed
 */
export async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    console.error('No refresh token available');
    return null;
  }
  
  try {
    const response = await customerRefreshToken.refresh(refreshToken);
    
    if (response.isSuccess && response.jwt?.access_token) {
      // Update the access token in localStorage
      localStorage.setItem('access_token', response.jwt.access_token);
      return {
        access_token: response.jwt.access_token,
        refresh_token: refreshToken, // Keep the same refresh token
        user: getUser() // Keep the same user data
      };
    } else {
      console.error('Invalid refresh token response:', response);
      return null;
    }
  } catch (error) {
    console.error('Failed to refresh token:', error);
    // If refresh fails, clear all auth data
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuth');
    return null;
  }
}

/**
 * Check if token needs refresh (expires within 5 minutes)
 * @param {string} token - JWT token to check
 * @returns {boolean} - True if token needs refresh
 */
export function shouldRefreshToken(token) {
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    const fiveMinutes = 5 * 60; // 5 minutes in seconds
    
    return (payload.exp - currentTime) < fiveMinutes;
  } catch (error) {
    console.error('Error parsing token for refresh check:', error);
    return false;
  }
} 