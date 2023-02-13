// вывод карточек товаров по категориям(фильтр по категриям):

import { renderNavigation } from "../render/renderNavigation";
import { renderHero } from "../render/renderHero";
import { renderProducts } from "../render/renderProducts";
import { DATA } from "../const";




export const categoryPageController = (routerData) => {
    console.log('routerData in categoryPageController ', routerData);

    if (!Object.keys(DATA.navigation).includes(gender)) {    // Object.keys(DATA.navigation) получим свойтсва объекта в виде массива ['men', 'women']
        return;
    }

    const { gender, category } = routerData.data;                           // деструтруизация, выбранный gender и category
    const params = { gender, category, count: 6 };                        // count - число отображаеаемых товаров на трсаницу
    // console.log('params in  categoryPage', params);

    if (routerData.params?.page) {                              // если у routerData.params есть свойство page(условное обращение к свойству)
        params.page = routerData.params?.page;                  // обновляем свойосв page
    }

    const title = DATA.navigation[gender].list.find((item) => item.slug === category).title;            // метод find ищет в массиве [ {slug:, title: }, {}, {} ] первый элемент удовлетвор условию, и возарщает его. И берем у него свойство title


    renderNavigation(gender, category);                 // отрисвка меню

    renderHero(false);                                  // нео тображает блок Hero

    renderProducts(title, params);

};
