//@ts-check
const{test,expect}= require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const users= require('../data/users');
const{ Inventory }= require('../pages/Inventory');
const constants = require('../data/constants');
const {CartPage}= require('../pages/CartPage');
let loginPage;
/** @type {Inventory} */
let inventory;
/** @type {CartPage} */
let cart;

test.beforeEach(async ({page})=>{
    loginPage=new LoginPage(page);
    await loginPage.open();
    inventory=new Inventory(page);
     await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
        cart= new CartPage(page);
    

})
//hello
test('added products appear correctly', async ({page})=>{
await inventory.addProductToCart(constants.texts.sauceLabsBackPackText1);
await inventory.addProductToCart(constants.texts.sauceLabsBikeLightText);
await cart.clickOnCart();
await expect(page).toHaveURL(new RegExp(`${constants.urls.cart}`));
const itemNames= await cart.getCartItemNames();
expect(itemNames).toEqual([constants.texts.sauceLabsBackPackText1,constants.texts.sauceLabsBikeLightText]);

})
test('Validate product remove',async ({page})=>{
    await inventory.addProductToCart(constants.texts.sauceLabsBackPackText1);
await inventory.addProductToCart(constants.texts.sauceLabsBikeLightText);
await cart.clickOnCart();
await cart.clickOnRemove(constants.texts.sauceLabsBackPackText1);
const NumberofItems= await cart.cartCount();
expect(NumberofItems).toBe(1);
const remainingItems= await cart.getCartItemNames();
expect(remainingItems).toEqual([constants.texts.sauceLabsBikeLightText]);
})
test('validate checkout ',async ({page})=>{
    await inventory.addProductToCart(constants.texts.sauceLabsBackPackText1);
await inventory.addProductToCart(constants.texts.sauceLabsBikeLightText);
await cart.clickOnCart();
await cart.clickOnCheckout();
await expect(page).toHaveURL(new RegExp(`${constants.urls.checkout}`));
await cart.fillInfo(users.CheckoutInfo.Fname,users.CheckoutInfo.Lname,users.CheckoutInfo.zip);

})
test('Validate Continue Buttton',async({page})=>{
    await inventory.addProductToCart(constants.texts.sauceLabsBackPackText1);
await inventory.addProductToCart(constants.texts.sauceLabsBikeLightText);
await cart.clickOnCart();
await cart.clickOnCheckout();
await cart.fillInfo(users.CheckoutInfo.Fname,users.CheckoutInfo.Lname,users.CheckoutInfo.zip);
await cart.clickContinueBtn();
const subtotal=await cart.getSubTotal();
const tax=await cart.getTax();
const total=await cart.getTotal();
expect(total).toBeCloseTo(subtotal+tax,2);
await cart.clickOnFinish();
await expect(page).toHaveURL(new RegExp(`${constants.urls.ThankYouPage}`));
const finalText= await cart.getThankyouPageText();
expect(finalText).toBe('Thank you for your order!');

})