import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Plugins for Vite
  plugins: [react()],
  // Configuration for the development server
  server: {
    // Specify the port for the development server
    port: 3000,
    // Proxy configuration to forward API requests
    proxy: {
      // Proxy requests that start with '/api'
      "/api": {
        // Target URL where the API requests will be forwarded
        target: process.env.API_URL || 'https://chat-app-gqtq.onrender.com'
      }
    }
  }
});
