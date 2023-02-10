// отрисовка спсика карточек товаров:
import { getData } from "../getData";
import { API_URL, COUNT_PAGINATION } from "../const";
import { createElement } from "../createElement";
import photo from "../../img/photo.jpg";
import { TITLE, DATA } from "../const";
import { renderPagination } from "./renderPagintion";



export const renderProducts = async (title, params) => { //  ставим async тк ув ыукни есть запрос на сервер

    const products = document.querySelector('.goods');
    products.textContent = '';                              // очищаем

    const data = await getData(`${API_URL}/api/goods`, params);                   // http://localhost:8024/api/goods?gender=men&category=socks
    console.log('data from server ', data);

    const goods = Array.isArray(data) ? data : data.goods;   // ессли data этом ассив, а не объект
    //console.log('goods finlly ', goods)

    const container = createElement('div', { className: 'container goods__container' }, { parent: products });

    const h2 = createElement('h2', { className: 'goods__title', textContent: title }, { parent: container });


    const list = createElement('ul', { className: 'goods__list' }, { parent: container });



    const listCard = goods.map((product) => {    // перебираем [{}, {}, {}]

        const li = createElement('li',
            {
                className: 'goods__item',
            },
            {
                parent: list
            }
        );


        const article = createElement('article',
            {
                className: 'product',
                innerHTML: `
                            <a class="product__link" href="#/product/${product.id}">
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
            { parent: li }
        );


        createElement('ul', { className: 'product__color-list' },
            {
                parent: article,
                appends: product.colors.map((colorId, i) => {                        // product.colors = [1,2,5]
                    const color = DATA.colors.find((item) => item.id == colorId);                               //  переберет массив и найдет первый  item, подоход под условие. DATA.colors = [{id,title,code},{},{}]
                    //console.log('color after find', color);
                    return createElement('li', { className: `color color--${color.title} ${i ? '' : 'color--check'}` });
                })   // appends: [li, li, li, li]
            }
        );

        return li;
    });



    if (data.pages && data.pages > 1) { // рисукм  кнопки пагинации
        const pagination = createElement('div',
            {
                className: 'goods__pagination pagination'
            },
            {
                parent: container
            }

        );

        renderPagination(pagination, data.page, data.pages, COUNT_PAGINATION);  // отрисовка пагинации

    }


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
    //              < !--color--check  это актвный  элемент-- >
    //             <li class="color color--red color--check"">
    //               
    //
    //             </li>
    //             <li class="color color--black">
    //              
    //             </li>
    //             <li class="color color--white">
    //              
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
