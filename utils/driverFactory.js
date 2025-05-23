const path = require('path');

class DriverFactory {
    static async createDriver(platform = 'android', target = 'usb') {
        const caps = await this.getCapabilities(platform, target);
        return caps;
    }

    static async getCapabilities(platform, target) {
        const baseAndroidCaps = {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:app': path.resolve('./apps/app-debug.apk'),
            'appium:noReset': false
        };

        const baseIOSCaps = {
            platformName: 'iOS',
            'appium:automationName': 'XCUITest',
            'appium:app': path.resolve('./apps/app.app'),
            'appium:noReset': false
        };

        const configs = {
            android: {
                usb: {
                    ...baseAndroidCaps,
                },
                emulator: {
                    ...baseAndroidCaps,
                    'appium:deviceName': 'Pixel_5_API_30',
                    'appium:avd': 'Pixel_5_API_30'
                },
                saucelabs: {
                    ...baseAndroidCaps,
                    'sauce:options': {
                        build: `Android Build ${new Date().getTime()}`,
                        name: 'Android Test'
                    }
                },
                browserstack: {
                    ...baseAndroidCaps,
                    'bstack:options': {
                        deviceName: 'Google Pixel 5',
                        osVersion: '11.0'
                    }
                }
            },
            ios: {
                usb: {
                    ...baseIOSCaps,
                },
                simulator: {
                    ...baseIOSCaps,
                    'appium:deviceName': 'iPhone 12',
                    'appium:platformVersion': '15.0'
                },
                saucelabs: {
                    ...baseIOSCaps,
                    'sauce:options': {
                        build: `iOS Build ${new Date().getTime()}`,
                        name: 'iOS Test'
                    }
                },
                browserstack: {
                    ...baseIOSCaps,
                    'bstack:options': {
                        deviceName: 'iPhone 12',
                        osVersion: '15'
                    }
                }
            }
        };

        return configs[platform][target];
    }
}

module.exports = DriverFactory; 