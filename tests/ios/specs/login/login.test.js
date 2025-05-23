const LoginPage = require('../../pages/login/LoginPage');

describe('Login Feature - iOS', () => {
    let loginPage;

    beforeEach(async () => {
        loginPage = new LoginPage();
        await loginPage.waitForPageLoad();
    });

    it('should login successfully with valid credentials', async () => {
        await loginPage.login('validuser@test.com', 'validpass123');
        // Add assertions for successful login
        // Example: await expect(homePage.isUserLoggedIn()).toBe(true);
    });

    it('should show error message with invalid credentials', async () => {
        await loginPage.login('invalid@test.com', 'wrongpass');
        const isErrorVisible = await loginPage.isErrorDisplayed();
        const errorMessage = await loginPage.getErrorMessage();
        
        expect(isErrorVisible).toBe(true);
        expect(errorMessage).toContain('Invalid credentials');
    });

    it('should navigate to forgot password page', async () => {
        await loginPage.clickForgotPassword();
        // Add assertions for forgot password page
        // Example: await expect(forgotPasswordPage.isDisplayed()).toBe(true);
    });

    it('should not allow login with empty fields', async () => {
        await loginPage.login('', '');
        const isErrorVisible = await loginPage.isErrorDisplayed();
        const errorMessage = await loginPage.getErrorMessage();
        
        expect(isErrorVisible).toBe(true);
        expect(errorMessage).toContain('Please fill in all fields');
    });

    afterEach(async () => {
        // Take screenshot if test fails
        if (this.currentTest.state === 'failed') {
            await loginPage.takeScreenshot(`login-test-failed-${Date.now()}`);
        }
    });
}); 