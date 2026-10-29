//@ts-check
const{test,expect}= require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const users= require('../data/users');
const{ Inventory }= require('../pages/Inventory');
const constants = require('../data/constants');
let loginPage;
/** @type {Inventory} */
let inventory;

test.beforeEach( async ({page})=>{
loginPage= new LoginPage(page);
await loginPage.open();
 await loginPage.login(
        users.standardUser.username,
        users.standardUser.password
    );
inventory= new Inventory(page);

})
test('cart badge update when adding products',async ({page})=>{
await inventory.addProductToCart(constants.texts.sauceLabsBackPackText1);
await inventory.addProductToCart(constants.texts.sauceLabsBikeLightText);
const cartCount= await inventory.getCartCount();
expect(cartCount).toBe(2);



})
test('Sort products by low to high',async({page})=>{
    await inventory.ClickOnSort(constants.sortOptions.PriceLowToHigh);
    const prices= await inventory.getAllProdPrices();
    const sortedPrices=[...prices].sort((a,b)=> a-b);
    expect(prices).toEqual(sortedPrices);
})
test('Sort products by high to low', async({page})=>{
    await inventory.ClickOnSort(constants.sortOptions.PriceHighToLow);
    const prices= await inventory.getAllProdPrices();
    const sortedPrices=[...prices].sort((a,b)=>b-a);
    expect (prices).toEqual(sortedPrices);
}

);