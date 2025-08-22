import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {viteStaticCopy} from 'vite-plugin-static-copy'
// https://vite.dev/config/

const cesiumSource = 'node_modules/cesium/Build/Cesium'
const cesiumBaseUrl = 'cesiumStatic'

export default defineConfig({
  define:{
    CESIUM_BASE_URL:JSON.stringify(`/${cesiumBaseUrl}`)
  },
  plugins: [vue(),
    viteStaticCopy({
      targets:[
        {src:`${cesiumSource}/ThirdParty`,dest:cesiumBaseUrl},
        {src:`${cesiumSource}/Widgets`,dest:cesiumBaseUrl},
        {src:`${cesiumSource}/Assets`,dest:cesiumBaseUrl},
        {src:`${cesiumSource}/Workers`,dest:cesiumBaseUrl},
      ]
    })
  ],
  server:{
    port:8080
  }
})
