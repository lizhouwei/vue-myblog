// vue.config.js
const path = require('path')
 
module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? '/' : './',
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    lintOnSave: true, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
        Object.assign(config, { // 开发生产共同配置
          resolve: {
            extensions: ['.js', '.vue', '.less', '.css', '.scss', '.json'],
            alias: {
                'src': path.resolve(__dirname, './src'),
                'assets': path.resolve(__dirname, './src/assets'),
                'components': path.resolve(__dirname, './src/components'),
                'views': path.resolve(__dirname, './src/views'),
                'styles': path.resolve(__dirname, './src/styles'),
                'api': path.resolve(__dirname, './src/api'),
                'utils': path.resolve(__dirname, './src/utils'),
                'store': path.resolve(__dirname, './src/store'),
                'router': path.resolve(__dirname, './src/router'),
                'mock': path.resolve(__dirname, './src/mock'),
                'vendor': path.resolve(__dirname, './src/vendor'),
                'static': path.resolve(__dirname, './static'),
            }
          }
        })
    },
    parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
    css: {
        sourceMap:true,
        loaderOptions: {
          css: {
            // 这里的选项会传递给 css-loader
          },
          postcss: {
            // 这里的选项会传递给 postcss-loader
          }
        }
    },
    devServer: {
      port: 8080, // 端口号
      host: 'localhost',
      https: false, // https:{type:Boolean}
      open: true, //配置自动启动浏览器
      // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
      proxy: {
        '/myblog': {
            target: 'http://localhost:80/myblog',   // 需要请求的地址
            changeOrigin: true,  // 是否跨域
            pathRewrite: {
               '^/myblog': ''  // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
            }
        }
      }  // 配置多个代理
    }

}