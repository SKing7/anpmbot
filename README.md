# anpmbot
auto npm install/update by package.json

##install
```shell
   npm install anpmbot
```
##options
### packageJson

package.json的路径，相对于process.cwd()

###moduleUpdateOnlyLimit

update时，仅检查moduleUpdateOnlyLimit中的模块，为空或者不设置，则视为所有模块

###package

设置是否检查对应类型的模块

```js
package: {
   devDependencies: boolean,
   dependencies: boolean, 
}

```

```js
    {
        packageJson: './package.json', 
        moduleUpdateOnlyLimit: ['test'], 
        packages: {
            devDependencies: true, //是否检查类型devDependencies
            dependencies: true, //是否检查类型devDependencies
        }
    }
```
##usage

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

#sample

```shell
    git clone git@github.com:SKing7/anpmbot.git
    cd anpmbot
    npm install anpmbot --production
    #run sample
    npm test
```
