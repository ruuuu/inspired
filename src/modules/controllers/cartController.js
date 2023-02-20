// добавление товара в Корзину 
import { renderNavigation } from "../render/renderNavigation";
import { renderHero } from "../render/renderHero";
import { renderCard } from "../render/renderCard";
import { renderProducts } from "../render/renderProducts";
import { renderCart } from "../render/renderCart";
import { renderOrder } from "../render/renderOrder";



export const getCart = () => {
    return JSON.parse(localStorage.getItem('cart') || '[]');            // достаем из локалсторидж по ключу cart, JSON.parse() превращает  из строки в массив: [ id, id ]
};


// товары корзины храним в localStorage
export const addProductCart = (product) => {                                // {id, color, count, size}-товар добавляемы в коризну
    console.log('product from addProductCart ', product);
    let isCart = false;                                                     // товар в коризне или нет

    const productList = getCart().map(item => {                             // перебираем корзину [{},{},{}]. map перебирает массив и возвраращет новый
        if (item.id === product.id && item.color === product.color && item.size === product.size) {
            item.count = +item.count + +product.count;   // + приводит числов к строке
            isCart = true;
        }
        return item;
    });

    console.log('productList ', productList);

    if (!isCart) {                       //  если товар не в корзине
        productList.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(productList));              // в localStorage хрнаним в виде строки, поэтому переводим  из массива в строку

};


export const cartController = () => {
    renderNavigation({ render: false });                                    // отрисвка меню, fasle - не отображать его
    renderHero({ render: false });                                          // если gender = false, не отображае блок Hero
    renderCard({ render: false });                                          // не отображает товар
    renderProducts({ render: false });                                      // список товаров из Избранное, params = { list: [{}, {}, {} ]} список избраннх товаров
    renderCart({ render: true });                                           //  рендер Корзины, тображаем
    renderOrder({ render: true });                                          // рендер Заказа, отображаем
};


