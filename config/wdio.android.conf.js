exports.config = {
    runner: 'local',
    port: 4723,
    specs: [
        '../tests/android/specs/**/*.js'
    ],
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Pixel 5 - Testing',
        'appium:app': '/Users/kervinn/Desktop/My Workspace/Appium/cross-mobile-test-automation/apps/dummy-example.apk',
        'appium:appPackage': 'com.play.universal',
        'appium:appActivity': '.MainActivity',
        'appium:noReset': true,
        'appium:fullReset': false,
        'appium:dontStopAppOnReset': true,
        'appium:autoGrantPermissions': true,
        'appium:clearSystemFiles': false,
        'appium:clearPackageData': false,
        'appium:newCommandTimeout': 180,
        'appium:androidDeviceReadyTimeout': 30,
        'appium:adbExecTimeout': 120000,
        'appium:uiautomator2ServerLaunchTimeout': 60000,
        'appium:uiautomator2ServerInstallTimeout': 60000,
        'appium:androidInstallTimeout': 90000,
        'appium:avdLaunchTimeout': 180000,
        'appium:avdReadyTimeout': 180000,
        'appium:autoLaunch': true,
        'appium:skipUnlock': true,
        'appium:disableWindowAnimation': true,
        'appium:waitForQuiescence': false,
        'appium:systemPort': 8201,
        'appium:enforceAppInstall': true,
        'appium:ignoreUnimportantViews': true,
        'appium:allowTestPackages': true,
        'appium:ensureWebviewsHavePages': true,
        'appium:enableMultiWindows': true,
        'appium:skipDeviceInitialization': false,
        'appium:skipServerInstallation': false
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
                address: 'localhost',
                port: 4723,
                relaxedSecurity: true,
                debugLogSpacing: true,
                sessionOverride: true,
                logTimestamp: true,
                localTimezone: true
            },
            logPath: './logs'
        }]
    ],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 180000
    }
} 