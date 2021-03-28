
     
var removeItemButton = document.getElementsByClassName('remove-items');
 
for(var i=0; i<removeItemButton.length; i++){
    var button = removeItemButton[i]
    button.addEventListener('click', removeCartItems)
}
 
function removeCartItems(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
 
var quantityInput = document.getElementsByClassName('quantity');
for(var i=0; i<quantityInput.length; i++){
    var inputs = quantityInput[i];
    inputs.addEventListener('change', quantityChange)
}
 
function quantityChange(event){
    updateCartTotal()
    var input = event.target;
    if(input.value <= 0 || isNaN(input.value)){
        input.value = 1;
    }
}
 
 
function addToCart(name,price){
    var cartRow = document.createElement('div');
    cartRow.classList.add("product");
    var cartItem = document.getElementsByClassName('cart-items')[0];
    var cartItemName = cartItem.getElementsByClassName('CartItemName');
 
    for(var i=0;i<cartItemName.length; i++){
        if(cartItemName[i].innerText == name){
            alert("The Product is already added in Cart");
            return
        }
    }
    var cartRowContent = `
        <span class="CartItemName">${name}</span>
        <input type="number" class="quantity" value="1">
        <span class="price p500">${price}</span>
        <span><div class="btn btn-sm btn-danger remove-items">Remove</div></span>
    `
    cartRow.innerHTML = cartRowContent;
 
    cartItem.append(cartRow);
    cartRow.getElementsByClassName('remove-items')[0].addEventListener('click', removeCartItems);
    cartRow.getElementsByClassName('quantity')[0].addEventListener('change', quantityChange);
}
 
 
 
var addToCartButton = document.getElementsByClassName("add-to-cart");
 
for(var i=0; i<addToCartButton.length; i++){
    var SingleButton = addToCartButton[i];
    SingleButton.addEventListener('click', (event)=>{
        var button = event.target;
        var MyItem = button.parentElement.parentElement;
        var ItemPrice = MyItem.getElementsByClassName("ProductPrice")[0].innerText.replace("Price : ", "");
        var ItemName = MyItem.getElementsByClassName("ProductName")[0].innerText;
        addToCart(ItemName, ItemPrice)
        updateCartTotal()
    })
}
 
 
 
 
 
function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
 
    var products = cartItemContainer.getElementsByClassName('product');
 
    var total = 0;
 
    for(var i=0; i<products.length; i++){
        var singleProduct = products[i];
        var quantityHTML = singleProduct.getElementsByClassName('quantity')[0];
        var priceHTML = singleProduct.getElementsByClassName('price')[0];
 
 
        var quantity = quantityHTML.value;
        var price = priceHTML.innerText.replace('$','');
 
        total = total + quantity*price;
 
    }
 
    document.querySelector('.total-price').innerHTML = 'Total Price :$'+total;
 
}
 
updateCartTotal()