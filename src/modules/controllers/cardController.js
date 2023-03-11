// отрисовка страницы товара:

import { renderNavigation } from "../render/renderNavigation";
import { renderHero } from "../render/renderHero";
import { renderProducts } from "../render/renderProducts";
import { DATA, API_URL } from "../const";
import { getData } from "../getData";
import { renderCard } from "../render/renderCard";
import { renderCart } from "../render/renderCart";
import { renderOrder } from "../render/renderOrder";



export const cardController = async (routerData) => {  // сатвим async, ттк в фцкнции есть обращение к серверу(await)

    console.log('routerData in cardController ', routerData);

    // if (!Object.keys(DATA.navigation).includes(gender)) {               // Object.keys(DATA.navigation) получим свойтсва объекта в виде массива ['men', 'women']
    //     return;
    // }

    const { id } = routerData.data;                                         // деструтруизация

    const data = await getData(`${API_URL}/api/goods/${id}`)               // получени  товара, ставим  await тк идет обращение к серверу
    const { gender, category } = data;                                      // дестуртуризация
    console.log('data from cardControler ', data);                          // {}-товар
    console.log('{ gender, category } from cardControler ', { gender, category });


    renderNavigation({ gender, category, render: true });                 // отрисвка меню
    renderHero({ render: false });                                              //  блок Hero не отображаем
    renderCard({ data, render: true });                                               // отсривока товара
    renderProducts({ title: 'Вам также может понравиться ', params: { count: 4, gender }, render: true });
    renderCart({ render: false });           // не отображаем  корзину
    renderOrder({ render: false });          //  не отображае форму заказа
};


