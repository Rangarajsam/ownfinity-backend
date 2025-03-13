export const buildProduct = (productDetails) => {
    let addedProduct = {};
    addedProduct.productName = productDetails['name'];
    addedProduct.price = productDetails['price'];
    addedProduct.availableItems = productDetails['stock'];
    return addedProduct;
}

export const saveToCart = (cart, productDetails, reqObj) => {
    let addedProduct = buildProduct(productDetails);
    let itemObj = {...reqObj,productDetails: addedProduct};
    cart.items.push(itemObj);
}