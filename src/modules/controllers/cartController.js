// добавление товара в Корзину 
import { renderNavigation } from "../render/renderNavigation";
import { renderHero } from "../render/renderHero";
import { renderCard } from "../render/renderCard";
import { renderProducts } from "../render/renderProducts";
import { renderCart } from "../render/renderCart";
import { renderOrder } from "../render/renderOrder";
import { getData } from "../getData";
import { API_URL } from "../const";


const cartGoodsStore = {

    goods: [],                              // Корзина пока пуста, будем запонялть массив в методе add ниже

    _add(product) { // _ знаичт испольузем внутри,  product добавяемый товар в Корзину
        if (!this.goods.some(item => item.id === product.id)) {     // если такго товара нет в Корзине. Метод вернет true, если хотя бы на одном элменет получим    т true
            this.goods.push(product);
        }

    },

    add(goods) {                            // добавляет товар/массив товаров  в Корзину
        if (Array.isArray(goods)) {          // если goods это массив

            goods.forEach((product) => {
                //this.goods.push(product);
                this._add(product);
            });
        }
        else {
            this._add(goods);
        }
    },

    getProduct(id) {   //  получение товара по id  из goods (Корзины)
        return this.goods.find((item) => item.id === id);               // перебирает массив и ищет элемент подходящий под условие. и возвраает первый такой элемент
    }


};



// либо такая запись:
//export const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]');            // достаем из локалсторидж по ключу cart, JSON.parse() превращает  из строки в массив: [ id, id ]


// либо с return:
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




export const cartController = async () => {
    const idList = getCart().map((item) => item.id);                        // перебираем  корзину [ {id, color, size, count}, {}, {}] и получаем массив состоящи из id товаров корзины
    // если над чтоб id были уникальные:
    //const idList = [... new Set(getCart().map((item) => item.id))];

    const data = await getData(`${API_URL}/api/goods?list=${[idList]}`);    // [ {}, {}, {} ]-товары

    cartGoodsStore.add(data.goods);                                                    // доавляем товары в Корзину


    renderNavigation({ render: false });                                    // отрисвка меню, fasle - не отображать его
    renderHero({ render: false });                                          // если gender = false, не отображае блок Hero
    renderCard({ render: false });                                          // не отображает страцу товара
    renderProducts({ render: false });                                      // список карточек товаров, params = { list: [{}, {}, {} ]} 
    renderCart({ render: true });                                           //  рендер Корзины, отображаем
    renderOrder({ render: true });                                          // рендер Заказа, отображаем
};


