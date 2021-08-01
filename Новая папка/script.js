'use strict'
class ProductItem {
    constructor(id, name, price, imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    /**
 * Разметка товара на экране
*/
    show() {//не придумала, как еще получать информацию о нужном нам объекте в корзину, кроме как считывать из атрибутов даты, т.к. к products доступа нет - подскажите правильный вариант пожалуйста
        return `<div class="item">
                <a  class="product-card"> <!--href="single-page.html"-->
                    <img class="product-img" src="${this.imageUrl}" alt="${this.name}">
                    <p class="product-text">${this.name}</p>
                    <p class="product-price">$${this.price}</p>
                </a>
                <div class="add-to-cart" data-id="${this.id}" data-name="${this.name}" data-price="${this.price}" data-imageUrl="${this.imageUrl}">
                    <a class="add-to-cart-link link"> <!--href="shopping-cart.html"--> 
                        <img class="small-cart" src="img/add-to-cart.svg" alt="add to cart"> 
                        Add to Cart
                    </a>
                </div>
            </div>`;
    }

}

class ProductList {
    // #products;

    constructor(container = '.product-box') {
        this.container = container;//document.querySelector(container);
        //  this.#goods = [];
        this.products = [];


        this.#fetchGoods();
        this.#render();
    }

    #fetchGoods() {
        for (let i = 0; i < 8; i++) {
            this.products.push(new ProductItem(i, `Product${i + 1}`, 300, `img/product${i + 1}.jpeg`));
        }
    }

    #render() {
        const productBox = document.querySelector(this.container);
        this.products.forEach(el => {
            productBox.insertAdjacentHTML('beforeend', el.show());
        });
        console.log(this.products);
    }
}



class CartItem {//следует ли корзину делать потомком товара? тогда дублирования кода в конструкторе можно было бы избежать 
    constructor(id, name, price, imageUrl, count = 1) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.count = count;
    }

    /**
 * Разметка товара в корзине
*/
    cartShow() {
        return `     <figure class="my-account-item">
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
    }

}
class CartList {
    constructor(event, container = '.my-account-menu-box') {
        this.container = container;
        this.cartProducts = [];
        // this.productId = productId;
        // this.productName = productName;
        // this.productPrice = productPrice;
        // this.productImage = productImage;

        this.event = event;

        this.fetchCartGoods();
        this.#render();
    }

    fetchCartGoods() {
        let productId = this.event.dataset.id;
        let productName = this.event.dataset.name;
        let productPrice = this.event.dataset.price;
        let productImage = this.event.dataset.imageurl;
        if (this.cartProducts.length === 0) {
            this.cartProducts[0] = new CartItem(productId, productName, productPrice, productImage);
        } else {
            let a = this.cartProducts.findIndex(item => item.id === productId);
            if (a != -1) {
                this.cartProducts[a].count++;
            } else {
                this.cartProducts.push(new CartItem(productId, productName, productPrice, productImage));
            }
        }

        //  cartProducts[0].total();
        console.log(this.cartProducts);
    }

    #render() {
        const accMenu = document.querySelector(this.container);
        accMenu.innerText = '';
        this.cartProducts.forEach(el => {
            accMenu.insertAdjacentHTML('afterbegin', el.cartShow());
            // el.total(el.price, el.count); - логичнее тотал было бы вызывать здесь c аргументами, но я сделала как мне было проще
        });
    }



    /**
    * Считает кол-во товара и выводит на экран
    */
    productCount() {
        let counter = 0;
        let cartCount = document.querySelector('.cart-count');
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
        //cartProducts[0].productDelete();
    }

    // /**
    // * Удаляет товар из корзины
    // */
    // productDelete() {
    //     let del = document.querySelectorAll('.fa-times-circle');
    //     del.forEach(cross => {
    //         cross.addEventListener('click', function (event) {
    //             let crossId = event.currentTarget.dataset.id;
    //             let indx = cartProducts.findIndex(item => item.id == crossId);
    //             if (indx != -1) {
    //                 cartProducts.splice(indx, 1);
    //             }
    //             accMenu.innerText = '';
    //             cartProducts.forEach(el => {
    //                 accMenu.insertAdjacentHTML('afterbegin', el.cartShow());
    //                 el.total();
    //                 el.productCount();
    //             });
    //             if (cartProducts.length == 0) {
    //                 console.log('zero');
    //                 sum.innerText = `0$`;
    //                 cartCount.innerText = `0`;
    //             }
    //         });
    //     });
    // }
}


const list = new ProductList();

//let cartProducts = [];
//let accMenu = document.querySelector('.my-account-menu-box');

//let cartCount = document.querySelector('.cart-count');


let addToCart = document.querySelectorAll('.add-to-cart');
//let cartProducts = [];
//let accMenu = document.querySelector('.my-account-menu-box');

addToCart.forEach(addTo => {
    addTo.addEventListener('click', function (event) {
        new CartList(event.currentTarget);
    });
});

// addToCart.forEach(addTo => {
//     addTo.addEventListener('click', function (event) {//у меня не получилось вынести обработчик отдельно - как это сделать?
//         let productId = event.currentTarget.dataset.id;
//         let productName = event.currentTarget.dataset.name;
//         let productPrice = event.currentTarget.dataset.price;
//         let productImage = event.currentTarget.dataset.imageurl;
//         if (cartProducts.length == 0) {
//             cartProducts[0] = new CartItem(productId, productName, productPrice, productImage);
//         } else {
//             let a = cartProducts.findIndex(item => item.id == productId);
//             if (a != -1) {
//                 cartProducts[a].count++;
//             } else {
//                 cartProducts.push(new CartItem(productId, productName, productPrice, productImage));
//             }
//         }
//         accMenu.innerText = '';
//         cartProducts.forEach(function (el) {
//             accMenu.insertAdjacentHTML('afterbegin', el.cartShow());
//             // el.total(el.price, el.count); - логичнее тотал было бы вызывать здесь c аргументами, но я сделала как мне было проще
//         });
//         //  cartProducts[0].total();
//         console.log(cartProducts);
//     });
//});