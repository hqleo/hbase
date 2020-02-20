// path
let path = require("path");
//打包模式:true：不压缩；Flase：压缩；
let devMode = false;
//打包目录
let packPath = "dist";
//json 配置
var fs = require("fs");

// let builded=1;
// writeJson("app.json",'builded',1);
let builded = readJsonKey("app.json", "builded");
if (builded==0){
  console.log('builded=0,初始化首次生成',builded);
}

function readJsonKey(filename, key) {
  var res;
  //同步读取
  var data = fs.readFileSync(filename);
  var app = data.toString(); //将二进制的数据转换为字符串  
  app = JSON.parse(app); //将字符串转换为json对象  
  res = app[key];  
  return res;
}

//在真实的开发中id肯定是随机生成的而且不会重复的，下一篇写如何生成随机切不会重复的随机数，现在就模拟一下假数据
//写入json文件选项
function writeJson(filename, key, value) {
  //现将json文件读出来
  fs.readFile(filename, function(err, data) {
    if (err) {
      return console.error(err);
    }
    var app = data.toString(); //将二进制的数据转换为字符串
    app = JSON.parse(app); //将字符串转换为json对象
    app[key] = value; //将传来的对象push进数组对象中
    var str = JSON.stringify(app); //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile(filename, str, function(err) {
      if (err) {
        console.error(err);
      }
      console.log("---------修改成功-------------");
      console.log(filename, key, value);
    });
  });
}
// writeJson(params); //执行一下;

//插件
const webpack = require("webpack");

//copy插件
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Uglify = require("uglify-es");
const CleanCSS = require("clean-css");
const HtmlMinify = require("html-minifier");

//清除插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//copy插件数组
let copyArray = [];
//公用库，只需要生成一次
if (builded == 0) {
  copyArray.push({
    from: path.join(__dirname, "./", "src/lib/th3rd/"),
    to: "lib/th3rd"
  });
  writeJson("app.json",'builded',1);
}

copyArray.concat([
  {
    from: path.join(__dirname, "./", "src/img/"), //从哪里拷贝
    to: "img" //拷贝到哪里去，想压缩图片的可自行琢磨
  },

  {
    from: path.join(__dirname, "./", "src/*.html"),
    to: "./",
    context: "src/" //去掉src目录路径
  },
  {
    //压缩Html文件
    from: path.join(__dirname, "./", "src/page/*/*.html"),
    to: "./",
    context: "src/", //去掉src目录路径
    test: /([^/]+)\/(.+)\.html$/,
    transform: function(content, path) {
      //压缩
      console.log("htmlMinify", path);
      return HtmlMinify.minify(content.toString(), {
        //压缩成一行
        collapseWhitespace: !devMode,
        //删除摘要
        removeComments: !devMode
      });
    }
  },
  {
    //压缩css文件
    from: path.join(__dirname, "./", "src/page/*/*.css"),
    to: "./",
    context: "src/",
    test: /([^/]+)\/(.+)\.css$/,
    transform: function(content, path) {
      console.log("CleanCSS", path);
      return new CleanCSS({}).minify(content).styles;
    }
  },
  {
    //压缩js文件
    from: path.join(__dirname, "./", "src/page/*/*.js"),
    to: "./",
    context: "src/",
    test: /([^/]+)\/(.+)\.js$/,
    transform: function(content, path) {
      console.log("Uglify js", path);
      return Uglify.minify(content.toString()).code;
    }
  }
]);

module.exports = {
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
  devtool: devMode ? "source-map" : "",
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
    //清除上次更新插件
    new CleanWebpackPlugin({
      // cleanOnceBeforeBuildPatterns: ['!./th3rd/*'],
      cleanOnceBeforeBuildPatterns: ["*.*", "img", "page"]
    }),
    //打印更新的模块路径
    new webpack.NamedModulesPlugin(),
    //热更新插件
    new webpack.HotModuleReplacementPlugin(),
    //copy插件
    new CopyWebpackPlugin(copyArray)
  ]
};
