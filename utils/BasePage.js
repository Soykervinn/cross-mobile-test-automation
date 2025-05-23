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
     * Click on element
     * @param {Object} selector Element selector
     */
    async click(selector) {
        await this.waitForElement(selector);
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
}

module.exports = BasePage; 