const {test, expect} = require('@playwright/test');
const {HomePage} = require('../page_objects/HomePage');
const {ProductDetailsPage} = require('../page_objects/ProductDetailsPage');
const {CartPage} = require('../page_objects/CartPage');
const {PlaceOrderDialog} = require('../page_objects/PlaceOrderDialog');
const {SuccessfulPurchaseDialog} = require('../page_objects/SuccessfulPurchaseDialog');

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

    // Check successful purchase message
    const successPurchaseDialog = new SuccessfulPurchaseDialog(page);
    expect(await successPurchaseDialog.getSuccessMessage()).toBe("Thank you for your purchase!");
});

test('User should not be able to place an order without adding an product', async ({page}) => {
     
    // Navigate to cart
     const homePage = new HomePage(page);  
     await homePage.clickCartButton();
     const cartPage = new CartPage(page);
     expect(await cartPage.productsAdded.count()).toBe(0);

     // Check purchase button
     expect(await cartPage.placeOrderButton.isDisabled()).toBe(true);
});