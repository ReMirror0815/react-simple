const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/index.js",
  output: {
    // __dirname当前文件的目录绝对路径
    path: path.resolve(__dirname, '../build'),
    // filename: "bundle-[fullhash].js"
    filename: "bundle.js"
  },

  // loader: 1.下载 2.使用
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ // use 从下到上执行
          // 创建style标签，将js中的样式资源插入添加到head中
          'style-loader',
          // 将css文件变成commonjs模块加载js中
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 安装less、less-loader
          'less-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            // 转译jsx
            presets: ['@babel/preset-react'],
            plugins: [
              ["@babel/plugin-transform-react-jsx", {
                "pragma": "React.createElement"
              }]
          ]
          }
        }
      },
      // webpack的版本升级当前loader不需要了
      // {
      //   test: /\.(jpg|png|gif|jpeg)$/,
      //   // 安卓url-loader file-loader
      //   // 默认处理不了html
      //   loader: 'url-loader',
      //   options: {
      //     // 图片大小小雨8kb会被转变成base64处理
      //     // 优点： 减少请求数量 减轻服务器压力
      //     // 缺点： 图片体积会更大 文件请求速度变慢
      //     limit: 8 * 1024,
      //     // url-loader默认使用es6模块解析，而html-loader是commonjs
      //     // 解决：默认关闭url-loader的es6模块化
      //     esModule: false,
      //     name: '[hash:10].[ext]'
      //   }
      // },
      {
        test: /\.html$/,
        // 处理html文件中的img图片（负责引入img从而能被url-loader处理）
        loader: 'html-loader'
      },
      // {
      //   // 排除以下资源打包进行打包
      //   exclude: /\.(css|less|js|html|json|jpg|png|gif|jpeg)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[hash:10].[ext]',
      //   }
      // }
    ]
  },

  // plugins: 1.下载 2.引用 3.使用
  plugins: [
    new HtmlWebpackPlugin({
      // template复制路径文件，并自动引入打包输出的所有资源js/css
      template: './src/index.html'
    })
  ],

  mode: 'development',

  // 只会在内存中编译打包，不会有任何输出
  devServer: {
    static:{
      directory: path.resolve(__dirname, '../build'),
    },
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
  }
};











