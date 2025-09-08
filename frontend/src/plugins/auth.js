import { useAuth } from '../composables/useAuth.js';

export default {
  install(app) {
    // Initialize authentication state when the app starts
    const { initAuth } = useAuth();
    
    // Initialize auth state
    initAuth();
    
    // Provide auth composable globally
    app.provide('auth', useAuth);
  }
}; 