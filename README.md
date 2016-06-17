## 环信 WebIM sdk

测试环信WebIM请访问 https://webim.easemob.com。

登录可以使用环信UIDemo的账号和密码（见http://www.easemob.com/demo)

环信WebIM快速入门文档请见：https://github.com/easemob/web-im/blob/master/sdk/quickstart.md

更多关于环信的开发文档请见：https://docs.easemob.com

##目录
<pre>
/*demo相关文件*/
|---README.MD：相关说明
|---easemob.im.config.js：sdk集成需要修改的配置文件
|---index.html：demo首页，包含sdk基础功能和浏览器兼容性的解决方案
|---bootstrap.js：demo依赖脚本
|---img/：demo相关图片
|---css/：demo相关样式文件
/*sdk相关文件*/
|---sdk/：
    /*sdk相关说明文档*/
    |---release.txt：各版本更新细节
    |---quickstart.md：环信WebIM快速入门文档
    /*sdk*/
    |---easemob.im-1.0.7.js：环信WebIMSDK
    /*sdk依赖文件*/
    |---jquery-1.11.1.js：sdk依赖脚本
    |---strophe.js：
    |---json2.js：
    /*sdk支持IE7+依赖文件*/
    |---jplayer/：对于不支持audio标签的浏览器，使用jPlayer解决无法播放语音的问题，但此方案当前只支持MP3
    |---swfupload/：对不支持异步上传的浏览器使用此组件提供支持
</pre>
