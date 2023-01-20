import { renderNavigation } from "./render/renderNavigation";
import { renderHero } from "./render/renderHero";
import { renderProducts } from "./render/renderProducts";
import { DATA } from "./const";




export const categoryPage = (routerData) => {

    const { gender, category } = routerData.data;               // выбранный пол и категория 
    const params = { gender, category };
    // console.log('params in  categoryPage', params);

    const title = DATA.navigation[gender].list.find((item) => item.slug === category).title; // метод find ищет в массиве [ {slug:, title: }, {}, {} ] первый элемент удовлетвор условию, и возарщает его. И берем у него свойство title
    // console.log('title in categoryPage ', title);

    renderNavigation(gender, title);

    renderHero(false); // если gender = false

    renderProducts(title, params);

};
