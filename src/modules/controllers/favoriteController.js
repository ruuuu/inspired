// добавление товара в Избранное  и рендр товраов  в Избранное:

import { renderProducts } from "../render/renderProducts";
import { renderNavigation } from "../render/renderNavigation";
import { renderHero } from "../render/renderHero";
import { products } from "../const";


// избрранеы товары бдум хранить в localStorage
export const getFavorite = () => {
    return JSON.parse(localStorage.getItem('favorite') || '[]');            // достаем из локалсторидж по ключу favorite, parse  из сроки превращает в массив
};



// добавление товара в Избранное:
const addFavorite = (id) => {  // id товара
    const favoriteList = getFavorite();
    favoriteList.push(id);
    localStorage.setItem('favorite', JSON.stringify(favoriteList)); // в лок хранилизее данные хранятся в виде строки
};



// удаление товара из Избранное:
const removeFavorite = (id) => {
    const favoriteList = getFavorite();

    // const newFavoriteList = favoriteList.map((item) => {  // перебирвет массив favoriteList и получаем новый массив , элементв корого  подходят под условие
    //     return item.id !== id
    // });

    // console.log('newFavoriteList ', newFavoriteList);


    localStorage.setItem('favorite', JSON.stringify(newFavoriteList));
};



products.addEventListener('click', (evt) => {               //  чтобы не навешиать обработчик на каждую иноку Избранное, навершиваем на их  родиеля, это делегирование
    const target = evt.target;

    if (target.closest('.favorite--active')) {              // есди элемет target/его родитель  имеет класс  favorite--active
        removeFavorite(target.dataset.id);
        target.classList.remove('favorite--active');
        return;                                             // дальше код не будет выполняться
    }

});




products.addEventListener('click', (evt) => {               //  чтобы не навешиать обработчик на каждую иноку Избранное, навершиваем на их  родиеля, это делегирование
    const target = evt.target;

    if (target.closest('.favorite')) {              // есди элемет target/его родитель  имеет класс  favorite
        addFavorite(target.dataset.id);
        target.classList.add('favorite--active');
        return;                                             // дальше код не будет выполняться
    }

});




export const favoriteController = () => {
    renderNavigation('all');               // отрисвка меню

    renderHero(false);                                  // если gender = false

    renderProducts('Избранное', { list: getFavorite() });    // список товаров из Избранное
};
