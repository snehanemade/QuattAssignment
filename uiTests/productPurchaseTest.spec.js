const {test, expect} = require('@playwright/test');
const {HomePage} = require('../page_objects/HomePage');
const {ProductDetailsPage} = require('../page_objects/ProductDetailsPage');
const {CartPage} = require('../page_objects/CartPage');
const {PlaceOrderDialog} = require('../page_objects/PlaceOrderDialog');

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html'); // Navigate to the website before each test
    await page.waitForLoadState('load');
  });

test('User can purchase a product', async ({page}) => {

    // test data
    // const productName = "Nexus 6";
    // const price = "650";
    const productName = "MacBook Pro";
    const price = "1100";

    // Select a product
    const homePage = new HomePage(page);    
    await homePage.selectProduct(productName);
    const productPage = new ProductDetailsPage(page);
    expect(await productPage.getTitle()).toBe(productName);
    await productPage.addToCart();

    page.on('dialog', async (dialog) => {
        const message = dialog.message();
        expect(message).toBe('Product added');
        await dialog.accept(); 
    });

    // Navigate to cart
    await homePage.clickCartButton();
    const cartPage = new CartPage(page);
    expect(await cartPage.getNoOfProductsInCart()).toBe(1);
    const productTitles = await cartPage.getProductTitles();
    expect(productTitles).toContain(productName);

    // Place an order
    expect(await cartPage.totalAmount.innerText()).toBe(price);
    await cartPage.placeOrder();

    // Submit address and payment details
    const placeOrderDialog = new PlaceOrderDialog(page);
    expect(await placeOrderDialog.title.innerText()).toBe("Place order");
    await placeOrderDialog.enterAddressDetails("Robert", "The Netherlands", "Amsterdam");
    await placeOrderDialog.enterCreditCardDetails("Test124567823", "Jan", "2045");
    await placeOrderDialog.purchaseBtn.click();
});