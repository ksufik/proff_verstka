'use strict'
class Product {
    constructor(id, name, price, imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    /**
 * Разметка товара на экране
*/
    show() {
        let productShow = `<div class="item">
                <a  class="product-card"> <!--href="single-page.html"-->
                    <img class="product-img" src="${this.imageUrl}" alt="${this.name}">
                    <p class="product-text">${this.name}</p>
                    <p class="product-price">$${this.price}</p>
                </a>
                <div class="add-to-cart" data-id="${this.id}">
                    <a class="add-to-cart-link link"> <!--href="shopping-cart.html"--> 
                        <img class="small-cart" src="img/add-to-cart.svg" alt="add to cart"> 
                        Add to Cart
                    </a>
                </div>
            </div>`;
        return productShow;
    }

    /**
 * Разметка товара в корзине
*/
    cartShow() {
        let cart = `     <figure class="my-account-item">
        <img class="my-account-item_size" src="${this.imageUrl}" alt="${this.name}">
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
                <div class="my-acc-text">${this.count}<span class="text-x">x</span>$${this.price}</div>
            </div>
            <a class="fas fa-times-circle"  data-id="${this.id}" href="#"></a>
        </div>
        </figure>`;
        return cart;
    }
}
/**
 * Считает сумму корзины
*/
function total() {
    let cost = 0;
    let sum = document.getElementById('sum');
    cartProducts.forEach((el) => {
        cost += el.price * el.count;

    });
    sum.innerText = `${cost}$`;

    console.log(cartProducts);
    crossSign();
}

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

let cartProducts = [];
let accMenu = document.querySelector('.my-account-menu-box');
/**
 * Считает кол-во товара и выводит на экран
*/
function productCount() {
    let counter = 0;
    let cartCount = document.querySelector('.cart-count');
    cartProducts.forEach(el => {
        if (el.count != 1) {
            counter++;
        }
    });
    cartCount.innerText = `${cartProducts.length + counter}`;
}
/**
 * Добавляет товар в корзину
*/
function addToCartClickHandler(event) {
    let productId = event.currentTarget.dataset.id;

    //проверяет корзину на наличие повторения и просто увеличивает его в count
    if (cartProducts.length == 0) {
        cartProducts.push(products[productId]);
        cartProducts[cartProducts.length - 1].count = 1;
    } else {
        let a = cartProducts.indexOf(products[productId]);
        console.log(a);
        if (a != -1) {
            cartProducts[a].count++;
        } else {
            cartProducts.push(products[productId]);
            cartProducts[cartProducts.length - 1].count = 1;
        }
    }

    accMenu.innerText = '';
    cartProducts.forEach(el => {
        accMenu.insertAdjacentHTML('afterbegin', el.cartShow());
    });

    productCount();
    total();
}
/**
 * Удаляет товар из корзины
*/
function productDelete(event) {
    let crossId = event.currentTarget.dataset.id;
    let indx = cartProducts.lastIndexOf(products[crossId]);
    cartProducts.splice(indx, 1);
    console.log(cartProducts);
    accMenu.innerText = '';
    cartProducts.forEach(el => {
        accMenu.insertAdjacentHTML('afterbegin', el.cartShow());
    });

    total();
}
/**
 * Ищет крестики у корзины
*/
function crossSign() {
    let del = document.querySelectorAll('.fa-times-circle');
    del.forEach(cross => {
        cross.addEventListener('click', productDelete);
    });

}


