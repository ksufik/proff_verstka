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
    show() {
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


class CartItem {//!!!!!!!!!!!!!!!следует ли корзину делать потомком товара? тогда дублирования кода в конструкторе можно было бы избежать 
    constructor(id, name, price, imageUrl, count = 1) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.count = count;
    }

    /**
 * Разметка для 1 товара в корзине
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
                <div class="my-acc-text"><span class="product-count" data-id="${this.id}">${this.count}</span><span class="text-x">x</span>$${this.price}</div>
            </div>
            <a class="fas fa-times-circle"  data-id="${this.id}" href="#"></a>
        </div>
        </figure>`;
    }

}
class CartList {
    constructor(container = '.my-account-menu-box', productCountContainer = '.product-count', totalContainer = 'sum', countContainer = '.cart-count') {
        this.container = container;
        this.productCountContainer = productCountContainer;
        this.totalContainer = totalContainer;
        this.countContainer = countContainer;
        this.cartProducts = [];
    }

    add(event) {
        let productId = event.dataset.id;
        let productName = event.dataset.name;
        let productPrice = event.dataset.price;
        let productImage = event.dataset.imageurl;

        if (this.cartProducts.length === 0) {
            this.cartProducts[0] = new CartItem(productId, productName, productPrice, productImage);
            this.wholeCartRender();
        } else {
            let a = this.cartProducts.findIndex(item => item.id === productId);
            if (a != -1) {
                this.cartProducts[a].count++;
                this.countCartRender(this.cartProducts[a]);
                this.productCount();
                this.total();
            } else {
                this.cartProducts.push(new CartItem(productId, productName, productPrice, productImage));
                this.newProductCartRender();
            }
        }

    }

    /**
     * Отрисовка 1 товара в корзине
    */
    newProductCartRender() {
        const accMenu = document.querySelector(this.container);
        accMenu.insertAdjacentHTML('afterbegin', this.cartProducts[this.cartProducts.length - 1].cartShow());
        this.productCount();
        this.total();
        this.remove();
    }

    /**
 * Отрисовка всех товаров в корзине
*/
    wholeCartRender() {
        const accMenu = document.querySelector(this.container);
        accMenu.innerText = '';
        this.cartProducts.forEach(el => {
            accMenu.insertAdjacentHTML('afterbegin', el.cartShow());
        });
        this.productCount();
        this.total();
        this.remove();
    }

    /**
* Отрисовка кол-ва  товара в корзине
*/
    countCartRender(count) {
        const accText = document.querySelectorAll(this.productCountContainer);
        accText.forEach(el => {
            if (el.dataset.id === count.id) { el.textContent = `${count.count}` };
        });
    }

    /**
    * Считает кол-во товара и выводит на экран
    */
    productCount() {
        let counter = 0;
        let cartCount = document.querySelector(this.countContainer);
        this.cartProducts.forEach(el => {
            if (el.count != 1) {
                counter += el.count - 1;
            }
        });
        cartCount.innerText = `${this.cartProducts.length + counter}`;
    }

    /**
     * Считает сумму корзины
    */

    total() {
        let cost = 0;
        let sum = document.getElementById(this.totalContainer);
        this.cartProducts.forEach((el) => {
            cost += el.price * el.count;
        });
        sum.innerText = `${cost}$`;
    }

    // /**
    // * Удаляет товар из корзины
    // */
    remove() {
        let del = document.querySelectorAll('.fa-times-circle');
        del.forEach(cross => {
            cross.addEventListener('click', event => {
                let crossId = event.currentTarget.dataset.id;
                let indx = this.cartProducts.findIndex(item => item.id == crossId);
                if (indx != -1) {
                    this.cartProducts.splice(indx, 1);
                }
                console.log(this.cartProducts);
                this.wholeCartRender();
            });
        });

    }
}


const list = new ProductList();
const cart = new CartList();

let addToCart = document.querySelectorAll('.add-to-cart');

addToCart.forEach(addTo => {
    addTo.addEventListener('click', el => {
        cart.add(el.currentTarget);
    });
});
