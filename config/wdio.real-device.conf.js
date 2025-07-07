const path = require('path');
const { config } = require('./wdio/wdio.conf');

exports.config = {
    ...config,
    specs: [
        path.resolve(__dirname, './tests/android/specs/login/login.test.js')
    ],
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'deviceId', // deviceId, run adb devices to get the deviceId
        'appium:platformVersion': 'AUTO', // OS version
        'appium:app': path.resolve(__dirname, '../apps/dummy-example.apk'),
        'appium:automationName': 'UiAutomator2',
        'appium:noReset': true,
        'appium:fullReset': false
    }],
    services: [
        ['appium', {
            args: {
                address: '127.0.0.1',
                port: 4723
            },
            command: 'appium'
        }]
    ],
    port: 4723,
    path: '/wd/hub',
    before: function (capabilities, specs) {
        console.log('Strating test in real device...');
    },
    after: function (result, capabilities, specs) {
        console.log('Real device test completed.');
    }
}; 