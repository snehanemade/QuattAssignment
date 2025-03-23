class SuccessfulPurchaseDialog {

    constructor(page) {
        this.page = page;
        this.successMessage = this.page.locator('.sweet-alert h2');
        this.okBtn = this.page.locator('.confirm');
    }

    async getSuccessMessage() {
        return this.successMessage.innerText();
    }
}
module.exports = { SuccessfulPurchaseDialog };