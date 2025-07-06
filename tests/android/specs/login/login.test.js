const LoginPage = require('../../pages/login/LoginPage');

describe('App Navigation Feature', () => {
    let loginPage;

    beforeEach(async () => {
        loginPage = new LoginPage();
        // Wait for app to load and handle permissions
        await browser.pause(5000);
        await loginPage.handlePermissions();
    });

    it('should explore what is currently displayed in the app', async () => {
        // Screenshot inicial para depuración
        await browser.saveScreenshot('./reports/screenshots/initial_screen.png');
        
        // Get page source to see what elements are available
        const pageSource = await browser.getPageSource();
        console.log('Page source length:', pageSource.length);
        
        // Find all elements
        const allElements = await browser.$$('*');
        console.log('Total elements found:', allElements.length);
        
        // Find text elements
        const textElements = await browser.$$('android.widget.TextView');
        console.log('Text elements found:', textElements.length);
        
        // Log first few text elements
        for (let i = 0; i < Math.min(3, textElements.length); i++) {
            try {
                const text = await textElements[i].getText();
                const resourceId = await textElements[i].getAttribute('resource-id');
                const contentDesc = await textElements[i].getAttribute('content-desc');
                console.log(`Element ${i}: text="${text}", resource-id="${resourceId}", content-desc="${contentDesc}"`);
            } catch (error) {
                console.log(`Error getting element ${i} attributes:`, error.message);
            }
        }
        
        // Find input elements
        const inputElements = await browser.$$('android.widget.EditText');
        console.log('Input elements found:', inputElements.length);
        
        // Find button elements
        const buttonElements = await browser.$$('android.widget.Button');
        console.log('Button elements found:', buttonElements.length);
        
        // Log button elements
        for (let i = 0; i < buttonElements.length; i++) {
            try {
                const text = await buttonElements[i].getText();
                const resourceId = await buttonElements[i].getAttribute('resource-id');
                const contentDesc = await buttonElements[i].getAttribute('content-desc');
                console.log(`Button ${i}: text="${text}", resource-id="${resourceId}", content-desc="${contentDesc}"`);
            } catch (error) {
                console.log(`Error getting button ${i} attributes:`, error.message);
            }
        }
        
        // Verify that we can see the main app content
        expect(allElements.length).toBeGreaterThan(0);
        expect(textElements.length).toBeGreaterThan(0);
    });

    it('should explore the app after accepting cookies', async () => {
        // Accept cookies first
        const cookiesAccepted = await loginPage.acceptCookies();
        console.log('Cookies accepted for exploration:', cookiesAccepted);
        
        // Wait for transition
        await browser.pause(5000);
        
        // Take screenshot after accepting cookies
        await browser.saveScreenshot('./reports/screenshots/after_cookies_accepted.png');
        
        // Get page source to see what elements are available
        const pageSource = await browser.getPageSource();
        console.log('Page source length after accepting cookies:', pageSource.length);
        
        // Find all elements
        const allElements = await browser.$$('*');
        console.log('Total elements found after cookies:', allElements.length);
        
        // Find text elements
        const textElements = await browser.$$('android.widget.TextView');
        console.log('Text elements found after cookies:', textElements.length);
        
        // Log first few text elements
        for (let i = 0; i < Math.min(3, textElements.length); i++) {
            try {
                const text = await textElements[i].getText();
                const resourceId = await textElements[i].getAttribute('resource-id');
                const contentDesc = await textElements[i].getAttribute('content-desc');
                console.log(`Element ${i}: text="${text}", resource-id="${resourceId}", content-desc="${contentDesc}"`);
            } catch (error) {
                console.log(`Error getting element ${i} attributes:`, error.message);
            }
        }
        
        // Find input elements
        const inputElements = await browser.$$('android.widget.EditText');
        console.log('Input elements found after cookies:', inputElements.length);
        
        // Find button elements
        const buttonElements = await browser.$$('android.widget.Button');
        console.log('Button elements found after cookies:', buttonElements.length);
        
        // Log button elements
        for (let i = 0; i < buttonElements.length; i++) {
            try {
                const text = await buttonElements[i].getText();
                const resourceId = await buttonElements[i].getAttribute('resource-id');
                const contentDesc = await buttonElements[i].getAttribute('content-desc');
                console.log(`Button ${i}: text="${text}", resource-id="${resourceId}", content-desc="${contentDesc}"`);
            } catch (error) {
                console.log(`Error getting button ${i} attributes:`, error.message);
            }
        }
        
        // Verify that we can see the main app content
        expect(allElements.length).toBeGreaterThan(0);
        expect(textElements.length).toBeGreaterThan(0);
    });
}); 