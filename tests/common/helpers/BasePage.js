class BasePage {
    constructor() {
        this.platform = process.env.PLATFORM || 'android';
    }

    /**
     * Wait for element to be visible
     * @param {Object} selector Element selector
     * @param {Number} timeout Timeout in milliseconds
     */
    async waitForElement(selector, timeout = 10000) {
        await $(selector).waitForDisplayed({ timeout });
    }

    /**
     * Wait for element to be clickable
     * @param {Object} selector Element selector
     * @param {Number} timeout Timeout in milliseconds
     */
    async waitForClickable(selector, timeout = 10000) {
        await $(selector).waitForClickable({ timeout });
    }

    /**
     * Click on element
     * @param {Object} selector Element selector
     */
    async click(selector) {
        await this.waitForClickable(selector);
        await $(selector).click();
    }

    /**
     * Input text into element
     * @param {Object} selector Element selector
     * @param {String} text Text to input
     */
    async setValue(selector, text) {
        await this.waitForElement(selector);
        await $(selector).setValue(text);
    }

    /**
     * Get text from element
     * @param {Object} selector Element selector
     * @returns {String} Element text
     */
    async getText(selector) {
        await this.waitForElement(selector);
        return await $(selector).getText();
    }

    /**
     * Check if element is displayed
     * @param {Object} selector Element selector
     * @returns {Boolean} True if element is displayed
     */
    async isDisplayed(selector) {
        try {
            return await $(selector).isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Scroll to element
     * @param {Object} selector Element selector
     */
    async scrollToElement(selector) {
        const element = await $(selector);
        await element.scrollIntoView();
    }

    /**
     * Get platform specific selector
     * @param {Object} selectors Object with android and ios selectors
     * @returns {String} Platform specific selector
     */
    getPlatformSelector(selectors) {
        return this.platform === 'ios' ? selectors.ios : selectors.android;
    }

    /**
     * Take screenshot
     * @param {String} name Screenshot name
     */
    async takeScreenshot(name) {
        await browser.saveScreenshot(`./screenshots/${name}_${new Date().getTime()}.png`);
    }
}

module.exports = BasePage; 