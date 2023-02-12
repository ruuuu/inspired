// добавление товара в Избранное  и рендр товраов  в Избранное:

import { renderProducts } from "../render/renderProducts";
import { renderNavigation } from "../render/renderNavigation";
import { renderHero } from "../render/renderHero";
import { products } from "../const";


// Избранные товары будем хранить в localStorage
export const getFavorite = () => {
    return JSON.parse(localStorage.getItem('favorite') || '[]');            // достаем из локалсторидж по ключу favorite, parse  из сроки превращает в массив
};



// добавление товара в Избранное:
const addFavorite = (id) => {  // id товара
    const favoriteList = getFavorite();
    favoriteList.push(id);
    localStorage.setItem('favorite', JSON.stringify(favoriteList)); // в лок хранилизее данные хранятся в виде строки
};



// удаление товара по его id из Избранное:
const removeFavorite = (id) => {
    const favoriteList = getFavorite();

    // получаем  индекс удаляемого элемента:
    const index = favoriteList.findIndex((item) => {
        return item.id === id;
    });

    console.log('index удаяемого элемента ', index);

    if (index === -1) {
        return;             // дальше код не будте выполняться
    }

    favoriteList.splice(index, 1);                                          // splice удаляет  часть массива, передаем индекс начиная с котрого начнется удаление , и число удаляемых элементов. Мы удаляем один элемент с индексом index

    localStorage.setItem('favorite', JSON.stringify(favoriteList));         //  записываем  обнолвенный массив в localStorage
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

    renderProducts('Избранное', { list: getFavorite() });    // список товаров из Избранное, params = { list: [{}, {}, {} ]} список избраннх товаров
};
