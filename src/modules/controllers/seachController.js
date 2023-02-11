// поиск: отправка данных формы поиcка:

import { router } from "../utils/router";
import { renderNavigation } from "../render/renderNavigation";
import { renderHero } from "../render/renderHero";
import { renderProducts } from "../render/renderProducts";



export const seachController = (form) => {

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();               // чтобы после отправки данных формы, страница не перезагружалась
        // console.log(form.search);        // обращение к полю поиска происходит через <input name="search"> атрибут name: form.name , получим <input type="search" name="search">
        // form.search.value                 // значанеи которое ввели в поле поиска

        router.navigate(`search?value=${form.search.value}`);           // router.navigate переводит на станицу с урлом  http://localhost:3000/#/search?value='носки'
    });

};



export const searchPageController = (routerData) => {
    console.log('routerData ', routerData);

    const params = {    // query параметры
        search: routerData.params.value
    };

    renderNavigation('all');               // отрисвка меню

    renderHero(false);                                  // если gender = false

    renderProducts(routerData.params.value, params);
};
