const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  pages: {
    index: {
      //入口
      entry: 'src/main.js'
    }
  },
  // 关闭eslint校验
  lintOnSave: false,
  devServer:{
    proxy:{
      // 配置代理
      '/api':{
        target:'http://39.98.123.211',
        // pathRewrite:{'^/api':''},
      }
    }
  }
})
