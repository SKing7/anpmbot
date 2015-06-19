# anpmbot
auto npm install/update by package.json

##install
   npm install anpmbot

##options
```json
    {
        packageJson: './package.json', //package.json的路径，相对于process.cwd()
        moduleUpdateOnlyLimit: [], //仅检查列出的模块
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
