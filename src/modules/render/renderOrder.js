// отрисовка модалки оформленного заказа:
import { order } from "../const";
import { createElement } from "../utils/createElement";
import { getCart } from "../controllers/cartController";
import { sendOrder } from "../controllers/orderController";
import { cartGoodsStore } from "../controllers/cartController";
import { API_URL } from "../const";
import { cartTotalPrice } from "../controllers/cartController";
import { clearCart } from "../controllers/cartController";
import { router } from "../utils/router";


//  верстка мод окна офрленного заказа:
const showOrderInfo = (data) => {  // data - обработанный ответ от сервера в виде res.json(): { id: 34242, createdAt:'12.03.2023', fio:"Alsu", address:"Test", phone:"892744351223", email:"tre@mail.ru", delivery:"self", order:[{id, color, size, count}, {}, {}] }
    
    // console.log('data from server in res.json() ', data);
    const modal = createElement('div',                      // подложка под тело модалки
        {
            className: 'modal'
        },
        {
            parent: document.body,
            cb(el) {                        // el- этот созданный modal(подложка),  при нажатии на el, вызовится эта коллбэк-фукняи(модалка закрывается)
                el.addEventListener('click', (evt) => {
                    if (evt.target === el) {    // если нажатый элемент(evt.target) равен modal
                        el.remove();                        // удаление элемента el
                        clearCart();                        // очищвем Корзину
                        router.navigate('/');               // преход на главную станицу
                    }
                });

            }
        }
    );


    const modalBody = createElement('div',
        {
            className: 'modal__body'
        },
        {
            parent: modal
        }
    );


    modalBody.insertAdjacentHTML('beforeend', `   
        <h2 class="modal__title">Заказ оформлен №${data.id}</h2>
        <p class="modal__description modal__description_thank">Спасибо за выбор нашего магазина!</p>
        <p class="modal__description">Здесь вы можете посмотреть все детали вашего заказа.</p>
    
        <ul class="modal__customer-data customer">
          <li class="customer__item">
            <span class="customer__item-title">Получатель</span>
            <span class="customer__item-data">${data.fio}</span>
          </li>

          
          ${data.address && // если поле Адрес data.address заполнили, то рисуем верстку поля Адрес (как в реакте)
            `
                <li class="customer__item">
                    <span class="customer__item-title">Адрес доставки</span>
                    <span class="customer__item-data">${data.address}</span>
                </li>
            `
            }
    
         
            <li class="customer__item">
                <span class="customer__item-title">Телефон</span>
                <span class="customer__item-data">${data.phone}</span>
            </li>
    
         
            ${data.email && //  если поле емейл data.email заполнили, то рисуем верстку поля Еmail (как в реакте)
                `  
                    <li class="customer__item">
                        <span class="customer__item-title">E-mail</span>
                        <span class="customer__item-data">${data.email}</span>
                    </li>
                `
        }
         
    
          <li class="customer__item">
                <span class="customer__item-title">Способ получения</span>
                <span class="customer__item-data">${{
                self: 'Самовывоз',
                delivery: 'Доставка'
          }[data.delivery] // если data.delivery = self то запишется 'Самовывоз'. Если data.delivery = delivery, то запишется 'Доставка'
         }
            </span>
          </li>
        </ul>
    `
    );


    const goodslist = createElement('ul', 
    {
        className: 'modal__goods goods-list'
    },
    {
        parent: modalBody
    });


    const goodsList = createElement('ul',
        {
            className: 'modal__goods goods-list'
        },
        {
            parent: modalBody,
            //при помощи спред опертаора ... из [ li, li ,li, li ] превращаем в  <li></li>, <li></li>, <li></li>, <li></li>, <li></li>:
            appends: [...data.order.map((cartItem) => {   // перебираем ...data.order  (товары корзины), map возвращет  новый массив, состоящий из элементов удовелетвор условию
                
                const goodListItem = createElement('li',
                    {
                        className: 'goods-list__item'
                    }
                );

                const product = cartGoodsStore.getProduct(cartItem.id); // 
                console.log('product of cart ', product);   // {  category: , colors: , description: , gender: , id: , materials: ,  pic: , price: , title: , size: }  
                
                const img = createElement('img', 
                {
                    className: 'goods-list__img',
                    src: `${API_URL}/${product.pic}`,
                    alt: product.title
                },
                {
                    parent: goodListItem
                });

                
                createElement('p', 
                {
                    className: 'goods-list__count',
                    textContent: `X${cartItem.count}`
                },
                {
                    parent: goodListItem
                });
               
                // console.log('data.order ', data.order);
                // console.log('...data.order ', ...data.order);
                return goodListItem;  // li
            })
            ]
        });
        


        const cartTotal = createElement('div',
            {
                className: 'modal__total',
                innerHTML: '<p class="modal__total-title">Итого:</p>'
            },
            {
                parent: modalBody
            }
        );


        createElement('p',
        {
            className: 'modal__total-price',
        },
        {
            parent: cartTotal,
            append: createElement('span',
                {
                    // пустой объект
                },
                {
                    cb(elem){  // elem  этот <p>
                        cartTotalPrice.writeTotal(elem);
                    }
                }
            ) 
        }
        );

// отсюда траблы
         createElement('button', 
        {
            className: 'modal__close',
            innerHTML: `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8L8 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M16 16L8 8" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            `
        },
        {
            parent: modalBody,
            cb(elem){       // elem это этот  button
                
                elem.addEventListener('click', ()=>{  // на кнопку Крестик вешаем обработчик
                    modal.remove();             // удаляем элемент modal
                    clearCart();                // очищвем Корзину
                    router.navigate('/');        // преход на главную станицу
                });   
            }
        }
        );


};




export const renderOrder = ({ render }) => {

    order.textContent = '';             // order это <section>. Можно было использовать и innerHTML. textContet работате чуть быстрее

    if (!render) {
        return;
    }

    const container = createElement('div',
        {
            className: 'container',
            innerHTML: '<h2 class="order__title">Оформление заказа</h2>'
        },
        {
            parent: order
        }
    );


    const orderForm = createElement('form', // форма "Оформление заказа"
        {
            className: 'order__form'
        },
        {
            parent: container,
            cb(form) {   // обработчик этой формы orderForm
                form.addEventListener('submit', (evt) => {
                    evt.preventDefault();                           //  чтоб после отправки формы, страничка не перезагружалась
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData);     // { fio:'Alsy', address:'Test', phone:'89274435612', email:'tre@mail.ru', delivery:'delivery' }

                    data.order = getCart();                         // добавили объекту свойсов order, [ {id, color, size, count}, {}, {} ] - Корзина

                    if (data.order.length) {
                        sendOrder(data)                             // отправка данных data  на сервер, вернет промис
                            .then((dataOrder) => {                  // dataOrder -ответ сервера(промис), методом then его обрабабтываем, then нужен чтобы дождаться когда данные отправяться на сервер res.json()
                                console.log('dataOrder ', dataOrder);
                                showOrderInfo(dataOrder);           // отрисовка модалку с инфой заказа
                                // form.reset();                    // очищаем форму после отправки
                            });
                    }
                    else {

                    }

                });
            }
        }
    );

    // тк прямого взаимодейтствя(управления) элементами  формы у нас нет, поэтому вставляем  через insertAdjacentHTML
    orderForm.insertAdjacentHTML('beforeend', `
         <fieldset class="order__personal">
            <label class="order__label">
                <input class="order__input" type="text" placeholder="ФИО" name="fio" required>
            </label>

            <label class="order__label">
                <input class="order__input" type="text" placeholder="Адрес доставки" name="address">
            </label>

            <label class="order__label">
                <input class="order__input" type="text" placeholder="Телефон" name="phone" required>
            </label>

            <label class="order__label">
                <input class="order__input" type="text" placeholder="E-mail" name="email">
            </label>
        </fieldset>

        <fieldset class="order__radio-list">
            <label class="order__radio radio">
                <input class="radio__input" type="radio" name="delivery" value="delivery" required>
                <span class="radio__text">Доставка</span>
            </label>

            <label class="order__radio radio">
                <input class="radio__input" type="radio" name="delivery" value="self" required>
                <span class="radio__text">Самовывоз</span>
            </label>
        </fieldset>

        <button class="order__submit main-button" type="submit">Оформить</button>
        `
    );
};


// <!-- ФОРМА ОФОРМЛЕНИЯ ЗАКАЗА -->
/* <section class="order">
            <div class="container">
                <h2 class="order__title">Оформление заказа</h2>

                <form class="order__form">
                    <fieldset class="order__personal">
                        <label class="order__label">
                            <input class="order__input" type="text" placeholder="ФИО" name="fio">
                        </label>

                        <label class="order__label">
                            <input class="order__input" type="text" placeholder="Адрес доставки" name="address">
                        </label>

                        <label class="order__label">
                            <input class="order__input" type="text" placeholder="Телефон" name="phone">
                        </label>

                        <label class="order__label">
                            <input class="order__input" type="text" placeholder="E-mail" name="email">
                        </label>
                    </fieldset>

                    <fieldset class="order__radio-list">
                        <label class="order__radio radio">
                            <input class="radio__input" type="radio" name="delivery" value="delivery">
                            <span class="radio__text">Доставка</span>
                        </label>

                        <label class="order__radio radio">
                            <input class="radio__input" type="radio" name="delivery" value="self">
                            <span class="radio__text">Самовывоз</span>
                        </label>
                    </fieldset>

                    <button class="order__submit main-button" type="submit">Оформить</button>
                </form>
            </div>
        </section> */




// МОДАЛКА ОФРМЛЕННОГО ЗАКАЗА: 
{/* <div class="modal">
  <div class="modal__body">
    <h2 class="modal__title">Заказ оформлен №79</h2>
    <p class="modal__description modal__description_thank">Спасибо за выбор нашего магазина!</p>
    <p class="modal__description">Здесь вы можете посмотреть все детали вашего заказа.</p>

    <ul class="modal__customer-data customer">
      <li class="customer__item">
        <span class="customer__item-title">Получатель</span>
        <span class="customer__item-data">Крючков Игорь Вадимович</span>
      </li>

      <li class="customer__item">
        <span class="customer__item-title">Адрес доставки</span>
        <span class="customer__item-data">ул. Красная д. 15</span>
      </li>

      <li class="customer__item">
        <span class="customer__item-title">Телефон</span>
        <span class="customer__item-data">+79995551234</span>
      </li>

      <li class="customer__item">
        <span class="customer__item-title">E-mail</span>
        <span class="customer__item-data">mymail@gmai.com</span>
      </li>

      <li class="customer__item">
        <span class="customer__item-title">Способ получения</span>
        <span class="customer__item-data">Самовывоз</span>
      </li>
    </ul>

    <ul class="modal__goods goods-list">
      <li class="goods-list__item">
        <img class="goods-list__img" src="http://localhost:8024/img/3690223678.jpg" alt="Пушистый халат">
        <p class="goods-list__count">X1</p>
      </li>

      <li class="goods-list__item">
        <img class="goods-list__img" src="http://localhost:8024/img/8899063294.jpg" alt="Термобелье женское зимнее">
        <p class="goods-list__count">X1</p>
      </li>

      <li class="goods-list__item">
        <img class="goods-list__img" src="http://localhost:8024/img/0549740207.jpg" alt="Ажурные Носки с Блестками">
        <p class="goods-list__count">X3</p>
      </li>
      
      <li class="goods-list__item">
        <img class="goods-list__img" src="http://localhost:8024/img/1259205574.jpg" alt="Кюлоты из Хлопка">
        <p class="goods-list__count">X2</p>
      </li>
    </ul>

    <div class="modal__total">
      <p class="modal__total-title">Итого:</p>
      <p class="modal__total-price">руб <span>25170</span></p>
    </div>

    <button class="modal__close">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 8L8 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M16 16L8 8" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </button>
  </div>
</div>         */}
