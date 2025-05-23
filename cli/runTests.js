#!/usr/bin/env node
const yargs = require('yargs');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Validate environment setup
function validateEnvironment() {
    // Check if .env file exists
    if (!fs.existsSync('.env')) {
        console.error('Error: .env file not found. Please copy .env.example to .env and configure it.');
        process.exit(1);
    }

    // Check if apps directory exists
    if (!fs.existsSync('./apps')) {
        console.error('Error: apps directory not found. Please create it and add your mobile apps.');
        process.exit(1);
    }
}

// Validate platform and target combination
function validatePlatformTarget(platform, target) {
    const validCombinations = {
        android: ['usb', 'emulator', 'saucelabs', 'browserstack'],
        ios: ['usb', 'simulator', 'saucelabs', 'browserstack']
    };

    if (!validCombinations[platform].includes(target)) {
        console.error(`Error: Invalid combination of platform "${platform}" and target "${target}"`);
        console.error(`Valid combinations for ${platform}:`, validCombinations[platform].join(', '));
        process.exit(1);
    }
}

// Parse command line arguments
const argv = yargs
    .option('platform', {
        alias: 'p',
        description: 'Platform to run tests on',
        type: 'string',
        choices: ['android', 'ios'],
        default: 'android'
    })
    .option('target', {
        alias: 't',
        description: 'Target environment',
        type: 'string',
        choices: ['usb', 'emulator', 'simulator', 'saucelabs', 'browserstack'],
        default: 'usb'
    })
    .option('test', {
        alias: 'f',
        description: 'Test file or directory to run',
        type: 'string',
        default: './tests'
    })
    .option('tags', {
        alias: 'g',
        description: 'Run tests with specific tags',
        type: 'string'
    })
    .option('parallel', {
        description: 'Number of parallel instances',
        type: 'number',
        default: 1
    })
    .option('debug', {
        description: 'Run tests in debug mode',
        type: 'boolean',
        default: false
    })
    .help()
    .argv;

// Validate setup
validateEnvironment();
validatePlatformTarget(argv.platform, argv.target);

// Set environment variables
process.env.PLATFORM = argv.platform;
process.env.TARGET = argv.target;
if (argv.tags) process.env.TEST_TAGS = argv.tags;
if (argv.debug) process.env.DEBUG = 'true';

// Prepare WebdriverIO command
const wdioArgs = [
    'wdio',
    'run',
    './config/wdio/wdio.conf.js',
    '--spec',
    argv.test
];

if (argv.parallel > 1) {
    wdioArgs.push('--instances', argv.parallel);
}

// Run the tests using WebdriverIO
console.log(`Starting tests with configuration:
- Platform: ${argv.platform}
- Target: ${argv.target}
- Tests: ${argv.test}
- Parallel Instances: ${argv.parallel}
- Debug Mode: ${argv.debug ? 'Yes' : 'No'}
`);

const wdio = spawn('npx', wdioArgs, {
    stdio: 'inherit',
    shell: true
});

wdio.on('error', (error) => {
    console.error('Error executing tests:', error);
    process.exit(1);
});

wdio.on('exit', (code) => {
    if (code !== 0) {
        console.error(`Tests failed with exit code ${code}`);
    }
    process.exit(code);
}); 