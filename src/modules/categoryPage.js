// вывод карточек товаров по категориям(фильтр по категриям):
import { renderNavigation } from "./render/renderNavigation";
import { renderHero } from "./render/renderHero";
import { renderProducts } from "./render/renderProducts";
import { DATA } from "./const";




export const categoryPage = (routerData) => {

    const { gender, category } = routerData.data;               // деструтруизация, выбранный пол и категория 
    const params = { gender, category };
    // console.log('params in  categoryPage', params);

    if (routerData.params?.page) {                              // если у routerData.params есть свойство page(условное обращение к свойству)
        params.page = routerData.params?.page;
    }

    const title = DATA.navigation[gender].list.find((item) => item.slug === category).title;            // метод find ищет в массиве [ {slug:, title: }, {}, {} ] первый элемент удовлетвор условию, и возарщает его. И берем у него свойство title


    renderNavigation(gender, category);               // отрисвка меню

    renderHero(false);                      // если gender = false

    renderProducts(title, params);

};
