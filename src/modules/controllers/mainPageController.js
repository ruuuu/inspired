import { renderNavigation } from "../render/renderNavigation";
import { renderHero } from "../render/renderHero";
import { renderProducts } from "../render/renderProducts";
import { renderFooter } from "../render/renderFooter";
import { renderCard } from "../render/renderCard";
import { renderCart } from "../render/renderCart";
import { renderOrder } from "../render/renderOrder";



export const mainPageController = (gender = 'men') => {               // по умолчанию передаем men

    renderNavigation({ gender: gender, render: true });

    renderHero({ gender: gender, render: true });

    renderProducts({ title: 'НОВИНКИ', params: { gender: gender }, render: true });
    renderCard({ render: false });                                  // не отображает товар
    renderFooter();
    renderCart({ render: false });           // не отображаем  корзину
    renderOrder({ render: false });          //  не отображае форму заказа
}
