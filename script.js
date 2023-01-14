let shopItemsElement = document.getElementsByClassName("cart-items");

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const removeBtn = document.getElementsByClassName("cart-btn");
  for (i = 0; i < removeBtn.length; i++) {
    var button = removeBtn[i];
    button.addEventListener("click", remove);
  }
  var quantity = document.getElementsByClassName("cart-quantity");
  for (i = 0; i < quantity.length; i++) {
    var input = quantity[i];
    input.addEventListener("keyup", inputChange);
    input.addEventListener("change", inputChange);
  }
}
let addToCartButton = document.getElementsByClassName("add-to-cart");
for (i = 0; i < addToCartButton.length; i++) {
  let addButton = addToCartButton[i];
  addButton.addEventListener("click", addToCartHandler);
}
function addToCartHandler(event) {
  var albumsElement = event.target.parentElement.parentElement;
  let albumName =
    albumsElement.getElementsByClassName("album-title")[0].innerText;
  let albumPrice =
    albumsElement.getElementsByClassName("album-price")[0].innerHTML;
  let albumUrl = albumsElement.getElementsByClassName("album-photo")[0].src;
  createCartItems(albumName, albumPrice, albumUrl);
}

async function createCartItems(albumName, albumPrice, albumUrl) {
  let cartRow = document.createElement("div");
  cartRow.classList = `cart-row`;
  cartRow.innerHTML = `
  <div class="cart-item">
   
         <img
           class="cart-img"
           src="${albumUrl}"
         /><p style="display: inline;">${albumName}</p>
   
  </div>
  <span class="cart-price"> ${albumPrice}</span>
   <div class="cart-quantity-remove">
     <input type="number" min="1" value="1" class="cart-quantity">
     <btn class="add-btn cart-btn">Remove</btn>
  
  
  </div>`;
  shopItemsElement[0].append(cartRow);
  await updateTotal();
  await ready();
  alert("You add one item to cart");
}

let purchaseBtn = document.getElementsByClassName("purchase-btn")[0];
purchaseBtn.addEventListener("click", purchased);

function purchased() {
  updateTotal();
  if (totalPrice1 === 0) {
    alert("Please choise one item at least.");
  } else {
    prompt(`Your total charged is $${totalPrice1}
        Enter your Home address.`);
  }
}
function inputChange(event) {
  let inputValue = event.target;
  updateTotal();
}
function remove(event) {
  let userClicked = event.target;
  userClicked.parentElement.parentElement.remove();
  updateTotal();
  console.log(totalPrice1);
}
let totalPrice1;
function updateTotal() {
  totalPrice1 = 0;
  let totalPrice = 0;
  let cardItemsElement = document.getElementsByClassName("cart-items")[0];
  let cartRows = cardItemsElement.getElementsByClassName("cart-row");
  for (i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    var price = parseFloat(
      cartRow.getElementsByClassName("cart-price")[0].innerText.replace("$", "")
    );
    var quantity = cartRow.getElementsByClassName("cart-quantity")[0].value;
    totalPrice = totalPrice + price * quantity;
    totalPrice1 = parseFloat(totalPrice).toFixed(3);
  }
  let totalPriceElement = document.getElementsByClassName("cart-total-price");
  totalPriceElement[0].innerHTML = ` $ ${totalPrice1}`;
}
