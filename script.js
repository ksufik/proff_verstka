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

}

class Cart {
    constructor(id, name, price, imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.count = 1;
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



    /**
    * Считает кол-во товара и выводит на экран
    */
    productCount() {
        let counter = 0;
        // let cartCount = document.querySelector('.cart-count');
        cartProducts.forEach(el => {
            if (el.count != 1) {
                counter += el.count - 1;
            }
        });
        cartCount.innerText = `${cartProducts.length + counter}`;
    }

    /**
     * Считает сумму корзины
    */

    total() {//мне кажется, этот метод было грамотнее через this делать и перебирать не здесь, а при вызове и передавать сюда цену и кол-во, но тогда бы пришлось для удаления делать отдельно
        let cost = 0;
        let sum = document.getElementById('sum');
        cartProducts.forEach((el) => {
            cost += el.price * el.count;
        });
        sum.innerText = `${cost}$`;

        cartProducts[0].productCount();
        cartProducts[0].productDelete();
    }

    /**
    * Удаляет товар из корзины
    */
    productDelete() {
        let del = document.querySelectorAll('.fa-times-circle');
        del.forEach(cross => {
            cross.addEventListener('click', function (event) {
                let crossId = event.currentTarget.dataset.id;
                let indx = cartProducts.findIndex(item => item.id == crossId);
                if (indx != -1) {
                    cartProducts.splice(indx, 1);
                }
                accMenu.innerText = '';
                cartProducts.forEach(el => {
                    accMenu.insertAdjacentHTML('afterbegin', el.cartShow());
                    el.total();
                    el.productCount();
                });
                if (cartProducts.length == 0) {
                    console.log('zero');
                    sum.innerText = `0$`;
                    cartCount.innerText = `0`;
                }
            });
        });
    }
}

let products = [];
for (let i = 0; i < 8; i++) {
    products.push(new Product(i, `Product${i + 1}`, 300, `img/product${i + 1}.jpeg`));
}

let productBox = document.querySelector('.product-box');
products.forEach(el => {
    productBox.insertAdjacentHTML('beforeend', el.show());
});


let cartProducts = [];
let accMenu = document.querySelector('.my-account-menu-box');

let cartCount = document.querySelector('.cart-count');


let addToCart = document.querySelectorAll('.add-to-cart');
addToCart.forEach(addTo => {
    addTo.addEventListener('click', function (event) {//если обработчик делать отдельно, то к какому классу он относится и что его вызывает?
        let productId = event.currentTarget.dataset.id;
        if (cartProducts.length == 0) {
            cartProducts[0] = new Cart(products[productId].id, products[productId].name, products[productId].price, products[productId].imageUrl);
        } else {
            let a = cartProducts.findIndex(item => item.id == productId);
            if (a != -1) {
                cartProducts[a].count++;
            } else {
                cartProducts.push(new Cart(products[productId].id, products[productId].name, products[productId].price, products[productId].imageUrl));
            }
        }
        accMenu.innerText = '';
        cartProducts.forEach(function (el) {
            accMenu.insertAdjacentHTML('afterbegin', el.cartShow());
            // el.total(el.price, el.count); - логичнее тотал было бы вызывать здесь c аргументами, но я сделала как мне было проще
        });
        cartProducts[0].total();
    });
});

