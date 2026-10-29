require('dotenv').config();

const { test,expect}= require('@playwright/test');
const{LoginPage}= require('../pages/LoginPage');
console.log(require('../pages/LoginPage'));
const users= require('../data/users');
const constants = require('../data/constants');
let loginPage;
test.beforeEach(async({page}) =>{
  loginPage = new LoginPage(page);
  await loginPage.open();
})

test('user can login with valid credentials @smoke',async({page}) =>{
  
  await loginPage.login(users.standardUser.username,users.standardUser.password);
  await expect(page).toHaveURL(new RegExp(`${constants.urls.inventory}`));
  await expect(page.locator('.title')).toHaveText(constants.texts.ProductTitle);

});




