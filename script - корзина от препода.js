'use strict'
class Product {
    constructor(id, name, price, imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    show() {
        // let productShow = '';
        //for (let i = 0; i < 8; i++) {
        let productShow = `<div class="item">
                <a  class="product-card"> <!--href="single-page.html"-->
                    <img class="product-img" src="${this.imageUrl}" alt="${this.name}">
                    <p class="product-text">${this.name}</p>
                    <p class="product-price">$${this.price}</p>
                </a>
                <div class="add-to-cart" data-id='${this.id}'>
                    <a class="add-to-cart-link link"> <!--href="shopping-cart.html"--> 
                        <img class="small-cart" src="img/add-to-cart.svg" alt="add to cart"> 
                        Add to Cart
                    </a>
                </div>
            </div>`;
        //}
        return productShow;
    }


    cartShow() {
        let cart = `     <figure class="my-account-item">
        <img src="${this.imageUrl}" alt="${this.name}">
        <div class="my-acc-right">
            <div class="my-acc-info">
                <h3 class="my-acc-head">${this.name}</h3>
                <div class="review_stars stars-height">
                    <input id="star6-5" type="radio" name="stars" />
                    <label title="Отлично" for="star6-5">
                        <i class="fas fa-star"></i>
                    </label>
                    <input id="star6-4" type="radio" name="stars" />
                    <label title="Хорошо" for="star6-4">
                        <i class="fas fa-star"></i>
                    </label>
                    <input id="star6-3" type="radio" name="stars" />
                    <label title="Нормально" for="star6-3">
                        <i class="fas fa-star"></i>
                    </label>
                    <input id="star6-2" type="radio" name="stars" />
                    <label title="Плохо" for="star6-2">
                        <i class="fas fa-star"></i>
                    </label>
                    <input id="star6-1" type="radio" name="stars" />
                    <label title="Ужасно" for="star6-1">
                        <i class="fas fa-star"></i>
                    </label>
                </div>
                <div class="my-acc-text">1 <span class="text-x">x</span>$${this.price}</div>
            </div>
            <a class="fas fa-times-circle" href="#"></a>
        </div>
        </figure>`;
        return cart;
    }
}

//function showBasketItems() {
// let basket = document.querySelector('.basket-items');
// basket.innerHTML = '';
// cartProducts.forEach(itemData => {
//     // accMenu.insertAdjacentHTML('afterbegin', el.show());
//     let item = document.createElement('span');
//     item.innerHTML = `${itemData.name} ${itemData.price}`;
//     basket.appendChild(item);
//     console.log(itemData);
// });
//}

// let cartCard = document.querySelector('.cart-card');
// cartCard.addEventListener('click', showBasketItems);



let products = [];
for (let i = 0; i < 8; i++) {
    products.push(new Product(i, `Product${i + 1}`, 300, `img/product${i + 1}.jpeg`));
}

let productBox = document.querySelector('.product-box');
products.forEach(el => {
    productBox.insertAdjacentHTML('beforeend', el.show());
});


let addToCart = document.querySelectorAll('.add-to-cart');

addToCart.forEach(addTo => {
    addTo.addEventListener('click', addToCartClickHandler);
});



// function addToCartClickHandler(event) {
//     let id = event.currentTarget.dataset.id;
//     cartProducts.push(products[id]);
//     //console.log(cartProducts);
// }



let cartProducts = [];
let accMenu = document.querySelector('.my-account-menu');
function addToCartClickHandler(event) {
    let id = event.currentTarget.dataset.id;
    cartProducts.push(products[id]);
    
    cartProducts.forEach(function (product) {
        accMenu.insertAdjacentHTML('afterbegin', getProductInCartMarkup(product));
    })
}

function getProductInCartMarkup(product) {
    return `
         <figure class="my-account-item">
    <img class="my-account-item_size" src="${product.imageUrl}" alt="${product.name}">
    <div class="my-acc-right">
        <div class="my-acc-info">
            <h3 class="my-acc-head">${product.name}</h3>
            <div class="review_stars stars-height">
                <input id="star6-5" type="radio" name="stars" />
                <label title="Отлично" for="star6-5">
                    <i class="fas fa-star"></i>
                </label>
                <input id="star6-4" type="radio" name="stars" />
                <label title="Хорошо" for="star6-4">
                    <i class="fas fa-star"></i>
                </label>
                <input id="star6-3" type="radio" name="stars" />
                <label title="Нормально" for="star6-3">
                    <i class="fas fa-star"></i>
                </label>
                <input id="star6-2" type="radio" name="stars" />
                <label title="Плохо" for="star6-2">
                    <i class="fas fa-star"></i>
                </label>
                <input id="star6-1" type="radio" name="stars" />
                <label title="Ужасно" for="star6-1">
                    <i class="fas fa-star"></i>
                </label>
            </div>
            <div class="my-acc-text">1 <span class="text-x">x</span>$${product.price}</div>
        </div>
        <a class="fas fa-times-circle" href="#"></a>
    </div>
    </figure>`;
}
