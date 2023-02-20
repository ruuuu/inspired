// на станице товара/корзина, рендерим кнопкуи=/- и  число товаров:
import { createElement } from "../utils/createElement";
import { countController } from "../controllers/countController";


export const renderCount = (count, className, returnCount = () => { }) => {  // count-число товара

    const control = createElement('div',
        {
            className: `${className} count`
        }
    );


    const minus = createElement('button',
        {
            className: 'count__item count__minus',
            type: 'button',
            textContent: '-'
        },
        {
            parent: control
        }
    );


    const number = createElement('span',
        {
            className: 'count__item count__number',
            textContent: count
        },
        {
            parent: control
        }
    );


    const plus = createElement('button',
        {
            className: 'count__item count__plus',
            type: 'button',
            textContent: '+'
        },
        {
            parent: control
        }
    );


    const input = createElement('input',
        {
            type: 'hidden',
            name: 'count',
            value: count
        },
        {
            parent: control
        }
    );


    countController(minus, number, plus, input, returnCount);   // навешиваем обработчик на кнопку +/- ,  returnCount() вызывается функция

    return control;  // <div class="card__count count">...</div>


};



