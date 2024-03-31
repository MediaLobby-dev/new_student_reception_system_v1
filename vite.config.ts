import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteSingleFile } from 'vite-plugin-singlefile'

function dateFormater(date: Date) {
  return date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate() + "." + date.getHours() + "." + date.getMinutes() + "." + date.getSeconds();
}

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: "core/webpanel",
  },
  define: {
    __APP_VERSION__: JSON.stringify('v2.0.0 RC lapidary'),
    __BUILD_DATE__: JSON.stringify(dateFormater(new Date())),
  },
})
