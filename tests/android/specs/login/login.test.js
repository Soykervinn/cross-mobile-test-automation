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
        // initial screen
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
        for (let i = 0; i < Math.min(10, textElements.length); i++) {
            try {
                const text = await textElements[i].getText();
                const resourceId = await textElements[i].getAttribute('resource-id');
                const contentDesc = await textElements[i].getAttribute('content-desc');
                console.log(`Element ${i}: text="${text}", resource-id="${resourceId}", content-desc="${contentDesc}"`);
            } catch (e) {
                console.log(`Element ${i}: Error retrieving text`);
            }
        }
        
        // Find input elements
        const inputElements = await browser.$$('android.widget.EditText');
        console.log('Input elements found:', inputElements.length);
        
        // Find button elements
        const buttonElements = await browser.$$('android.widget.Button');
        console.log('Button elements found:', buttonElements.length);
        
        // Find elements from our app package
        const appElements = await browser.$$('android=new UiSelector().packageName("com.play.universal")');
        console.log('App elements found:', appElements.length);
        
        expect(true).toBe(true); // Test always passes for exploration
    });

    it('should display the Accept button on the cookies consent screen', async () => {
        // wait for 2 seconds to see the cookies consent screen
        await browser.pause(2000);
        
        // Search for the Accept button by resource-id and text
        const acceptButtonById = await $('android=new UiSelector().resourceId("com.play.universal:id/btn_accept_cookies")');
        const acceptButtonByText = await $('android=new UiSelector().text("Acepto")');
        
        // validate that at least one is present and visible
        const isDisplayedById = await acceptButtonById.isDisplayed().catch(() => false);
        const isDisplayedByText = await acceptButtonByText.isDisplayed().catch(() => false);
        
        console.log('Accept button by ID displayed:', isDisplayedById);
        console.log('Accept button by text displayed:', isDisplayedByText);
        
        expect(isDisplayedById || isDisplayedByText).toBe(true);
    });

    it('should accept cookies and navigate to main screen', async () => {
        // Accept cookies
        const cookiesAccepted = await loginPage.acceptCookies();
        expect(cookiesAccepted).toBe(true);
        console.log('Cookies accepted for exploration:', cookiesAccepted);
        
        // Wait for navigation
        await browser.pause(5000);
    });

    it('should explore the app after accepting cookies', async () => {
        // Take a screenshot to see what's on screen after accepting cookies
        await browser.saveScreenshot('./reports/screenshots/after_cookies_screen.png');
        
        // Get page source to see what elements are available after accepting cookies
        const pageSource = await browser.getPageSource();
        console.log('Page source length after accepting cookies:', pageSource.length);
        
        // Find all elements
        const allElements = await browser.$$('*');
        console.log('Total elements found after cookies:', allElements.length);
        
        // Find text elements
        const textElements = await browser.$$('android.widget.TextView');
        console.log('Text elements found after cookies:', textElements.length);
        
        // Log first few text elements
        for (let i = 0; i < Math.min(10, textElements.length); i++) {
            try {
                const text = await textElements[i].getText();
                const resourceId = await textElements[i].getAttribute('resource-id');
                const contentDesc = await textElements[i].getAttribute('content-desc');
                console.log(`Element ${i}: text="${text}", resource-id="${resourceId}", content-desc="${contentDesc}"`);
            } catch (e) {
                console.log(`Element ${i}: Error retrieving text`);
            }
        }
        
        // Find input elements
        const inputElements = await browser.$$('android.widget.EditText');
        console.log('Input elements found after cookies:', inputElements.length);
        
        // Find button elements
        const buttonElements = await browser.$$('android.widget.Button');
        console.log('Button elements found after cookies:', buttonElements.length);
        
        // Log button details
        for (let i = 0; i < Math.min(5, buttonElements.length); i++) {
            try {
                const text = await buttonElements[i].getText();
                const resourceId = await buttonElements[i].getAttribute('resource-id');
                const contentDesc = await buttonElements[i].getAttribute('content-desc');
                console.log(`Button ${i}: text="${text}", resource-id="${resourceId}", content-desc="${contentDesc}"`);
            } catch (e) {
                console.log(`Button ${i}: Error retrieving attributes`);
            }
        }
        
        expect(true).toBe(true); // Test always passes for exploration
    });
}); 