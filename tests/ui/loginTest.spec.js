const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../page_objects/LoginPage');
const {HomePage} = require('../page_objects/HomePage');

test('Check if login is successful', async ({page}) => {
    await page.goto('https://www.demoblaze.com/index.html');
    await page.waitForLoadState('load');
    const homePage = new HomePage(page);
    await homePage.clickLoginButton();
    const loginPage = new LoginPage(page);
    await loginPage.login('snehanemo', 'Nemo@2025');
    await page.waitForLoadState('load');
    const nameOfUser = await(await page.waitForSelector('#nameofuser')).innerText();
    expect(nameOfUser).toBe('Welcome snehanemo');
});