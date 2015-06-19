var anpmbot = require('../index');
anpmbot.config({
    packageJson: './test/package.test.json',
    moduleUpdateOnlyLimit: ['compscaf'],
    packages: {
        devDependencies: true,
        dependencies: true,
    },
});
anpmbot.run();
