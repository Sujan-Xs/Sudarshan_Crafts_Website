import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Auto-copy generated premium sculpture images to the public assets directory
try {
  const targetDir = path.resolve('public/images');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const files = [
    {
      src: 'C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\d1289683-88b5-4e0e-955f-fe6df39aee5b\\shiva_granite_sculpture_1779094641228.png',
      dest: path.join(targetDir, 'shiva.png')
    },
    {
      src: 'C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\d1289683-88b5-4e0e-955f-fe6df39aee5b\\ganesha_marble_sculpture_1779094659495.png',
      dest: path.join(targetDir, 'ganesha.png')
    },
    {
      src: 'C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\d1289683-88b5-4e0e-955f-fe6df39aee5b\\krishna_sandstone_sculpture_1779094680808.png',
      dest: path.join(targetDir, 'radha_krishna.png')
    }
  ];

  files.forEach(file => {
    if (fs.existsSync(file.src)) {
      fs.copyFileSync(file.src, file.dest);
      console.log(`[Atelier Setup] Successfully copied image to ${file.dest}`);
    } else {
      console.warn(`[Atelier Setup] Source image not found at ${file.src}`);
    }
  });
} catch (error) {
  console.error('[Atelier Setup] Failed to copy assets:', error);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
