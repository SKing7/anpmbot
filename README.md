# anpmbot
auto npm install/update by package.json

根据package.json的依赖关系，对指定模块或全部【如不设】可以自动进行更新和安装到最新版本

另外因为检查更新比较耗时，支持通过手动维护版本号来判断是否需要检查的版本号。

###INSTALL
```shell
   npm install anpmbot
```
###OPTIONS
#### packageJson

package.json的路径，相对于process.cwd()

#### moduleUpdateOnlyLimit

update时，仅检查moduleUpdateOnlyLimit中的模块，为空或者不设置，则视为所有模块

#### version [x.x.x]

可设置版本号，只有本次版本号比上次更新时的版本号高时，才进行更新

非安装模块的版本号，是anpmbot自身维护的本地cache版本号

#### package

设置是否检查对应类型的模块

```js
package: {
   devDependencies: boolean,
   dependencies: boolean, 
}

```

###USAGE

```js
    var anpmbot = require('anpmbot');
    anpmbot.config({
        packageJson: './package.json',
        moduleUpdateOnlyLimit: ['compscaf'],
        packages: {
            devDependencies: true,
            dependencies: true,
        },
        version: '0.0.1'
    });
    anpmbot.run();
```

###SAMPLE

```shell
    #run sample
    npm test
```
###Reference
https://github.com/pgilad/grunt-dev-update
