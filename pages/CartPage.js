class CartPage {
    constructor(page){
        this.page=page;
        this.CartLink=page.locator('[data-test="shopping-cart-link"]');
        this.itemNames=page.locator('[data-test="inventory-item-name"]');
        this.Remove=page.getByRole('button',{name :'Remove'});
        this.Checkout=page.getByRole('button',{name:'checkout'});
        this.FnameInput=page.locator('[placeholder="First Name"]');
        this.LnameInput=page.locator('[placeholder="Last Name"]');
        this.zipInput=page.locator('[placeholder="Zip/Postal Code"]');
        this.ContinueBtn=page.locator('[data-test="continue"]');
        this.Itemtotal=page.locator('[data-test="subtotal-label"]');
        this.tax=page.locator('[data-test="tax-label"]');
        this.Total=page.locator('[data-test="total-label"]');
        this.Finish=page.locator('[data-test="finish"]');
        this.ThankYouText=page.locator('[data-test="complete-header"]');
    }
    async clickOnCart(){
        await this.CartLink.click();
    }
    async getCartItemNames(){
        return await this.itemNames.allTextContents();
    }
    async clickOnRemove(productName){
        const product=this.page.locator('[data-test="inventory-item"]').filter({hasText: productName});
await product.getByRole('button',{name :'Remove'}).click();
    }
    async cartCount(){
        return this.itemNames.count();
    }
    async clickOnCheckout(){
await this.Checkout.click();
    }
    async fillInfo(Fname,Lname,zip){
        await this.FnameInput.fill(Fname);
        await this.LnameInput.fill(Lname);
        await this.zipInput.fill(zip);

    }
    async clickContinueBtn(){
        await this.ContinueBtn.click();
    }
    async getSubTotal(){
        const text= await this.Itemtotal.textContent();
        return parseFloat(text.replace('Item total: $',''));

    }
    async getTax(){
        const text1=await this.tax.textContent();
        return parseFloat(text1.replace('Tax: $',''));

    }
    async getTotal(){
        const text2= await this.Total.textContent();
        return parseFloat(text2.replace('Total: $',''));
    }
    async clickOnFinish(){
        await this.Finish.click();

    }
    async getThankyouPageText(){
        return this.ThankYouText.textContent();
    }
}
module.exports={CartPage};