const BasePage = require('../../../common/helpers/BasePage');

class LoginPage extends BasePage {
    constructor() {
        super();
        this.selectors = {
            usernameInput: {
                android: '~username',
                ios: '~username'
            },
            passwordInput: {
                android: '~password',
                ios: '~password'
            },
            loginButton: {
                android: '~login',
                ios: '~login'
            },
            errorMessage: {
                android: '~error-message',
                ios: '~error-message'
            },
            forgotPasswordLink: {
                android: '~forgot-password',
                ios: '~forgot-password'
            }
        };
    }

    /**
     * Login with username and password
     * @param {String} username Username
     * @param {String} password Password
     */
    async login(username, password) {
        await this.setValue(this.getPlatformSelector(this.selectors.usernameInput), username);
        await this.setValue(this.getPlatformSelector(this.selectors.passwordInput), password);
        await this.click(this.getPlatformSelector(this.selectors.loginButton));
    }

    /**
     * Get error message text
     * @returns {String} Error message
     */
    async getErrorMessage() {
        return await this.getText(this.getPlatformSelector(this.selectors.errorMessage));
    }

    /**
     * Click forgot password link
     */
    async clickForgotPassword() {
        await this.click(this.getPlatformSelector(this.selectors.forgotPasswordLink));
    }

    /**
     * Check if error message is displayed
     * @returns {Boolean} True if error message is displayed
     */
    async isErrorDisplayed() {
        return await this.isDisplayed(this.getPlatformSelector(this.selectors.errorMessage));
    }

    /**
     * Wait for login page to be loaded
     */
    async waitForPageLoad() {
        await this.waitForElement(this.getPlatformSelector(this.selectors.usernameInput));
        await this.waitForElement(this.getPlatformSelector(this.selectors.passwordInput));
        await this.waitForElement(this.getPlatformSelector(this.selectors.loginButton));
    }
}

module.exports = LoginPage; 