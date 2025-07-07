# Mobile Test Automation Framework

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![WebdriverIO](https://img.shields.io/badge/WebdriverIO-EA5906?style=for-the-badge&logo=webdriverio&logoColor=white)
![Appium](https://img.shields.io/badge/Appium-663399?style=for-the-badge&logo=appium&logoColor=white)
![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=mocha&logoColor=white)
![SauceLabs](https://img.shields.io/badge/SauceLabs-E2231A?style=for-the-badge&logo=saucelabs&logoColor=white)
![BrowserStack](https://img.shields.io/badge/BrowserStack-FF9A00?style=for-the-badge&logo=browserstack&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![iOS](https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)

A robust, cross-platform mobile test automation framework built with WebdriverIO and Appium. This framework supports both Android and iOS platforms and can execute tests on real devices, emulators/simulators, and cloud testing platforms.

## 🚀 Features

- Cross-platform support (Android & iOS)
- Page Object Model design pattern
- Multiple execution environments:
  - Real devices (USB connected)
  - Android Emulator
  - iOS Simulator
  - SauceLabs integration
  - BrowserStack integration
- Allure reporting
- Screenshot capture on test failure
- Parallel test execution support
- Command-line interface for test execution
- Environment-based configuration

## 🛠 Tech Stack

- Node.js (v18.20.0 or higher)
- WebdriverIO v9
- Appium v2
- Mocha test framework
- Allure reporting

## 📁 Project Structure

```bash
cross-mobile-test-automation/
├── apps/
├── cli/
│   └── runTests.js
├── config/
│   ├── wdio/
│   │   └── wdio.conf.js
│   ├── wdio.android.conf.js
│   ├── wdio.browserstack.conf.js
│   ├── wdio.real-device.conf.js
│   └── wdio.saucelabs.conf.js
├── logs/
├── reports/
├── tests/
│   ├── android/
│   │   ├── pages/
│   │   └── specs/
│   ├── ios/
│   │   ├── pages/
│   │   └── specs/
│   └── common/
├── utils/
└── package.json               # Mobile applications
```

## 🔧 Prerequisites

1. **Development Environment:**
   - Node.js (v18.20.0 or higher)
   - npm (latest version)

2. **Android Testing:**
   - Java JDK
   - Android Studio
   - Android SDK
   - Android device or emulator

3. **iOS Testing:**
   - macOS
   - Xcode
   - iOS device or simulator

4. **Cloud Testing (Optional):**
   - SauceLabs account
   - BrowserStack account

## 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Soykervinn/cross-mobile-test-automation.git
   cd cross-mobile-test-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env
   ```
   Edit `.env` file with your configuration.

4. Add your mobile applications:
   - Android: Place your `.apk` file in `apps/app-debug.apk`
   - iOS: Place your `.app` file in `apps/app.app`

## 🎯 Running Tests

### Using npm scripts:

```bash
# Run Android tests on USB device
npm run test:android:usb

# Run Android tests on emulator
npm run test:android:emulator

# Run iOS tests on simulator
npm run test:ios:simulator

# Run iOS tests on USB device
npm run test:ios:usb

# Run tests on SauceLabs
npm run test:saucelabs

# Run tests on BrowserStack
npm run test:browserstack

# Generate and open Allure report
npm run report
```

### Using CLI directly:

```bash
# Basic usage
node cli/runTests.js --platform <android|ios> --target <usb|emulator|simulator|saucelabs|browserstack>

# Run specific test file
node cli/runTests.js --platform android --target emulator --test ./tests/android/specs/login/login.test.js

# Run with parallel execution
node cli/runTests.js --platform android --target saucelabs --parallel 3

# Run in debug mode
node cli/runTests.js --platform ios --target simulator --debug
```

### CLI Options:

- `--platform, -p`: Target platform (android|ios)
- `--target, -t`: Execution environment (usb|emulator|simulator|saucelabs|browserstack)
- `--test, -f`: Specific test file or directory
- `--tags, -g`: Run tests with specific tags
- `--parallel`: Number of parallel instances
- `--debug`: Enable debug mode

## 📊 Reports

Test reports are generated using Allure. After test execution:

```bash
npm run report
```

This will generate and open the Allure report in your default browser.

## 🔍 Debugging

1. **Local Debugging:**
   - Use `--debug` flag for detailed logs
   - Check screenshots in `reports/screenshots` for failed tests
   - Review Appium logs in `logs` directory

2. **Appium Inspector:**
   - Use Appium Inspector for element inspection
   - Connect to local Appium server (default: localhost:4723)

## 🌐 Cloud Testing Setup

### SauceLabs:
1. Add credentials to `.env`:
   ```
   SAUCE_USERNAME=your_username
   SAUCE_ACCESS_KEY=your_access_key
   ```

### BrowserStack:
1. Add credentials to `.env`:
   ```
   BROWSERSTACK_USERNAME=your_username
   BROWSERSTACK_ACCESS_KEY=your_access_key
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please open an issue in the repository.
