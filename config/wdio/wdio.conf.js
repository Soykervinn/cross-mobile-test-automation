const DriverFactory = require('../../utils/driver/driverFactory');
require('dotenv').config();

exports.config = {
    runner: 'local',
    specs: [
        './tests/**/*.test.js'
    ],
    exclude: [],
    maxInstances: 1,
    capabilities: [],
    logLevel: 'info',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [],
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
        const deviceInfo = DriverFactory.getDeviceInfo();
        
        // Get capabilities from factory
        const caps = await DriverFactory.createDriver(deviceInfo.platform, deviceInfo.target);
        
        // Set up services based on target
        if (deviceInfo.isCloud) {
            if (deviceInfo.target === 'saucelabs') {
                this.services.push(['sauce', {
                    user: process.env.SAUCE_USERNAME,
                    key: process.env.SAUCE_ACCESS_KEY,
                    region: process.env.SAUCE_REGION || 'us'
                }]);
            } else if (deviceInfo.target === 'browserstack') {
                this.services.push(['browserstack', {
                    browserstackLocal: true,
                    opts: { force: true },
                    credentials: {
                        username: process.env.BROWSERSTACK_USERNAME,
                        key: process.env.BROWSERSTACK_ACCESS_KEY
                    }
                }]);
            }
        } else {
            // Local Appium service
            this.services.push(['appium', {
                logPath: './logs',
                command: 'appium',
                args: {
                    debugLogSpacing: true,
                    sessionOverride: true,
                    allowInsecure: ['chromedriver_autodownload']
                }
            }]);
        }

        // Update capabilities
        this.capabilities = [caps];

        // Add global helper methods
        global.deviceInfo = deviceInfo;
    },

    beforeTest: async function (test, context) {
        // Setup for test
        console.log(`Running test: ${test.title}`);
    },

    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            // Take screenshot on failure
            const timestamp = new Date().getTime();
            const screenshotPath = `./reports/screenshots/failed_${test.title}_${timestamp}.png`;
            await browser.saveScreenshot(screenshotPath);
            
            // Attach screenshot to Allure report
            await browser.addAttachment(
                'Screenshot',
                Buffer.from(await browser.takeScreenshot(), 'base64'),
                'image/png'
            );
        }
    },

    onComplete: async function(exitCode, config, capabilities, results) {
        // Cleanup or final tasks
        console.log('Test execution completed');
    }
}; 