## 目标
- Html处理
  - 安装Html插件
      ``` 
      yarn add html-webpack-plugin -D
      ``` 
  - 多页生成不同的js入门文件
    - 在HtmlWebpackPlugin插件中使用chunks:['bundle1','bundle2'],
- Css处理
  - 内联使用style-loader
  - 使用文件外联link标签 使用MiniCssExtractPlugin
    - 安装mini-css-extract-plugin
      ``` 
      yarn add mini-css0extkvract-plugin css-loader -D
      ```
    - 压缩，但发现不太好用，易忘记，暂不深入研究
      ```
      yarn add optimize-css-assets-webpack-plugin -D
      ```
- Less处理
  - 安装less less-loader
    ```
      yarn add less less-loader -D
    ```  
- 常用插件
- js处理
  - 分组处理
    - 具体看webpack.config.js文件 entry与output 部分；
  - sourceMap
    - 在webpack.config.js 使用 devtool:'source-map',
  - 压缩
    - 生产模式自动压缩,
  - 热更新
    -  可以查看视频：https://www.bilibili.com/video/av51693431?p=27
  - 混淆
- copy插件
  - copy插件：copy-webpack-plugin
  - js压缩插件：uglify-es
  - css压缩插件：mini-css-extract-plugin
  - html压缩插件：html-minifier
  - 清空上次打包插件:  clean-weppack-plugin
  - 以上插件安装代码：
  ```
  yarn add copy-webpack-plugin uglify-es mini-css-extract-plugin html-minifier clean-weppack-plugin -D
  ```
## 遇到的问题
