import { renderNavigation } from "../render/renderNavigation";
import { renderHero } from "../render/renderHero";
import { renderProducts } from "../render/renderProducts";
import { renderFooter } from "../render/renderFooter";



export const mainPage = (gender = 'women') => {                //  по умлчанию передаем women
    console.log('gender ', gender);

    renderNavigation(gender);

    renderHero(gender);

    renderProducts(gender);

    renderFooter();
}
