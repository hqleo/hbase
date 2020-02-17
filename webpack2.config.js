// path
let path = require("path");
//打包模式:true：不压缩；Flase：压缩；
let devMode = false;
//打包目录
let packPath = "dist";

//插件
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let OptimizeCss = require("optimize-css-assets-webpack-plugin");
let UglifyJsPlugin = require("uglifyjs-webpack-plugin");

//copy插件
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Uglify = require("uglify-es");
const CleanCSS = require("clean-css");
const HtmlMinify = require('html-minifier');

//清除插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  //优化项
  // optimization: {
  //   minimizer:[
  //     //js
  //     // new UglifyJsPlugin({
  //     //   test: /\.js(\?.*)?$/i,  //测试匹配文件,
  //     //   cache:true,
  //     //   //并发打包，压缩多个
  //     //   parallel:true,
  //     //   sourceMap:true
  //     // }),
  //     new OptimizeCss()
  //   ]
  // },
  //开发服务器配置
  devServer: {
    //启用热更新
    hot: false,
    port: 3000,
    progress: true,
    contentBase: "./" + packPath
    // compress:true
  },
  //打包模式
  mode: devMode ? "development" : "production",
  devtool: devMode ? "source-map":"",
  //多组，多文件入口处理
  entry: {
    bundle1: "./src/webpack.js"
    // bundle2: "./src/js/index2.js",
    // bundle3: ["./src/js/index3-1.js", "./src/js/index3-2.js"]
  },
  //文件输出
  output: {
    filename: "[name].js",
    // filename: "[name]_[hash:8].js",

    path: path.resolve(__dirname, packPath)
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: "./src/login.html",
    //   filename: "login.html",
    //   //使用入门的代码块
    //   // chunks:['bundle1','bundle2','bundle3'],
    //   chunks: ["bundle1"],
    //   minify: {
    //     //删除双引号
    //     removeAttributeQuotes: false,
    //     //压缩成一行
    //     collapseWhitespace: !devMode
    //   },
    //   hash: false
    // }),
    // new MiniCssExtractPlugin({
    //   filename: "index.css",
    //   minify: {
    //     //压缩成一行
    //     collapseWhitespace: !devMode
    //   }
    // }),
    new webpack.ProgressPlugin(),
    //清除上次更新插件
    new CleanWebpackPlugin({
      // cleanOnceBeforeBuildPatterns: ['!./th3rd/*'],
      cleanOnceBeforeBuildPatterns: ['*.*','img','page'],
    }),
    //打印更新的模块路径
    new webpack.NamedModulesPlugin(),
    //热更新插件
    new webpack.HotModuleReplacementPlugin(),

    //copy插件
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "./", "src/img/"), //从哪里拷贝
        to: "img" //拷贝到哪里去，想压缩图片的可自行琢磨
      },
      //公用库，只需要生成一次，
      // {
      //   from: path.join(__dirname, "./", "src/lib/th3rd/"),
      //   to: "lib/th3rd"
      // },
      {
        from: path.join(__dirname, "./", "src/*.html"),
        to: "./",
        context: 'src/',//去掉src目录路径
      },
      {//压缩Html文件
        from: path.join(__dirname, "./", "src/page/*/*.html"),
        to: './',
        context: 'src/', //去掉src目录路径
        test: /([^/]+)\/(.+)\.html$/,             
        transform: function(content,path) { //压缩
          console.log("htmlMinify", path);
          return HtmlMinify.minify(content.toString(),{
            //压缩成一行
            collapseWhitespace: !devMode,
            //删除摘要
            removeComments:!devMode
          });  
        }
      },
      {//压缩css文件
        from: path.join(__dirname, "./", "src/page/*/*.css"),
        to: './',
        context: 'src/',
        test: /([^/]+)\/(.+)\.css$/,        
        transform: function(content,path) {
          console.log("CleanCSS", path);
          return new CleanCSS({}).minify(content).styles; 
        }
      },
      {//压缩js文件
        from: path.join(__dirname, "./", "src/page/*/*.js"),
        to: "./",
        context: 'src/',
        test: /([^/]+)\/(.+)\.js$/,
        transform: function(content,path) {
          console.log("Uglify js", path);
          return Uglify.minify(content.toString()).code; 
        }
      }
    ])
  ],
  //模块
  module: {
    //loader
    rules: [
      //css loader
      {
        test: /\.css$/,
        //loader 顺序从右向左执行，从下到上执行
        // use:['style-loader','css-loader' ]
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      //css loader
      {
        test: /\.less$/,
        //loader 顺序从右向左执行，从下到上执行
        // use:['style-loader','css-loader' ]
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      }
    ]
  }
};
