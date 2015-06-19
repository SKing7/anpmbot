# anpmbot
auto npm install/update by package.json

###INSTALL
```shell
   npm install anpmbot
```
###OPTIONS
#### packageJson

package.json的路径，相对于process.cwd()

#### moduleUpdateOnlyLimit

update时，仅检查moduleUpdateOnlyLimit中的模块，为空或者不设置，则视为所有模块

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
    var anpmbot = require(anpmbot);
    anpmbot.config({
        packageJson: './package.json',
        moduleUpdateOnlyLimit: ['compscaf'],
        packages: {
            devDependencies: true,
            dependencies: true,
        },
    });
    anpmbot.run();
```

###SAMPLE

```shell
    #run sample
    npm test
```
