describe('App Exploration', () => {
    it('should explore what is currently displayed in the app', async () => {
        // Wait for app to load
        await browser.pause(5000);
        
        // Screenshot inicial para depuración
        await browser.saveScreenshot('./reports/screenshots/exploration_initial_screen.png');
        
        // Get page source to see what elements are available
        const pageSource = await browser.getPageSource();
        console.log('Page source length:', pageSource.length);
        
        // Find all elements
        const allElements = await browser.$$('*');
        console.log('Total elements found:', allElements.length);
        
        // Find text elements
        const textElements = await browser.$$('android.widget.TextView');
        console.log('Text elements found:', textElements.length);
        
        // Get details of first few text elements
        for (let i = 0; i < Math.min(textElements.length, 10); i++) {
            try {
                const text = await textElements[i].getText();
                const resourceId = await textElements[i].getAttribute('resource-id');
                const contentDesc = await textElements[i].getAttribute('content-desc');
                console.log(`Element ${i}: text="${text}", resource-id="${resourceId}", content-desc="${contentDesc}"`);
            } catch (error) {
                console.log(`Error getting element ${i} details:`, error.message);
            }
        }
        
        // Find button elements
        const buttonElements = await browser.$$('android.widget.Button');
        console.log('Button elements found:', buttonElements.length);
        
        // Get details of button elements
        for (let i = 0; i < Math.min(buttonElements.length, 10); i++) {
            try {
                const text = await buttonElements[i].getText();
                const resourceId = await buttonElements[i].getAttribute('resource-id');
                const contentDesc = await buttonElements[i].getAttribute('content-desc');
                console.log(`Button ${i}: text="${text}", resource-id="${resourceId}", content-desc="${contentDesc}"`);
            } catch (error) {
                console.log(`Error getting button ${i} details:`, error.message);
            }
        }
        
        // Find input elements
        const inputElements = await browser.$$('android.widget.EditText');
        console.log('Input elements found:', inputElements.length);
        
        // Check if we can find any elements from the app package
        const appElements = await browser.$$('android.widget.FrameLayout[package="com.play.universal"]');
        console.log('App package elements found:', appElements.length);
        
        // This test should pass as it's just exploring
        expect(true).toBe(true);
    });
}); 