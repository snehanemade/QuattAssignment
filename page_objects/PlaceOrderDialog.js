class PlaceOrderDialog 
{
    constructor(page) {
        this.page = page;
        this.title = page.locator('#orderModalLabel');
        this.totalAmount = page.locator("#totalm");
        this.name = page.locator('#name');
        this.country = page.locator('#country');
        this.city = page.locator('#city');
        this.creditcard = page.locator('#card');
        this.month = page.locator('#month');
        this.year = page.locator('#year');
        this.purchaseBtn = page.locator('button:has-text("Purchase")');
    }

    async enterAddressDetails(name, country, city) {
        await this.name.fill(`${name}`);
        await this.country.fill(`${country}`);
        await this.city.fill(`${city}`);
    }

    async enterCreditCardDetails(cardNumber, expiryMonth, expiryYear) {
        await this.creditcard.fill(`${cardNumber}`);
        await this.month.fill(`${expiryMonth}`);
        await this.year.fill(`${expiryYear}`);
    }

    async clickPurchaseBtn() {
        await this.purchaseBtn.click();
    }
}
module.exports = { PlaceOrderDialog };