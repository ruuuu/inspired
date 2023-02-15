// отрисовка страницы товара:
import { card, API_URL, DATA } from "../const";
import { createElement } from "../utils/createElement";
import { renderCount } from "./renderCount";
import { favoriteHandler } from "../controllers/favoriteController";
import { getFavorite } from "../controllers/favoriteController";



export const renderCard = (data) => { // данные товара
    if(!data){          // если data нет
        return;
    }

    
    const { id, title, description, price, colors, pic, size } = data;          // деструктуризация(присваиваем объекту значение)

    console.log('товар ', { id, title, description, price, colors, pic, size }, data);

    card.textContent = '';              // очишщаем

    const container = createElement('div',
        {
            className: 'container card__container'
        },
        {
            parent: card
        }
    );


    createElement('img',
        {
            className: 'card__image',
            src: `${API_URL}/${pic}`,
            alt: title
        },
        {
            parent: container
        }
    );


    const form = createElement('form',
        {
            className: 'card__content',
            id: 'order'
        },
        {
            parent: container
        }
    );


    // есть еще  insertAdjacentText,  insertAdjacentElement
    form.insertAdjacentHTML('beforeend', `
        <h2 class="card__title">${title}</h2>
        <p class="card__price">руб ${price}</p>
        <div class="card__vendor-code">
            <span class="card__subtitle">Артикул</span>
            <span class="card__id">${id}</span>
            <input type="hidden" name="id" value="${id}">
        </div>`
    );


    const cardColor = createElement('div',
        {
            className: 'card__color',
            innerHTML: `<p class="card__subtitle card__color-title">Цвет</p>`
        },
        {
            parent: form
        }
    );


    console.log('colors ', colors);

    createElement('div',
        {
            className: 'card__color-list'
        },
        {
            parent: cardColor,
            cb(colorList) {  // коллбэк фукнция, передаем элемент ul котрый будем заполнять
                console.log('colorList ', colorList);

                colors.forEach((colorId, i) => {   // colors= [ 2, 6, 3] id-шники цветов у товара

                    const color = DATA.colors.find((item) => {
                        return item.id === colorId;
                    });


                    const label = createElement('label',
                        {
                            className: `card__color-item color color--${color.title}`
                        },
                        {
                            parent: colorList               // ul
                        }
                    );


                    createElement('input',
                        {
                            className: 'color__input input-hide',
                            type: 'radio',
                            name: 'color',
                            value: color.title,
                            require: true,
                            checked: !i             // любое чсило кроме 0 при переводе  в булево, будет true
                        },
                        {
                            parent: label
                        }
                    );


                    // обводка вокруг радиокнпоки:
                    createElement('span',
                        {
                            className: 'color__check',
                        },
                        {
                            parent: label
                        }
                    );
                });
            }
        }
    );


    const cardSize = createElement('div',
        {
            className: 'card__size',
            innerHTML: `<p class="card__subtitle card__size-title">Размер</p>`
        },
        {
            parent: form
        }
    );


    createElement('div',
        {
            className: 'card__size-list'
        },
        {
            parent: cardSize,
            cb(sizeList) {  // коллбэк фукнция, передаем элемент ul котрый будем заполнять
                console.log('sizeList ', sizeList);

                size.forEach((elem) => {   // size= [ 'XL','L', 'M'] размеры товара

                    const label = createElement('label',
                        {
                            className: 'card__size-item size'
                        },
                        {
                            parent: sizeList            // ul
                        }
                    );

                    createElement('input',
                        {
                            className: 'size__input input-hide',
                            type: 'radio',
                            name: 'size',
                            value: elem,
                            require: true
                        },
                        {
                            parent: label
                        }
                    );

                    // обводка вокруг раиокнопки:
                    createElement('span',
                        {
                            className: 'size__check',
                            textContent: elem
                        },
                        {
                            parent: label
                        }
                    );

                });

                }
             }
        );


        form.insertAdjacentHTML( 'beforeend', `
            <p class="card__subtitle card__description-title">Описание</p>
            <p class="card__description-text">${description}</p>
        `
        );


        const count = renderCount();  // <div class="card__count count">...</div>

        const addCard = createElement('button',
            {
                className: 'card__add-cart main-button',
                type: 'submit',
                textContent: 'В корзину'
            }
        );


        const favoriteBtn = createElement('button',
            { // getFavorite
                className: `card__favorite favorite  ${getFavorite().includes(id) ? 'favorite--active': ''}`,
                ariaLabel: 'Добавить в избранное',
                type: 'button'
            },
            {
                cb(favorBtn) {                              // коллбэк фукнция
                    favorBtn.dataset.id = id;               // добавили data-id кнопке Избранное
                    favorBtn.addEventListener('click', favoriteHandler);
                }
            }
        );


        createElement('div', 
            {   
                className: 'card__control'
            }, 
            {
                parent: form,
                appends:[ count, addCard, favoriteBtn ] ,  // вставляем в этот div элементы  count, cardAddBtn, cardFavoriteBtn
            }
        );

            


};
























//      <form class="card__content" id="order">
    

   

    //      

   

    //      <div class="card__control">
    //         

    //          <button class="card__add-cart main-button" type="submit">В корзину</button>
    //          <button class="card__favorite favorite" aria-label="Добавить в избранное" type="button"
    //              data-id="321654"></button>
    //      </div>
//  </form>
// </div>
