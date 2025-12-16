import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/REMAURA/', // Pakeiskite į savo projektą, jei jis skiriasi
  plugins: [react()]
})

