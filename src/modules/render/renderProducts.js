// отрисовка карточек товаров:
import { getData } from "../getData";
import { API_URL } from "../const";
import { createElement } from "../createElement";
import photo from "../../img/photo.jpg";
import { TITLE, DATA } from "../const";




export const renderProducts = async (title, params) => {

    const products = document.querySelector('.goods');
    products.textContent = '';      // очищаем

    const goods = await getData(`${API_URL}/api/goods`, params);
    console.log('goods from server ', goods);

    const container = createElement('div', { className: 'container goods__container' }, { parent: products });

    const h2 = createElement('h2', { className: 'goods__title', textContent: title }, { parent: container });


    const list = createElement('ul', { className: 'goods__list' }, { parent: container });



    const listCard = goods.map((product) => {

        const li = createElement('li',
            {
                className: 'goods__item',

            },
            {
                parent: list
            });


        const article = createElement('article',
            {
                className: 'product',
                innerHTML: `<a class="product__link" href="#/product/${product.id}">
                                <img class="product__image" src="${API_URL}/${product.pic}" alt="${product.title}">
                                <h3 class="product__title">${product.title}</h3>
                            </a>
        
                            <div class="product__row">
                                <p class="product__price">руб ${product.price} </p>
                                 <!-- aria-label показывает что делает кнопка, полезно для слепых людей -->
                                <button class="product__btn-favorite" data-id="${product.id}"   aria-label="Добавить товар в избранное">
                                </button>
                            </div> 
                       `
            },
            { parent: li });


        const colors = createElement('ul', { className: 'product__color-list' },
            {
                parent: article,
                append: product.colors.map((colorId, i) => {                        // product.colors = [1,2,5]
                    const color = DATA.colors.find((item) => item.id == colorId);                               //  переберет массив и найдет item, подоход под условие. DATA.colors = [{id,title,code},{},{}]
                    const productColorItem = createElement('li', { className: 'product__color-item' });
                    createElement('div', { className: `color color--${color.title} ${i ? '' : 'color--check'}` });
                    return productColorItem;

                }),

            }
        );



        return li;
    });



    // products.innerHTML = `
    //   <div class="container goods__container"> 
    //     <h2 class="goods__title">Новинки</h2> 

    //     <ul class="goods__list"> 
    //       <li class="goods__item">
    //         <!--независымй элемент, его можно переиспользовать в др местах-->
    //         <article class="product">
    //           <a class="product__link" href="#">
    //             <img class="product__image" src="${photo}" alt="Бюстгальтер-Балконет Wien из Микрофибры">
    //             <h3 class="product__title">Бюстгальтер-Балконет Wien из Микрофибры</h3>
    //           </a>

    //           <div class="product__row">
    //             <p class="product__price">руб 2999</p>
    //             <!-- aria-label показывает что делает кнопка, полезно для слепых людей -->
    //             <button class="product__btn-favorite" aria-label="Добавить товар в избранное">
    //             </button>
    //           </div>

    //           <ul class="product__color-list">
    //             <li class="product__color-item">
    //               <!--color--check  это актвный  элемент-->
    //               <div class="color color--red color--check"></div>
    //             </li>
    //             <li class="product__color-item">
    //               <div class="color color--white"></div>
    //             </li>
    //             <li class="product__color-item">
    //               <div class="color color--black"></div>
    //             </li>
    //           </ul>
    //         </article>
    //       </li>

    //       <li class="goods__item">
    //         <article class="product">
    //           <a class="product__link" href="#">
    //             <img class="product__image" src="${photo}" alt="Бюстгальтер-Балконет Wien из Микрофибры">
    //             <h3 class="product__title">Бюстгальтер-Балконет Wien из Микрофибры</h3>
    //           </a>

    //           <div class="product__row">
    //             <p class="product__price">руб 2999</p>
    //             <!-- aria-label показывает что делает кнопка, полезно для слепых людей -->
    //             <button class="product__btn-favorite" aria-label="Добавить товар в избранное">
    //             </button>
    //           </div>

    //           <ul class="product__color-list">
    //             <li class="product__color-item">
    //               <!--color--check  выбранный элемент-->
    //               <div class="color color--red color--check"></div>
    //             </li>
    //             <li class="product__color-item">
    //               <div class="color color--white"></div>
    //             </li>
    //             <li class="product__color-item">
    //               <div class="color color--black"></div>
    //             </li>
    //           </ul>
    //         </article>
    //       </li>

    //       <li class="goods__item">
    //         <article class="product">
    //           <a class="product__link" href="#">
    //             <img class="product__image" src="${photo}" alt="Бюстгальтер-Балконет Wien из Микрофибры">
    //             <h3 class="product__title">Бюстгальтер-Балконет Wien из Микрофибры</h3>
    //           </a>

    //           <div class="product__row">
    //             <p class="product__price">руб 2999</p>
    //             <!-- aria-label показывает что делает кнопка, полезно для слепых людей -->
    //             <button class="product__btn-favorite" aria-label="Добавить товар в избранное">
    //             </button>
    //           </div>

    //           <ul class="product__color-list">
    //             <li class="product__color-item">
    //               <!--color--check  выбранный элемент-->
    //               <div class="color color--red color--check"></div>
    //             </li>
    //             <li class="product__color-item">
    //               <div class="color color--white"></div>
    //             </li>
    //             <li class="product__color-item">
    //               <div class="color color--black"></div>
    //             </li>
    //           </ul>
    //         </article>
    //       </li>

    //       <li class="goods__item">
    //         <article class="product">
    //           <a class="product__link" href="#">
    //             <img class="product__image" src="${photo}" alt="Бюстгальтер-Балконет Wien из Микрофибры">
    //             <h3 class="product__title">Бюстгальтер-Балконет Wien из Микрофибры</h3>
    //           </a>

    //           <div class="product__row">
    //             <p class="product__price">руб 2999</p>
    //             <button class="product__btn-favorite" aria-label="Добавить товар в избранное">
    //             </button>
    //           </div>

    //           <ul class="product__color-list">
    //             <li class="product__color-item">
    //               <div class="color color--red color--check"></div>
    //             </li>
    //             <li class="product__color-item">
    //               <div class="color color--white"></div>
    //             </li>
    //             <li class="product__color-item">
    //               <div class="color color--black"></div>
    //             </li>
    //           </ul>
    //         </article>
    //       </li>

    //       <li class="goods__item">
    //         <article class="product">
    //           <a class="product__link" href="#">
    //             <img class="product__image" src="${photo}" alt="Бюстгальтер-Балконет Wien из Микрофибры">
    //             <h3 class="product__title">Бюстгальтер-Балконет Wien из Микрофибры</h3>
    //           </a>

    //           <div class="product__row">
    //             <p class="product__price">руб 2999</p>
    //             <button class="product__btn-favorite" aria-label="Добавить товар в избранное">
    //             </button>
    //           </div>

    //           <ul class="product__color-list">
    //             <li class="product__color-item">
    //               <div class="color color--red color--check"></div>
    //             </li>
    //             <li class="product__color-item">
    //               <div class="color color--white"></div>
    //             </li>
    //             <li class="product__color-item">
    //               <div class="color color--black"></div>
    //             </li>
    //           </ul>
    //         </article>
    //       </li>

    //       <li class="goods__item">
    //         <article class="product">
    //           <a class="product__link" href="#">
    //             <img class="product__image" src="${photo}" alt="Бюстгальтер-Балконет Wien из Микрофибры">
    //             <h3 class="product__title">Бюстгальтер-Балконет Wien из Микрофибры</h3>
    //           </a>

    //           <div class="product__row">
    //             <p class="product__price">руб 2999</p>
    //             <button class="product__btn-favorite" aria-label="Добавить товар в избранное">
    //             </button>
    //           </div>

    //           <ul class="product__color-list">
    //             <li class="product__color-item">
    //               <div class="color color--red color--check"></div>
    //             </li>
    //             <li class="product__color-item">
    //               <div class="color color--white"></div>
    //             </li>
    //             <li class="product__color-item">
    //               <div class="color color--black"></div>
    //             </li>
    //           </ul>
    //         </article>
    //       </li>

    //       <li class="goods__item">
    //         <article class="product">
    //           <a class="product__link" href="#">
    //             <img class="product__image" src="${photo}" alt="Бюстгальтер-Балконет Wien из Микрофибры">
    //             <h3 class="product__title">Бюстгальтер-Балконет Wien из Микрофибры</h3>
    //           </a>

    //           <div class="product__row">
    //             <p class="product__price">руб 2999</p>
    //             <button class="product__btn-favorite" aria-label="Добавить товар в избранное">
    //             </button>
    //           </div>

    //           <ul class="product__color-list">
    //             <li class="product__color-item">
    //               <div class="color color--red color--check"></div>
    //             </li>
    //             <li class="product__color-item">
    //               <div class="color color--white"></div>
    //             </li>
    //             <li class="product__color-item">
    //               <div class="color color--black"></div>
    //             </li>
    //           </ul>
    //         </article>
    //       </li>

    //       <li class="goods__item">
    //         <article class="product">
    //           <a class="product__link" href="#">
    //             <img class="product__image" src="${photo}" alt="Бюстгальтер-Балконет Wien из Микрофибры">
    //             <h3 class="product__title">Бюстгальтер-Балконет Wien из Микрофибры</h3>
    //           </a>

    //           <div class="product__row">
    //             <p class="product__price">руб 2999</p>
    //             <button class="product__btn-favorite" aria-label="Добавить товар в избранное">
    //             </button>
    //           </div>

    //           <ul class="product__color-list">
    //             <li class="product__color-item">
    //               <div class="color color--red color--check"></div>
    //             </li>
    //             <li class="product__color-item">
    //               <div class="color color--white"></div>
    //             </li>
    //             <li class="product__color-item">
    //               <div class="color color--black"></div>
    //             </li>
    //           </ul>
    //         </article>
    //       </li>
    //     </ul>
    //   </div>

    //   `;
}
