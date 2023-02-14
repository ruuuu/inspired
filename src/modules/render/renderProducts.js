// отрисовка спсика карточек товаров:

import { getData } from "../getData";
import { API_URL, COUNT_PAGINATION } from "../const";
import { createElement } from "../utils/createElement";
import photo from "../../img/photo.jpg";
import { TITLE, DATA, products } from "../const";
import { renderPagination } from "./renderPagintion";
import { getFavorite } from "../controllers/favoriteController";


export const renderProducts = async (title, params) => {    //  ставим async тк ув ыукни есть запрос на сервер
    //console.log('params ', params);                         // { gender: 'men' } или  { gender: 'men' ,  category: 'pijams} или  { gender: 'men' ,  category: 'pijams,  page: 2}


    products.textContent = '';                              // очищаем


    const data = await getData(`${API_URL}/api/goods`, params);                   // http://localhost:8024/api/goods?gender=men&category=socks

    const goods = Array.isArray(data) ? data : data.goods;   // ессли data это массив, а не объект


    const container = createElement('div', { className: 'container goods__container' }, { parent: products });

    const titleElem = createElement('h2', { className: 'goods__title', textContent: title }, { parent: container });


    const list = createElement('ul', { className: 'goods__list' }, { parent: container });


    if (Object.hasOwn(data, 'totalCount')) {  // проверяет есть ли у объекта data свойство totalCount
        createElement('sup',
            {
                className: 'goods__title-sup',
                innerHTML: `&nbsp(${data?.totalCount})` // data?.totalCount  если у объекта data  есть свойство totalCount
            },
            {
                parent: titleElem
            }
        );


        if (!data.totalCount) {
            createElement('p', {
                className: 'goods__warning',
                textContent: 'По вашему запросу ничегоь не найдено'
            },
                {
                    parent: container
                });

            return;         // дальше код не будет выполнчться
        }
    }



    const favoriteList = getFavorite(); // список избранных товаров(из localStoridge)



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
                                 <!-- max.includes(elem) проверяет есть ли в массиве элемент elem -->
                                <button class="product__btn-favorite favorite ${favoriteList.includes(product.id) ? 'favorite--active' : ''}" data-id="${product.id}"   aria-label="Добавить товар в избранное">
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
                    const color = DATA.colors.find((item) => item.id == colorId);                               // find  переберет массив и найдет первый  item, подоход под условие. DATA.colors = [{id,title,code},{},{}]
                    //console.log('color after find', color);
                    return createElement('li', { className: `color color--${color.title} ${i ? '' : 'color--check'}` });
                })   // appends: [li, li, li, li]
            }
        );

        return li;
    });  // map



    if (data.pages && data.pages > 1) { // рисуем  кнопки пагинации
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
