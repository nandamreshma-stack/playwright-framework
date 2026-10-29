class Inventory
{
    constructor(page){
    this.inventoryItems= page.locator('[data-test="inventory-list"]');
    this.cartBadge= page.locator('.shopping_cart_badge');
    this.sortDropdown=page.locator('.product_sort_container');
    this.Itemprices=page.locator('.inventory_item_price');


}
getproductCard(productname){
    return this.inventoryItems.locator('.inventory_item').filter({hasText:productname});
}
async addProductToCart(productName){
    const product= this.getproductCard(productName);
    await product.getByRole('button',{name:'Add to cart'}).click();

}
async getCartCount(){
    const hasBadge = await this.cartBadge.count();
    if (hasBadge== 0) return 0;
    return parseInt(await this.cartBadge.textContent(),10);

}
async ClickOnSort(optionValue){
    await this.sortDropdown.selectOption(optionValue);

}
async getAllProdPrices(){
    const priceTexts= await this.Itemprices.allTextContents();
    return priceTexts.map((p)=> parseFloat(p.replace('$','')));
}

}
module.exports={Inventory};