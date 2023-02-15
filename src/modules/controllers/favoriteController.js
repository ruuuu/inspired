// добавление/удаление товара в/из Избранное  и рендр товраов на странице /favorite:

import { renderProducts } from "../render/renderProducts";
import { renderNavigation } from "../render/renderNavigation";
import { renderHero } from "../render/renderHero";
import { products } from "../const";
import { renderCard } from "../render/renderCard";



// Избранные товары будем хранить в localStorage
export const getFavorite = () => {
    return JSON.parse(localStorage.getItem('favorite') || '[]');            // достаем из локалсторидж по ключу favorite, parse  из строки превращает в массив: [ id, id ]
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


export const favoriteHandler = (evt) => {
    const target = evt.target;

    if (target.closest('.favorite--active')) {              // есди элемет target/его родитель  имеет класс  favorite--active
        removeFavorite(target.dataset.id);
        target.classList.remove('favorite--active');
        return;                                             // дальше код не будет выполняться
    }


    if (target.closest('.favorite')) {                      // если элемет target/его родитель  имеет класс  favorite
        addFavorite(target.dataset.id);
        target.classList.add('favorite--active');
        return;                                             // дальше код не будет выполняться
    }
};

// при нажатии на кнопку  В Избраное:
products.addEventListener('click', favoriteHandler);   //  чтобы не навешиать обработчик на каждую кнпоку Избранное у картчоки товара, навершиваем на их родиеля, это делегирование








export const favoriteController = () => {
    renderNavigation('all');                                    // отрисвка меню

    renderHero(false);                                          // если gender = false, не отображае блок Hero
    renderCard(false);                                          // не отображает товар
    renderProducts('Избранное', { list: getFavorite() });       // список товаров из Избранное, params = { list: [{}, {}, {} ]} список избраннх товаров
};
