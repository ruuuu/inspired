// на станице товара рендерим  число товаров:
import { createElement } from "../utils/createElement";
import { countController } from "../controllers/countController";


export const renderCount = () => {

    const control = createElement('div',
        {
            className: 'card__count count'
        }
    );

    countController(minus, number, plus, input);

};

/* <div class="card__count count">
//              <button class="count__item count__minus">-</button>
//              <span class="count__item count__number">1</span>
//              <button class="count__item count__plus">+</button>
//              <input type="hidden" name="count" value="1">
//          </div> */
