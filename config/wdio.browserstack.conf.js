const path = require('path');
const { config } = require('./wdio/wdio.conf');

exports.config = {
    ...config,
    
    // BrowserStack specific configuration
    user: 'kervinnaguilera_7bg03n',
    key: 'aczkaqoJEpWZpaGVYeMs',
    
    services: [
        ['browserstack', {
            browserstackLocal: false
        }]
    ],
    
    capabilities: [{
        platformName: 'android',
        'appium:deviceName': 'Samsung Galaxy S23',
        'appium:osVersion': '13.0',
        'appium:app': 'bs://07d8d0a0a625abfa6ef3dd5404181a5963271d27',
        'bstack:options': {
            projectName: 'Cross Mobile Test Automation',
            buildName: 'Android Tests',
            sessionName: 'Login Tests',
            debug: true,
            networkLogs: true,
            deviceLogs: true
        }
    }],
    
    // BrowserStack specific specs
    specs: [
        path.join(__dirname, '..', 'tests', 'android', 'specs', '**', '*.test.js')
    ],
    
    // BrowserStack specific hooks
    before: function (capabilities, specs) {
        console.log('Starting BrowserStack test session...');
    },
    
    after: function (result, capabilities, specs) {
        console.log('BrowserStack test session completed');
    }
}; 