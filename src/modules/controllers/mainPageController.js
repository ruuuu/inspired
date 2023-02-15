import { renderNavigation } from "../render/renderNavigation";
import { renderHero } from "../render/renderHero";
import { renderProducts } from "../render/renderProducts";
import { renderFooter } from "../render/renderFooter";
import { renderCard } from "../render/renderCard";


export const mainPageController = (gender = 'men') => {               // по умолчанию передаем men

    renderNavigation(gender);

    renderHero(gender);

    renderProducts('НОВИНКИ', { gender: gender });
    renderCard(false);                                  // не отображает товар
    renderFooter();
}
