const { $ } = require('@wdio/globals');

class TermsPage {
    // Elementos principales usando selectores más robustos
    get termsContainer() {
        return $('android=new UiSelector().className("android.view.ViewGroup")');
    }

    get mainTitle() {
        return $('android=new UiSelector().className("android.widget.TextView").textContains("Cookies")');
    }

    get acceptButton() {
        return $('android=new UiSelector().className("android.widget.Button").text("Acepto")');
    }

    get rejectButton() {
        return $('android=new UiSelector().className("android.widget.Button").text("Rechazar todo")');
    }

    // Métodos de validación de UI
    async validateUIElements() {
        const results = {
            container: false,
            title: false,
            buttons: {
                accept: false,
                reject: false
            }
        };

        try {
            // Validar contenedor principal
            results.container = await this.termsContainer.isDisplayed();
            
            // Validar textos
            results.title = await this.mainTitle.isDisplayed();
            
            // Validar botones
            results.buttons.accept = await this.acceptButton.isDisplayed();
            results.buttons.reject = await this.rejectButton.isDisplayed();
            
            return results;
        } catch (error) {
            console.error('Error validando elementos UI:', error);
            return results;
        }
    }

    async getTextsContent() {
        try {
            const texts = await $$('android=new UiSelector().className("android.widget.TextView")');
            const textContents = [];
            
            for (const element of texts) {
                try {
                    const text = await element.getText();
                    if (text) {
                        textContents.push(text);
                    }
                } catch (error) {
                    console.warn('Error obteniendo texto de elemento:', error);
                }
            }
            
            return textContents;
        } catch (error) {
            console.error('Error obteniendo textos:', error);
            return [];
        }
    }

    async getButtonsText() {
        try {
            const buttons = await $$('android=new UiSelector().className("android.widget.Button")');
            const buttonTexts = [];
            
            for (const button of buttons) {
                try {
                    const text = await button.getText();
                    if (text) {
                        buttonTexts.push(text);
                    }
                } catch (error) {
                    console.warn('Error obteniendo texto de botón:', error);
                }
            }
            
            return buttonTexts;
        } catch (error) {
            console.error('Error obteniendo textos de botones:', error);
            return [];
        }
    }

    async waitForPageLoad() {
        try {
            // Esperar a que al menos uno de los botones esté presente y visible
            await this.acceptButton.waitForExist({ timeout: 20000 });
            await this.acceptButton.waitForDisplayed({ timeout: 20000 });
            
            // Dar un pequeño tiempo para que la UI se estabilice
            await browser.pause(1000);
            
            return true;
        } catch (error) {
            console.error('Error esperando carga de página:', error);
            return false;
        }
    }

    async isElementDisplayed(element) {
        try {
            return await element.isDisplayed();
        } catch (error) {
            console.warn('Error verificando visibilidad del elemento:', error);
            return false;
        }
    }

    async isElementEnabled(element) {
        try {
            return await element.isEnabled();
        } catch (error) {
            console.warn('Error verificando estado del elemento:', error);
            return false;
        }
    }

    async isFirstTimeUser() {
        try {
            // Esperar a que la página se cargue completamente
            const pageLoaded = await this.waitForPageLoad();
            if (!pageLoaded) {
                console.warn('La página no se cargó correctamente');
                return false;
            }
            
            // Intentar múltiples veces encontrar los elementos críticos
            let retries = 3;
            while (retries > 0) {
                const hasTitle = await this.mainTitle.isDisplayed().catch(() => false);
                const hasAcceptButton = await this.acceptButton.isDisplayed().catch(() => false);
                
                if (hasTitle || hasAcceptButton) {
                    return true;
                }
                
                await browser.pause(1000);
                retries--;
            }
            
            console.log('No se encontraron elementos de primera vez después de reintentos');
            return false;
        } catch (error) {
            console.error('Error verificando si es primera vez:', error.message);
            return false;
        }
    }

    async acceptTerms() {
        try {
            const isFirstTime = await this.isFirstTimeUser();
            
            if (isFirstTime) {
                console.log('Primera vez usando la app - Aceptando términos y condiciones');
                
                // Intentar aceptar los términos con reintentos
                let retries = 3;
                while (retries > 0) {
                    try {
                        await this.acceptButton.waitForDisplayed({ timeout: 10000 });
                        await this.acceptButton.waitForClickable({ timeout: 5000 });
                        await this.acceptButton.click();
                        
                        // Verificar que los elementos desaparecieron
                        const elementsGone = await browser.waitUntil(async () => {
                            const isAcceptGone = !(await this.acceptButton.isDisplayed().catch(() => false));
                            const isTitleGone = !(await this.mainTitle.isDisplayed().catch(() => false));
                            return isAcceptGone && isTitleGone;
                        }, {
                            timeout: 10000,
                            timeoutMsg: 'Los elementos de términos y condiciones no desaparecieron después de aceptar',
                            interval: 1000
                        });
                        
                        if (elementsGone) {
                            console.log('Términos aceptados exitosamente');
                            return true;
                        }
                    } catch (error) {
                        console.warn(`Intento ${4-retries} fallido:`, error.message);
                        await browser.pause(1000);
                    }
                    retries--;
                }
                
                throw new Error('No se pudieron aceptar los términos después de múltiples intentos');
            } else {
                console.log('No es primera vez - Continuando con el flujo normal');
                return true;
            }
        } catch (error) {
            console.error('Error crítico al aceptar términos:', error.message);
            throw error;
        }
    }

    async getAllButtonsText() {
        const buttons = [];
        
        // Intentamos obtener cada botón individualmente
        if (await this.acceptButton.isDisplayed().catch(() => false)) {
            buttons.push(await this.acceptButton.getText());
        }
        if (await this.rejectButton.isDisplayed().catch(() => false)) {
            buttons.push(await this.rejectButton.getText());
        }
        
        return buttons.filter(text => text && text.length > 0);
    }

    async isButtonEnabled(button) {
        try {
            await button.waitForDisplayed({ timeout: 5000 });
            const isDisplayed = await button.isDisplayed();
            const isEnabled = await button.isEnabled();
            return isDisplayed && isEnabled;
        } catch (error) {
            console.log('Error verificando si el botón está habilitado:', error.message);
            return false;
        }
    }

    async getTextContent() {
        const texts = [];
        
        // Intentamos obtener los textos específicos
        if (await this.mainTitle.isDisplayed().catch(() => false)) {
            texts.push(await this.mainTitle.getText());
        }
        
        return texts.filter(text => text && text.length > 0);
    }

    async areButtonsAligned() {
        try {
            const buttons = [this.acceptButton, this.rejectButton];
            let visibleButtons = 0;
            
            for (const button of buttons) {
                if (await button.isDisplayed().catch(() => false)) {
                    visibleButtons++;
                }
            }
            
            return visibleButtons > 0;
        } catch (error) {
            console.log('Error verificando alineación de botones:', error.message);
            return false;
        }
    }
}

module.exports = new TermsPage(); 