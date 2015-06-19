var anpmbot = require('../index');
anpmbot.config({
    packageJson: './test/package.test.json',
    moduleUpdateOnlyLimit: ['compscaf'],
    packages: {
        devDependencies: true,
        dependencies: true,
    },
    version: '0.0.2'
});
anpmbot.run();
