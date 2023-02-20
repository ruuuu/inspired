// отрисовка Корзины:
import { cart } from "../const";
import { createElement } from "../utils/createElement";
import { getCart } from "../controllers/cartController";
import { getData } from "../getData";
import { API_URL } from "../const";


export const renderCart = ({ render }) => {

    cart.textContent = '';             // можно было использовать и innerHTML. textContet работате чуть быстрее

    if (!render) {
        return;
    }

    const container = createElement('div',
        {
            className: 'container',
            innerHTML: ' <h2 class="cart__title">Корзина</h2>'
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


    getCart().forEach(async (cartProduct) => {  // тк в функции идет запрос на сервер, пэтому ставим async
        console.log('cartProduct ', cartProduct);

        const cartItem = await getData(`${API_URL}/api/goods/${cartProduct.id}`);  // товар {id: , category: , gender: , description:  , title: , count: , size: , price: }
        console.log('cartItem ', cartItem);
        //  мой спосьоб:
        //         cartList.innerHTML += `
        //                 <li class="cart__item">
        //                     <article class="item">
        //                         <img src="${API_URL}/${cartItem.pic}" alt="${cartItem.description}" class="item__image"> 

        //                         <div class="item__content">
        //                             <h3 class="item__title">${cartItem.title}</h3>
        //                             <p class="item__price">руб ${cartItem.price}</p>

        //                             <div class="item__vendor-code">
        //                                 <span class="item__subtitle">Артикул</span>
        //                                 <span class="item__id">${cartItem.id}</span>
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

        //                         <button class="item__del" aria-label="Удалить товар из корзины"></button>

        //                         <div class="count item__count">
        //                             <button class="count__item count__minus">-</button>
        //                             <span class="count__item count__number">${cartProduct.count}</span>
        //                             <button class="count__item count__plus">+</button>
        //                             <input type="hidden" name="count" value="1">
        //                         </div>
        //                  </article>
        //             </li> 
        //         `;

        // др способ:
        const li = createElement('li',

            {

            });

    });



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
            textContent: '0 руб'
        },
        {
            parent: cartTotal
        });




};



// <!-- Корзина 
// <!-- <div class="container">
//     <h2 class="cart__title">Корзина</h2>

//     <ul class="cart__list">
//         <li class="cart__item">
//             <article class="item">
//                  <img src="" alt="Пижама со штанами шелковая" class="item__image"> -->

            //  <div class="item__content">
            //     <h3 class="item__title">Пижама со штанами шелковая</h3>
            //     <p class="item__price">руб 6999</p>

            //     <div class="item__vendor-code">
            //         <span class="item__subtitle">Артикул</span>
            //         <span class="item__id">089083</span>
            //     </div>
//              </div> -->

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
            //     <input type="hidden" name="count" value="1">
            // </div>
//         </article>
//        </li> 


//          <li class="cart__item">
//              <article class="item">
//         
//              <!-- <img src="" alt="Бюстгальтер-Балконет Prague Full Cover" class="item__image"> -->
//             
//              <div class="item__content">
//                  <h3 class="item__title">Бюстгальтер-Балконет Prague Full Cover</h3>
//                  <p class="item__price">руб 2599</p>

//                  <div class="item__vendor-code">
//                      <span class="item__subtitle">Артикул</span>
//                      <span class="item__id">084375</span>
//                  </div>
//              </div> -->

//           <div class="item__prop">
//              <div class="item__color">
//                  <p class="item__subtitle item__color-title">Цвет</p>
//                  <div class="item__color-item color color_black color_check"></div>
//              </div>

//              <div class="item__size">
//                  <p class="item__subtitle item__size-title">Размер</p>
//                  <div class="item__size-item size">M</div>
//              </div>
//          </div> 

//       <button class="item__del" aria-label="Удалить товар из корзины"></button>

    //      <div class="count item__count">
    //          <button class="count__item count__minus">-</button>
    //          <span class="count__item count__number">1</span>
    //          <button class="count__item count__plus">+</button>
    //          <input type="hidden" name="count" value="1">
    //      </div>
//      </article>
//   </li>
// </ul> 

//  <div class="cart__total">
//     <p class="cart__total-title">Итого:</p>
//     <p class="cart__total-price">руб 9598</p>
// </div> 
//</div>  