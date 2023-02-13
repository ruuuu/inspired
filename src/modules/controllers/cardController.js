// отрисовка страницы товара:

import { renderNavigation } from "../render/renderNavigation";
import { renderHero } from "../render/renderHero";
import { renderProducts } from "../render/renderProducts";
import { DATA, API_URL } from "../const";
import { getData } from "../getData";
import { renderCard } from "../render/renderCard";




export const cardController = async (routerData) => {  // сатвим async, ттк в фцкнции есть обращение к серверу(await)

    console.log('routerData in cardController ', routerData);

    // if (!Object.keys(DATA.navigation).includes(gender)) {               // Object.keys(DATA.navigation) получим свойтсва объекта в виде массива ['men', 'women']
    //     return;
    // }

    const { id } = routerData.data;                                         // деструтруизация

    const data = await getData(`${API_URL}/api/goods/${id}`)               // получени  товара, ставим  await тк идет обращение к серверу
    console.log('data from cardControler ', data);                          // {}-товар



    renderNavigation(data.gender, data.category);                 // отрисвка меню
    renderHero(false);                                              //  блок Hero не отображаем
    renderCard(data);                                               // отсривока товара
    renderProducts('Вам также может понравиться ', { count: 4, gender: data.gender });


};


