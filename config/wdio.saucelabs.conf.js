const { config } = require('./wdio/wdio.conf.js');
const path = require('path');

exports.config = {
    ...config,
    
    // Sauce Labs specific configuration
    user: 'oauth-kervinnaguilera-0aa4c',
    key: '3ff6d2e3-cd36-4ef0-8a2d-00734f1e8914',
    region: 'us-west-1',
    
    // Sauce Labs services
    services: [
        ['sauce', {
            sauceConnect: true,
            sauceConnectOpts: {
                tunnelName: 'oauth-kervinnaguilera-0aa4c_tunnel_name'
            }
        }]
    ],
    
    // Capabilities for Sauce Labs
    capabilities: [{
        // Android capabilities for Sauce Labs
        platformName: 'Android',
        'appium:platformVersion': '13.0',
        'appium:deviceName': 'Android GoogleAPI Emulator',
        'appium:automationName': 'UiAutomator2',
        'appium:app': 'storage:77d1a1a7-751d-4e54-9325-7ad79fe81c43',
        'appium:autoGrantPermissions': true,
        'appium:autoAcceptAlerts': true,
        'appium:autoDismissAlerts': true,
        'appium:noReset': false,
        'appium:fullReset': true,
        'appium:waitForIdleTimeout': 0,
        'appium:shouldTerminateApp': true,
        
        // Sauce Labs specific capabilities
        'sauce:options': {
            build: `Cross-Mobile-Test-Automation-${new Date().toISOString().split('T')[0]}`,
            name: 'Android Appium Tests',
            tags: ['android', 'appium', 'cross-mobile'],
            tunnelName: 'oauth-kervinnaguilera-0aa4c_tunnel_name',
            extendedDebugging: true,
            capturePerformance: true
        }
    }],
    
    // Test specs
    specs: [
        path.join(__dirname, '..', 'tests', 'android', 'specs', '**', '*.test.js')
    ],
    
    // Mocha options
    mochaOpts: {
        ui: 'bdd',
        timeout: 180000
    },
    
    // Hooks
    before: async function (capabilities, specs) {
        console.log('Starting Sauce Labs test session...');
        await browser.pause(5000);
    },
    
    beforeTest: async function (test, context) {
        console.log(`Starting test: ${test.title}`);
    },
    
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.saveScreenshot(`./reports/screenshots/saucelabs-${test.title.replace(/\s+/g, '-')}.png`);
        }
    }
}; 