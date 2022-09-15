const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugins.delete('prefetch');//prefetch 삭제
  },
  devServer: {
    //proxy : 'http://localhost:8000'
    proxy : 'http://211.53.209.103:8080'
  }
})
