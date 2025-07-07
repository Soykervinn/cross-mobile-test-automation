const path = require('path');
exports.config = {
    runner: 'local',
    port: 4723,
    maxInstances: 1,
    specs: [
        path.join(__dirname, '..', 'tests', 'android', 'specs', '**', '*.test.js')
    ],
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'emulator-5554',
        'appium:udid': 'emulator-5554',
        'appium:app': '/Users/kervinn/Desktop/My Workspace/Appium/cross-mobile-test-automation/apps/dummy-example.apk',
        'appium:appPackage': 'com.play.universal',
        'appium:appActivity': '.MainActivity',
        'appium:noReset': false,
        'appium:fullReset': true,
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 180,
        'appium:androidDeviceReadyTimeout': 30,
        'appium:adbExecTimeout': 120000,
        'appium:uiautomator2ServerLaunchTimeout': 60000,
        'appium:uiautomator2ServerInstallTimeout': 60000,
        'appium:androidInstallTimeout': 90000,
        'appium:autoLaunch': true,
        'appium:skipUnlock': true,
        'appium:systemPort': 8201
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 45000,
    connectionRetryTimeout: 180000,
    connectionRetryCount: 3,
    services: [
        ['appium', {
            command: 'appium',
            args: {
                address: '127.0.0.1',
                port: 4723,
                relaxedSecurity: true,
                basePath: '/'
            }
        }]
    ],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 180000
    },

    before: async function (capabilities, specs) {
        console.log('Starting test with working configuration');
        // Wait for Appium to be ready
        await new Promise(resolve => setTimeout(resolve, 15000));
    }
} 