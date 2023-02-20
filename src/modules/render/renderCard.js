// отрисовка страницы товара:
import { card, API_URL, DATA } from "../const";
import { createElement } from "../utils/createElement";
import { renderCount } from "./renderCount";
import { favoriteHandler } from "../controllers/favoriteController";
import { getFavorite } from "../controllers/favoriteController";
import { addProductCart } from "../controllers/cartController";




export const renderCard = ({ data, render }) => {               // данные товара { id, title, description, price, colors, pic, size }
    card.textContent = '';              // очишщаем

    if (!render) {          // если render нет
        return;
    }


    const { id, title, description, price, colors, pic, size } = data;          // деструктуризация(присваиваем объекту значение)

    console.log('товар ', { id, title, description, price, colors, pic, size }, data);



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
            parent: container,
            cb(elemForm) {           //   вызовется коллбэк
                elemForm.addEventListener('submit', (evt) => {      // событие отправки данных
                    evt.preventDefault();                           // чтоб стр не презагружалась

                    const formData = new FormData(elemForm);                        //  объект котрый вытаскиает значения атрибута name  из элементов формы, передаем форму
                    const product = Object.fromEntries(formData);
                    //console.log('product ', product);                               // {id: '3872463683', color: 'red', size: '42-43', count: '3'}

                    if (product.color && product.size && product.count) {              // если поля заполнены

                        // { id: '8888866276',   color: 'black',   size: 'XL',   count: '1' } , навания свойств взяты из атибутв name у полей
                        addProductCart(product); // product = {} -товар                                   // добавление товара в Корзину 
                        return;
                    }

                    const p = createElement('p',
                        {
                            className: 'card__alert',
                            textContent: product.size ? product.color ? product.count ? 'Что то пошло не так' : 'Количество некорректное' : 'Выберите цвет' : 'Выберите размер'
                        },
                        {
                            parent: form,
                            cb(p) {
                                setTimeout(() => {
                                    p.remove();                             // удаляем элемент <p></p> через 3 с
                                }, 3000);
                            }
                        });
                });
            }
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


    form.insertAdjacentHTML('beforeend', `
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


    // кнпока Избранное:
    const favoriteBtn = createElement('button',
        { // getFavorite
            className: `card__favorite favorite  ${getFavorite().includes(id) ? 'favorite--active' : ''}`,
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
            appends: [count, addCard, favoriteBtn],  // вставляем в этот div элементы  count, cardAddBtn, cardFavoriteBtn
        }
    );




};



















