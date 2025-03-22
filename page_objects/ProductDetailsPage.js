class ProductDetailsPage {
  
    constructor(page) {
        this.page = page;
        this.title = page.locator('.name');
        this.addToCartButton = page.locator('.btn-success');
    }

    async getTitle() {
        return await this.title.innerText();
    }

    async addToCart() {
        await this.addToCartButton.click();
    }
}
module.exports = { ProductDetailsPage };