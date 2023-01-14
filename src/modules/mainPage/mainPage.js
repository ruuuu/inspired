import { renderNavigation } from "../render/renderNavigation"
import { renderHero } from "../render/renderHero"
import { renderProducts } from "../render/renderProducts"



export const mainPage = (gender) => {
      console.log('gender ', gender);

      renderNavigation();

      renderHero();

      renderProducts();
}