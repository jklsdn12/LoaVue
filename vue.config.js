const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugins.delete('prefetch');//prefetch 삭제
  }
  /*
  devServer: {
    proxy: { // proxyTable 설정
      '^/common': {
        target: 'http://211.53.209.103:8080',
        hostRewrite: "211.53.209.103:8080",
        changeOrigin: true,
        pathRewrite: { "^/api/": "/api/" }
      }
      ,'^/userRoom': {
        target: 'http://211.53.209.103:8080',
        hostRewrite: "211.53.209.103:8080",
        changeOrigin: true,
        pathRewrite: { "^/api/": "/api/" }
      }
    }
    //proxy : 'http://localhost'
    // proxy : 'http://localhost:8000'
     //proxy : 'http://211.53.209.103:8080'

  }*/
  ,outputDir: './dist'
})
