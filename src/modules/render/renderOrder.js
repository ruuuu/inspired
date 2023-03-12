// отрисовка формы "Оформить Заказ"
import { order } from "../const";
import { createElement } from "../utils/createElement";
import { getCart } from "../controllers/cartController";
import { sendOrder } from "../controllers/orderController";


//  верстка мод окна:
const showOrderInfo = (data) => {  // data - обработанный ответ от сервера в виде res.json(): { id: 34242, createdAt: '12.03.2023', fio:"Alsu", address:"Test", phone:"892744351223", email:"tre@mail.ru", delivery:"self", order:[{id,color, size, count}, {}, {}] }
    // console.log('data from server in res.json() ', data);
    const modal = createElement('div',                      // подложка под тело модалки
        {
            className: 'modal'
        },
        {
            parent: document.body,
            cb(el) {                        // el- созданный modal(подложка),  при нажатии на el, вызовится эта коллбэк-фукняи(модалка закрывается)
                el.addEventListener('click', (evt) => {
                    if (evt.target === el) {    //  если нажатый элемент(evt.target) равен modal
                        el.remove();            // удаление элемента el
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

          
          ${data.address && // если data.address заполнили, то рисуем верстку поля Адрес 
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
    
         
          ${data.email && //  если data.email заполнили, то рисуем верстку поля Еmail
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
        }[data.delivery]
        }
            </span>
          </li>
        </ul>
    `
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
                    evt.preventDefault(); //  чтоб после отправки формы, страничка не перезагружалась
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData);    // { fio: 'Alsy', address: 'Test', phone: '89274435612', email: 'tre@mail.ru', delivery: 'delivery' }

                    data.order = getCart();  // добавили объекту свойсов order, [ {id, color, size, count}, {}, {} ] - Корзина

                    if (data.order.length) {
                        sendOrder(data)                             // отправка данных data  на сервер
                            .then((dataOrder) => {                  // dataOrder -ответ сервера(промис), методом then его обрабабтываем, then нужен чтобы дождаться когда данные отправяться на сервер res.json()
                                console.log('dataOrder ', dataOrder);
                                showOrderInfo(dataOrder);           // отобраажем модалку с инфой заказа
                                // form.reset();                    //   очищаем форму после отправки
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


/* <section class="order"><!-- ФОРМА ОФОРМЛЕНИЯ ЗАКАЗА -->
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
