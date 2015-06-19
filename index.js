var winston = require('winston');
var semver = require('semver');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var exec = require('sync-exec');
var cacheFile = 'cache.json';
var fullPath = path.join(__dirname, cacheFile);

winston.loggers.add('colored', {
    console: {
        colorize: true,
    },
});
var initCache = function () {
    if (fs.existsSync(fullPath)) { 
        return;
    } 
    fs.writeFile(fullPath, '');
};

initCache();

var logger = winston.loggers.get('colored');

function anonymous() {
    var exports = {
        options: {},
    };
    var devDeps = {
        type: 'devDependencies',
        installType: '--save-dev'
    };

    var prodDeps = {
        type: 'dependencies',
        installType: '--save'
    };
    var getSpawnOptions = function (type, dep, saveType) {
        var options;
        switch(type) {
        case 'update':
            options = ['npm', 'update', dep];
            break;
        case 'install':
            options = ['npm', 'install', dep, saveType];
            break;
        }
        return options;
    };
    var getPackageJsonPath = function () {
        if (exports.options.packageJson) {
            return path.join(process.cwd(), exports.options.packageJson);
        } else {
            logger.log('error', 'option.package is needed');
        }
    };
    var getPackageJson = function (from) {
        var pkg;
        try {
            //load package json
            pkg = require(from);
        } catch (e) {
            logger.log('error', e);
        }
        return pkg;
    };
    var isValidModule = function (mod) {
        var modulesLimit = exports.options.moduleUpdateOnlyLimit || [];
        if (modulesLimit.length > 0) {
            return modulesLimit.indexOf(mod.name) >= 0;
        }
        return true;
    };
    var getCheckList = function (packages) {
        var moduleSet = [];
        var options = exports.options;
        var packageJson = getPackageJson(getPackageJsonPath());  

        _.forEach(packages, function (pkg) {
            var modules = packageJson[pkg.type];
            _.forEach(modules, function (version, name) {
                moduleSet.push({
                    name: name,
                    v: version,
                    type: pkg.type,
                    installType: pkg.installType,
                });
            });
        });
        return moduleSet;
    };
    var isInstalled = function (mod) {
        if (fs.existsSync(path.join(process.cwd(), 'node_modules', mod))) {
            return true;
        }
        return false;
    }
    var getUpdateType = function (mod) {
        return isInstalled(mod.name) ? 'update' : 'install';
    }
    var updatePackage = function (packages) {
        var mappedModules = getCheckList(packages);
        _.forEach(mappedModules, function (mod) {
            var updateType = getUpdateType(mod);
            var spawnCode;
            if (updateType === 'update' && !isValidModule(mod)) {
                return;
            }
            spawnCode = getSpawnOptions(updateType, mod.name, mod.installType).join(' ');
            logger.log('info', spawnCode);
            var processInfo = exec(spawnCode, {
                cwd: process.cwd()
            })
            if (processInfo.stdout)
                logger.log('info', processInfo.stdout);
            if (processInfo.stderr)
                logger.log('warn', processInfo.stderr);
        });

    };
    var checkVersion = function (tv) {
        var v;
        v = fs.readFileSync(fullPath).toString();
        if (!tv || !v) {
            //tv != '' && v = '' 第一次运行
            //tv = '' && v != '' 每次都check
            if (tv) {
                fs.writeFile(fullPath, tv);
            }
            return true;
        }
        return semver.gt(tv, v)
    };
    exports.run = function () {
        var options = exports.options;
        if (checkVersion(options.version)) {
            var packages = _.filter([devDeps, prodDeps], function (obj) {
                return  options.packages[obj.type]
            });
        }
        updatePackage(packages);
    };
    exports.config = function (config) {
        exports.options = _.assign(exports.options, config);
    };
    exports.updateModules = function () {
        getModulesList();
    };
    exec('touch ./cache.json');
    return exports;
}
module.exports = anonymous(); 
