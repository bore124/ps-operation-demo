import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';


// https://vitejs.dev/config/
export default defineConfig(({command,mode})=>{
  const env = loadEnv(mode, process.cwd())
  const API_URL = new RegExp("^"+env.VITE_APP_BASE_API+"");
  return {
    mimeTypes: {
      'text/html': ['html', 'vue'],
      'application/javascript': ['js']
    },
    plugins: [
      vue(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      host: '0.0.0.0',
      open: false,
      proxy: {
        // detail: https://cli.vuejs.org/config/#devserver-proxy
        [env.VITE_APP_BASE_API]: {
          // target: `http://192.168.10.202:8080`,
          changeOrigin: true,
          rewrite: (path) => path.replace(API_URL, ''),
          logLevel: 'debug'

        }
      },
      disableHostCheck: true
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
  }
})
