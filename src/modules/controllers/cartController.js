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


// товары Корзины храним в localStorage
// добавление товара в Корзину:
export const addProductCart = (product, equal) => {                                // {id, color, count, size}-товар добавляемы в коризну
    console.log('product from addProductCart ', product);
    let isCart = false;                                                     // товар в коризне или нет

    const productList = getCart().map(item => {                             // перебираем корзину [{},{},{}]. map перебирает массив и возвраращет новый
        if (item.id === product.id && item.color === product.color && item.size === product.size) {
            if (equal) {
                item.count = product.count;
            }
            else {
                item.count = +item.count + +product.count;   // + приводит число к строке
            }

            isCart = true;
        }
        return item;
    }); // map

    console.log('productList ', productList);

    if (!isCart) {                       //  если товар не в Корзине
        productList.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(productList));              // в localStorage хрнаним в виде строки, поэтому переводим  из массива в строку
};



// удаление товара productCart = {} из Корзины [{}, {}, {}]
export const removeCart = (productCart) => {
    // в favoriteController делалали через indexOf и splice(), а  здесь сделаем через filter():
    const productList = getCart().filter((cartItem) => {                         // filter() перебирает массив(корзину) и возвращает новый массив, элементами котрого будут элементы удовлеворяющие условию
        if (cartItem.id !== productCart.id && cartItem.color !== productCart.color && cartItem.size !== productCart.size) {
            return cartItem;
        }
    });

    console.log('productList ', productList);
    localStorage.setItem('cart', JSON.stringify(productList));  // заносим обнолвенный массв 

    return true;
};




export const cartController = () => {
    renderNavigation({ render: false });                                    // отрисвка меню, fasle - не отображать его
    renderHero({ render: false });                                          // если gender = false, не отображае блок Hero
    renderCard({ render: false });                                          // не отображает товар
    renderProducts({ render: false });                                      // список товаров из Избранное, params = { list: [{}, {}, {} ]} список избраннх товаров
    renderCart({ render: true });                                           //  рендер Корзины, тображаем
    renderOrder({ render: true });                                          // рендер Заказа, отображаем
};


