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
            'appium:noReset': false,
            'appium:newCommandTimeout': 180,
            'appium:autoGrantPermissions': true
        };

        const baseIOSCaps = {
            platformName: 'iOS',
            'appium:automationName': 'XCUITest',
            'appium:app': path.resolve('./apps/app.app'),
            'appium:noReset': false,
            'appium:newCommandTimeout': 180,
            'appium:autoAcceptAlerts': true
        };

        const configs = {
            android: {
                usb: {
                    ...baseAndroidCaps,
                    'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Device',
                    'appium:udid': process.env.ANDROID_DEVICE_UDID
                },
                emulator: {
                    ...baseAndroidCaps,
                    'appium:deviceName': process.env.ANDROID_EMU_DEVICE || 'Pixel_5_API_30',
                    'appium:avd': process.env.ANDROID_EMU_DEVICE || 'Pixel_5_API_30',
                    'appium:avdLaunchTimeout': 180000,
                    'appium:avdReadyTimeout': 180000
                },
                saucelabs: {
                    ...baseAndroidCaps,
                    'sauce:options': {
                        build: `Android Build ${new Date().getTime()}`,
                        name: process.env.TEST_NAME || 'Android Test',
                        deviceName: process.env.SAUCE_DEVICE || 'Samsung Galaxy S21',
                        platformVersion: process.env.SAUCE_PLATFORM_VERSION || '12.0',
                        appiumVersion: process.env.SAUCE_APPIUM_VERSION || '2.0.0'
                    }
                },
                browserstack: {
                    ...baseAndroidCaps,
                    'bstack:options': {
                        deviceName: process.env.BS_DEVICE || 'Samsung Galaxy S21',
                        osVersion: process.env.BS_OS_VERSION || '12.0',
                        buildName: process.env.BS_BUILD_NAME || `Android Build ${new Date().getTime()}`,
                        projectName: process.env.BS_PROJECT_NAME || 'Mobile App Testing',
                        debug: true,
                        networkLogs: true
                    }
                }
            },
            ios: {
                usb: {
                    ...baseIOSCaps,
                    'appium:deviceName': process.env.IOS_DEVICE_NAME,
                    'appium:udid': process.env.IOS_DEVICE_UDID,
                    'appium:platformVersion': process.env.IOS_PLATFORM_VERSION
                },
                simulator: {
                    ...baseIOSCaps,
                    'appium:deviceName': process.env.IOS_SIM_DEVICE || 'iPhone 13',
                    'appium:platformVersion': process.env.IOS_SIM_VERSION || '15.0',
                    'appium:wdaLocalPort': process.env.WDA_LOCAL_PORT || 8100
                },
                saucelabs: {
                    ...baseIOSCaps,
                    'sauce:options': {
                        build: `iOS Build ${new Date().getTime()}`,
                        name: process.env.TEST_NAME || 'iOS Test',
                        deviceName: process.env.SAUCE_DEVICE || 'iPhone 13',
                        platformVersion: process.env.SAUCE_PLATFORM_VERSION || '15.0',
                        appiumVersion: process.env.SAUCE_APPIUM_VERSION || '2.0.0'
                    }
                },
                browserstack: {
                    ...baseIOSCaps,
                    'bstack:options': {
                        deviceName: process.env.BS_DEVICE || 'iPhone 13',
                        osVersion: process.env.BS_OS_VERSION || '15.0',
                        buildName: process.env.BS_BUILD_NAME || `iOS Build ${new Date().getTime()}`,
                        projectName: process.env.BS_PROJECT_NAME || 'Mobile App Testing',
                        debug: true,
                        networkLogs: true
                    }
                }
            }
        };

        return configs[platform][target];
    }

    static getDeviceInfo() {
        const platform = process.env.PLATFORM || 'android';
        const target = process.env.TARGET || 'usb';
        
        return {
            platform,
            target,
            isLocal: ['usb', 'emulator', 'simulator'].includes(target),
            isCloud: ['saucelabs', 'browserstack'].includes(target),
            isAndroid: platform === 'android',
            isIOS: platform === 'ios'
        };
    }
}

module.exports = DriverFactory; 