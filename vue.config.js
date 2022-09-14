const { defineConfig } = require('@vue/cli-service')
const target = 'http://211.53.209.103:8080';

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
   port: 8080,
   proxy: {
     '^/api':{
       target,
       changeOrigin: true
     },
     '^/upload': {
       target,
       changeOrigin: true
     },
     '^/download': {
       target,
       changeOrigin: true
     }
   }
  }
})
