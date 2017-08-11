QA


## 1. 如果在npm i的过程中遇到

```
> phantomjs-prebuilt@2.1.14 install /Users/will/work/my-project/node_modules/phantomjs-prebuilt
> node install.js

PhantomJS not found on PATH
Downloading https://github.com/Medium/phantomjs/releases/download/v2.1.1/phantomjs-2.1.1-macosx.zip
Saving to /var/folders/mh/2ptfthxj2qb49jscj1b0gjsm0000gn/T/phantomjs/phantomjs-2.1.1-macosx.zip
Receiving...

Error making request.
Error: connect ETIMEDOUT 54.231.113.227:443
    at Object.exports._errnoException (util.js:1018:11)
    at exports._exceptionWithHostPort (util.js:1041:20)
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1090:14)
```

FIX: 这个问题，可以尝试PHANTOMJS_CDNURL=https://npm.taobao.org/mirrors/phantomjs/ npm install --save-dev phantomjs-prebuilt来解决

## 2. 执行npm start时如果出现

```
> node scripts/start.js

/Users/wenke/www/web-im/demo/scripts/start.js:23
const {
      ^

SyntaxError: Unexpected token {
    at exports.runInThisContext (vm.js:53:16)
    at Module._compile (module.js:373:25)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)
    at startup (node.js:139:18)
    at node.js:974:3
```
FIX: 请检查node版本是否是v6.0+