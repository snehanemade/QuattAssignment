class HomePage
{
    constructor(page) {
        this.page = page;
        this.loginButton = page.locator('#login2');
        this.cartButton = page.locator('.nav-item a:has-text("Cart")');
    }

    get nextButton() {
        
        return this.page.locator('#next2');
    }

    async clickLoginButton() {
        await this.loginButton.click();
        await this.page.waitForLoadState('load');
    }

    async clickCartButton() {
        await this.cartButton.click();
        await this.page.waitForLoadState('load');
    }

    async goToNextPage() {
        await this.nextButton.click();
        await this.page.waitForLoadState('load'); 

        // ToDo: Make this wait dynamic
        await this.page.waitForTimeout(500);
    }

    async selectProduct(productName) {
        let productFound = false;
        do {
            const product = this.page.locator('.card-title a', { hasText: `${productName}`});

            if(await product.isVisible()) {
                productFound = true;
                await product.click();
                break;
            }
            
            // Check if next button is displayed on the webpage
            var isNextBtnDisplayed = await this.page.evaluate(() => {
                const element = document.querySelector('#next2');
                return window.getComputedStyle(element).display;
            });
            
            const isNextBtnVisible = await this.nextButton.isVisible();
        
            if(!(isNextBtnVisible && isNextBtnDisplayed !== 'none')) {
                break;
            }

            await this.goToNextPage();

        } while(!productFound);
        await this.page.waitForLoadState('load');
    }
}
module.exports = { HomePage };