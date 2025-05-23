import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { config } from 'dotenv';

config({ path: __dirname + '/.env' });
const { SERVER_IP } = process.env;

export default defineConfig({
  plugins: [react()],
  preview: {
    port: 9058,
  },
  server: {
    host: true,
    port: 9058,
    proxy: {
      '/api': {
        target: `http://${SERVER_IP}:1314/`,
        changeOrigin: true,
        xfwd: true,
      },
    },
  },
});