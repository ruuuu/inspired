// добавление товара в Корзину 
import { renderNavigation } from "../render/renderNavigation";
import { renderHero } from "../render/renderHero";
import { renderCard } from "../render/renderCard";
import { renderProducts } from "../render/renderProducts";
import { renderCart } from "../render/renderCart";
import { renderOrder } from "../render/renderOrder";



export const addProductCart = (product) => {
    console.log('product ', product);


};


export const cartController = () => {
    renderNavigation({ render: false });                                    // отрисвка меню, fasle - не отображать его
    renderHero({ render: false });                                          // если gender = false, не отображае блок Hero
    renderCard({ render: false });                                          // не отображает товар
    renderProducts({ render: false });                                      // список товаров из Избранное, params = { list: [{}, {}, {} ]} список избраннх товаров
    renderCart({ render: true });                                           //  рендер Корзины, тображаем
    renderOrder({ render: true });                                          // рендер Заказа, отображаем
};


