const { get } = require("http");

class CartPage {

    constructor(page) {
        this.page = page;
    }

    get cartTable() {
        return this.page.locator('.table');
    }

    get productsAdded() {
        return this.cartTable.locator('.success');
    }

    get productTitles() {
        return this.cartTable.locator('.success td:nth-child(2)');
    }

    get totalAmount() {
        return this.page.locator('#totalp');
    }   

    get placeOrderButton() {
        return this.page.locator('button:has-text("Place Order")');
    }

    async getNoOfProductsInCart() {
        await this.productsAdded.first().waitFor();
        return await this.productsAdded.count();
    }

    async getProductTitles() {
        const productTitles = await this.productTitles.allTextContents();
        return productTitles;
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }
}
module.exports = { CartPage };