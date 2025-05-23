const DriverFactory = require('./utils/driverFactory');
require('dotenv').config();

exports.config = {
    runner: 'local',
    specs: [
        './tests/android/specs/**/*.js'
    ],
    exclude: [],
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Pixel_5_-_Testing',
        'appium:app': './apps/dummy-example.apk',
        'appium:noReset': true,
        'appium:fullReset': false,
        'appium:dontStopAppOnReset': true,
        'appium:autoGrantPermissions': true,
        'appium:forceAppLaunch': true,
        'appium:skipUnlock': true,
        'appium:skipDeviceInitialization': true,
        'appium:newCommandTimeout': 60,
        'appium:appWaitActivity': '*',
        'appium:appWaitDuration': 20000,
        'appium:androidInstallTimeout': 90000,
        'appium:avdLaunchTimeout': 180000,
        'appium:avdReadyTimeout': 180000,
        'appium:adbExecTimeout': 120000
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['appium'],
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'reports/allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    // Hook to set up capabilities based on environment
    before: async function (capabilities, specs) {
        const platform = process.env.PLATFORM || 'android';
        const target = process.env.TARGET || 'usb';
        
        // Get capabilities from factory
        const caps = await DriverFactory.createDriver(platform, target);
        
        // Set up services based on target
        if (target === 'saucelabs') {
            this.services.push(['sauce', {
                user: process.env.SAUCE_USERNAME,
                key: process.env.SAUCE_ACCESS_KEY,
                region: 'us'
            }]);
        } else if (target === 'browserstack') {
            this.services.push(['browserstack', {
                browserstackLocal: true,
                opts: {
                    force: true
                },
                credentials: {
                    username: process.env.BROWSERSTACK_USERNAME,
                    key: process.env.BROWSERSTACK_ACCESS_KEY
                }
            }]);
        } else {
            // Local Appium service
            this.services.push(['appium', {
                logPath: './logs',
                command: 'appium',
                args: {
                    debugLogSpacing: true,
                    platformName: platform,
                    platformVersion: platform === 'android' ? '11.0' : '15.0'
                }
            }]);
        }

        // Update capabilities
        this.capabilities = [caps];
    },

    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    }
}; 