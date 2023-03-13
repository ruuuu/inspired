// отрисовка Корзины http://localhost:3000/#/cart:
import { cart } from "../const";
import { createElement } from "../utils/createElement";
import { cartTotalPrice, getCart } from "../controllers/cartController";
import { getData } from "../getData";
import { API_URL } from "../const";
import { countController } from "../controllers/countController";
import { renderCount } from "./renderCount";
import { removeCart } from "../controllers/cartController";
import { addProductCart } from "../controllers/cartController";





export const renderCart = ({ render, cartGoodsStore }) => {
    //console.log('cartGoodsStore ', cartGoodsStore);

    cart.textContent = '';             // можно было использовать и innerHTML. textContet работате чуть быстрее

    if (!render) {
        return;
    }

    const container = createElement('div',
        {
            className: 'container',
            innerHTML: '<h2 class="cart__title">Корзина</h2>'
        },
        {
            parent: cart
        }
    );


    const cartList = createElement('ul',
        {
            className: 'cart__list'
        },
        {
            parent: container
        }
    );

    // getCart() = [ {id, color, count, size}, {}, {} ] - Корзина

    getCart().forEach((cartProduct) => {
        //console.log('cartProduct ', cartProduct);
        const data = cartGoodsStore.getProduct(cartProduct.id);             //  товар {id: , category: , gender: , description:  , title: , count: , size: , price: }


        //  console.log('cartItem ', cartItem);
        //  мой способ:
        //         cartList.innerHTML += `
        //                 <li class="cart__item">
        //                     <article class="item">
        //                         <img src="${API_URL}/${data.pic}" alt="${data.description}" class="item__image"> 

        //                         <div class="item__content">
        //                             <h3 class="item__title">${data.title}</h3>
        //                             <p class="item__price">руб ${data.price}</p>

        //                             <div class="item__vendor-code">
        //                                 <span class="item__subtitle">Артикул</span>
        //                                 <span class="item__id">${data.id}</span>
        //                             </div>
        //                         </div> 

        //                         <div class="item__prop">
        //                             <div class="item__color">
        //                                 <p class="item__subtitle item__color-title">Цвет</p>
        //                                 <div class="item__color-item color color--${cartProduct.color} color--check"></div>
        //                             </div>

        //                             <div class="item__size">
        //                                 <p class="item__subtitle item__size-title">Размер</p>
        //                                 <div class="item__size-item size">${cartProduct.size}</div>
        //                             </div>
        //                         </div> 
        //                  </article>
        //             </li> 
        //         `;

        // др способ:
        const li = createElement('li',
            {
                className: 'cart__item'
            },
            {
                parent: cartList
            }
        );

        const article = createElement('article',
            {
                className: 'item'
            },
            {
                parent: li
            }
        );

        article.insertAdjacentHTML('beforeend', `
            <img src="${API_URL}/${data.pic}" alt="${data.description}" class="item__image"> 

            <div class="item__content">
                <h3 class="item__title">${data.title}</h3>
                <p class="item__price">руб ${data.price}</p>

                <div class="item__vendor-code">
                    <span class="item__subtitle">Артикул</span>
                    <span class="item__id">${data.id}</span>
                </div>
            </div>

          <div class="item__prop">
            <div class="item__color">
                    <p class="item__subtitle item__color-title">Цвет</p>
                    <div class="item__color-item color color--${cartProduct.color} color--check"></div>
                </div>

                <div class="item__size">
                    <p class="item__subtitle item__size-title">Размер</p>
                    <div class="item__size-item size">${cartProduct.size}</div>
                </div>
            </div>
        `);

        // кнпока Крестик:
        createElement('button',
            {
                className: 'item__del',
                ariaLabel: 'Удалить товар из корзины'       // если на кнопке нет надписи, то нужен атрибут aria-label
            },
            {
                parent: article,
                cb(buttonDel) {                             // коллбэк, при нажатии на кнопку Крестик, вызовется эта фукнция
                    buttonDel.addEventListener('click', () => {
                        const isRemove = removeCart(cartProduct);  // удален ли товар из корзины
                        if (isRemove) {
                            li.remove();        // удаляем элемент <li></li>
                        }
                        cartTotalPrice.update();  // обновляем итговую сумму
                    });
                }
            }
        );

        const countBlock = renderCount(cartProduct.count, 'item__count', (count) => {  //  рисует кнопки +/- и число товара
            cartProduct.count = count;
            addProductCart(cartProduct, true);
            cartTotalPrice.update();                 // обновляем итговую сумму при нажатии на кнопки +/-
        });

        article.append(countBlock);
    }); // forEach



    const cartTotal = createElement('div',
        {
            className: 'cart__total'
        },
        {
            parent: container
        }
    );


    createElement('p',
        {
            className: 'cart__total-title',
            textContent: 'Итого'
        },
        {
            parent: cartTotal
        });


    const totalPrice = createElement('p',
        {
            className: 'cart__total-price',
        },
        {
            parent: cartTotal,
            cb(elem) {      // elem это  totalPrice
                cartTotalPrice.update();
                cartTotalPrice.writeTotal(elem);  // обновляем итговую сумму
            }
        });

};



// <!-- Корзина 
// <!-- <div class="container">
//     <h2 class="cart__title">Корзина</h2>

//     <ul class="cart__list">
//         <li class="cart__item">
//             <article class="item">
//                 <img src="" alt="Пижама со штанами шелковая" class="item__image"> 

                //  <div class="item__content">
                //     <h3 class="item__title">Пижама со штанами шелковая</h3>
                //     <p class="item__price">руб 6999</p>

                //     <div class="item__vendor-code">
                //         <span class="item__subtitle">Артикул</span>
                //         <span class="item__id">089083</span>
                //     </div>
    //              </div>

                //  <div class="item__prop">
                //     <div class="item__color">
                //         <p class="item__subtitle item__color-title">Цвет</p>
                //         <div class="item__color-item color color_black color_check"></div>
                //     </div>

                //     <div class="item__size">
                //         <p class="item__subtitle item__size-title">Размер</p>
                //         <div class="item__size-item size">XS</div>
                //     </div>
                // </div>
//
//              <button class="item__del" aria-label="Удалить товар из корзины"></button>

                // <div class="count item__count">
                //     <button class="count__item count__minus">-</button>
                //     <span class="count__item count__number">1</span>
                //     <button class="count__item count__plus">+</button>
                //     <input type="hidden" name="count" value="1"> это поле нужно чтобы отправлять его значение на сервер
                // </div>
//         </article>
//        </li> 
// </ul> 

//  <div class="cart__total">
//     <p class="cart__total-title">Итого:</p>
//     <p class="cart__total-price">руб 9598</p>
// </div> 
//</div>  
