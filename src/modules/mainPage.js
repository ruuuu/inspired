import { renderNavigation } from "./render/renderNavigation";
import { renderHero } from "./render/renderHero";
import { renderProducts } from "./render/renderProducts";
import { renderFooter } from "./render/renderFooter";



export const mainPage = (gender = 'men') => {               // по умолчанию передаем men

    renderNavigation(gender);

    renderHero(gender);

    renderProducts('НОВИНКИ', { gender: gender });

    renderFooter();
}
