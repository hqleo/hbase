- 常用说明
  - 忽略文件.gitigonre说明
    - /mtk 过滤整个文件夹
    - *.zip 过滤所有.zip文件
    - /mtk/do.c 过滤某个具体文件
    - !/mtk/one.txt 追踪（不过滤）某个具体文件
    - 注意：如果你创建.gitignore文件之前就push了某一文件，那么即使你在gitignore文件中写入过滤该文件的规则，该规则也不会起作用，git仍然会对该文件进行版本管理。

    - 以斜杠“/”开头表示目录；
    - 以星号“*”通配多个字符；
    - 以问号“?”通配单个字符
    - 以方括号“[]”包含单个字符的匹配列表；
    - 以叹号“!”表示不忽略(跟踪)匹配到的文件或目录。
    - 注意： git 对于 .gitignore配置文件是按行从上到下进行规则匹配的
  
  - 中文显示
    - 打开Git Bash后，对窗口右键->Options->Text->Locale改为zh_CN，Character set改为UTF-8
    - git config core.quotepath false
    - 试试git --no-pager log
    - 如果可以显示的话，把pager设置为more
    - git config --global core.pager more

  - 常用命令
    - 注册
      - git config --global user.name "xxx"
      - git config --global user.email "xxx@xxx.com"

    - 提交
      - Add
        - git add -A
        - git add .
      - Commit
        - git commit -m "备注"
      - status
        - git status
        - git reflog
        - git log
      - 切换版本
        - git checkout [commit-id]
    - 分支
      - 创建分支
        - git branch [branch name]
      - 切换分支
        - git checkout [branch name]
      - 查看分支
        - big branch
      - 合并分支
        - 快进式
          - git checkout master
          - git merge dev
        - 步进式
          - git checkout master
          - git merge --no -ff -m 'merge info' [branch name]
      - 删除分支
        - 完成后删除
          - git checkout master
          - git branch -d [branch name]
        - 强制删除
          - git checkout master
          - git branch -d [branch name]
    - tag
      - 建立tag
        - git tag [tagName]
      - push
        - git push [branch name] --tags
      - check
        - git tag
      - delete tag
        - git push [branch name] --tags
    - 远程仓库
      - 建立连接
        - git remote add scource git@hithub.com:xxxx/*.git
      - 远程更新到本地
        - git pull origin master
      - 本地更新到远程
        - git push origin master
    - ssh
      - 生成ssh-keygen.exe
      - 把公钥.pub COPY到github或者把私钥文件放到C:\Users\xxx\.ssh 
  - github 与 gitee 同时使用
    - 先在github与gitee有两个建立项目
      - 先push一个，然后在另一个使用参数[-f]进行强制上传
      ```
      git push xxx master -f 
      ```
    - 同步后，克隆与更新
    ```
    git clone xxx.git
    git remote add xxx xxx.git
    git push xxx master
    ```
      
       