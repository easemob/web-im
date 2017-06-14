## 环信 WebIM sdk

测试环信WebIM请访问：https://webim.easemob.com

更多关于环信的开发文档请见：https://docs.easemob.com


## 

## QA

### Q: IE8下总是提示**拒绝访问**

A: 请确保自己的demo地址是否通过web服务，以http协议访问
   
原因见： [XDomainRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XDomainRequest)

```
XDomainRequest为了确保安全构建，采用了多种方法。
- 安全协议源必须匹配请求的URL。（http到http，https到https）。如果不匹配，请求会报“拒绝访问”的错误。
```


### no such file or directory, scandir 'node_modules/node-sass/vendor'

`npm rebuild node-sass` is the official solution. Deleting your node_modules and running `npm install` will also do the trick.

https://github.com/sass/node-sass/issues/1579
