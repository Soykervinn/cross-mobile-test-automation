const BasePage = require('../../../common/helpers/BasePage');

class LoginPage extends BasePage {
    constructor() {
        super();
        this.selectors = {
            // Cookie consent selectors (real app elements)
            acceptCookiesButton: {
                android: 'android=new UiSelector().resourceId("com.play.universal:id/btn_accept_cookies")',
                ios: '~Acepto'
            },
            rejectCookiesButton: {
                android: 'android=new UiSelector().resourceId("com.play.universal:id/btn_reject_cookies")',
                ios: '~Rechazar todo'
            },
            manageOptionsLink: {
                android: '~Administrar opciones',
                ios: '~Administrar opciones'
            },
            cookieNoticeText: {
                android: '~alert_notice_text',
                ios: '~alert_notice_text'
            },
            // Legacy login selectors (for future use)
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
            },
            // Permissions selectors
            allowButton: {
                android: '~Allow',
                ios: '~Allow'
            },
            acceptButton: {
                android: '~Accept',
                ios: '~Accept'
            },
            okButton: {
                android: '~OK',
                ios: '~OK'
            },
            continueButton: {
                android: '~Continue',
                ios: '~Continue'
            }
        };
    }

    /**
     * Handle permission dialogs that might appear when app starts
     */
    async handlePermissions() {
        try {
            // Wait a bit for any permission dialogs to appear
            await browser.pause(2000);
            
            // Try to find and click common permission buttons
            const permissionSelectors = [
                this.getPlatformSelector(this.selectors.allowButton),
                this.getPlatformSelector(this.selectors.acceptButton),
                this.getPlatformSelector(this.selectors.okButton),
                this.getPlatformSelector(this.selectors.continueButton)
            ];

            for (const selector of permissionSelectors) {
                try {
                    if (await this.isDisplayed(selector)) {
                        console.log(`Found permission dialog with selector: ${selector}`);
                        await this.click(selector);
                        await browser.pause(1000);
                    }
                } catch (error) {
                    // Continue to next selector if this one doesn't exist
                    continue;
                }
            }
        } catch (error) {
            console.log('No permission dialogs found or already handled');
        }
    }

    /**
     * Accept cookies consent usando varios selectores
     */
    async acceptCookies() {
        let acceptButton;
        // 1. Probar por resource-id
        try {
            acceptButton = await $('android=new UiSelector().resourceId("com.play.universal:id/btn_accept_cookies")');
            if (await acceptButton.isDisplayed()) {
                console.log('Encontrado botón Acepto por resource-id');
                await acceptButton.click();
                await browser.pause(2000);
                return true;
            }
        } catch (e) { console.log('No encontrado por resource-id'); }
        // 2. Probar por texto
        try {
            acceptButton = await $('android=new UiSelector().text("Acepto")');
            if (await acceptButton.isDisplayed()) {
                console.log('Encontrado botón Acepto por texto');
                await acceptButton.click();
                await browser.pause(2000);
                return true;
            }
        } catch (e) { console.log('No encontrado por texto'); }
        // 3. Probar por clase y texto
        try {
            acceptButton = await $('android=new UiSelector().className("android.widget.Button").text("Acepto")');
            if (await acceptButton.isDisplayed()) {
                console.log('Encontrado botón Acepto por clase+texto');
                await acceptButton.click();
                await browser.pause(2000);
                return true;
            }
        } catch (e) { console.log('No encontrado por clase+texto'); }
        // 4. Probar por XPath
        try {
            acceptButton = await $('//android.widget.Button[@text="Acepto"]');
            if (await acceptButton.isDisplayed()) {
                console.log('Encontrado botón Acepto por XPath');
                await acceptButton.click();
                await browser.pause(2000);
                return true;
            }
        } catch (e) { console.log('No encontrado por XPath'); }
        console.log('No se pudo encontrar el botón Acepto con ningún selector');
        return false;
    }

    /**
     * Reject cookies consent
     */
    async rejectCookies() {
        try {
            const rejectButton = this.getPlatformSelector(this.selectors.rejectCookiesButton);
            // Wait for button to be visible and clickable
            await this.waitForElement(rejectButton, 10000);
            await browser.pause(1000); // Small pause to ensure UI is stable
            
            if (await this.isDisplayed(rejectButton)) {
                console.log('Found cookies consent screen, clicking Reject');
                await this.click(rejectButton);
                await browser.pause(2000); // Wait for transition
                return true;
            }
            return false;
        } catch (error) {
            console.log('Error rejecting cookies:', error.message);
            return false;
        }
    }

    /**
     * Check if cookies consent screen is displayed
     */
    async isCookiesConsentDisplayed() {
        try {
            const acceptButton = this.getPlatformSelector(this.selectors.acceptCookiesButton);
            return await this.isDisplayed(acceptButton);
        } catch (error) {
            console.log('Error checking if cookies consent is displayed:', error.message);
            return false;
        }
    }

    /**
     * Get cookies notice text
     */
    async getCookiesNoticeText() {
        try {
            const noticeElement = this.getPlatformSelector(this.selectors.cookieNoticeText);
            // Wait for element to be present
            await this.waitForElement(noticeElement, 10000);
            const text = await this.getText(noticeElement);
            return text || 'No text found'; // Return default text if null/undefined
        } catch (error) {
            console.log('Error getting cookies notice text:', error.message);
            return 'Error retrieving text'; // Return error message instead of null
        }
    }

    /**
     * Login with username and password (legacy method for future use)
     */
    async login(username, password) {
        await this.setValue(this.getPlatformSelector(this.selectors.usernameInput), username);
        await this.setValue(this.getPlatformSelector(this.selectors.passwordInput), password);
        await this.click(this.getPlatformSelector(this.selectors.loginButton));
    }

    /**
     * Get error message text (legacy method for future use)
     */
    async getErrorMessage() {
        return await this.getText(this.getPlatformSelector(this.selectors.errorMessage));
    }

    /**
     * Click forgot password link (legacy method for future use)
     */
    async clickForgotPassword() {
        await this.click(this.getPlatformSelector(this.selectors.forgotPasswordLink));
    }

    /**
     * Check if error message is displayed (legacy method for future use)
     */
    async isErrorDisplayed() {
        return await this.isDisplayed(this.getPlatformSelector(this.selectors.errorMessage));
    }

    /**
     * Wait for page to be loaded (updated for cookies consent)
     */
    async waitForPageLoad() {
        // First handle any permission dialogs
        await this.handlePermissions();
        
        // Wait for cookies consent screen to appear
        await this.waitForElement(this.getPlatformSelector(this.selectors.acceptCookiesButton), 30000);
        console.log('Cookies consent screen loaded successfully');
    }
}

module.exports = LoginPage; 