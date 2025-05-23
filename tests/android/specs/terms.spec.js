const { expect } = require('@wdio/globals');
const TermsPage = require('../pages/onboarding/terms.page');

describe('Terms and Conditions Page', () => {
    it('should validate presence of accept and reject buttons', async () => {
        console.log('\n🔍 ========= INICIANDO TEST =========');
        console.log('🔍 Validando presencia de botones...\n');
        
        // Esperar a que la página se cargue
        await TermsPage.waitForPageLoad();
        
        // Validar que el botón Acepto está presente y visible
        const acceptButtonDisplayed = await TermsPage.acceptButton.isDisplayed();
        expect(acceptButtonDisplayed).toBe(true, 'El botón Acepto debería estar visible');
        
        // Validar que el botón Rechazar todo está presente y visible
        const rejectButtonDisplayed = await TermsPage.rejectButton.isDisplayed();
        expect(rejectButtonDisplayed).toBe(true, 'El botón Rechazar todo debería estar visible');

        console.log('\n✨ Este fue nuestro hola mundo');
        console.log('👋 Cerraré la app');
        console.log('========= FIN DEL TEST =========\n');
        await driver.terminateApp('com.play.universal');
    });
});