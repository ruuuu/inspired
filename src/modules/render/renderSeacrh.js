// отрисовка формы  поиска в header:
import { createElement } from "../utils/createElement";
import { seachController } from "../controllers/seachController";



export const search = createElement('div', { className: 'search' });


export const searchToggle = () => {             //  отображаем и скрываем поле поиска
    search.classList.toggle('search--show');
};


const container = createElement('div',
    {
        className: 'container'
    },
    {
        parent: search
    }
);


// форма поиска:
export const form = createElement('form',
    {
        className: 'search__form'
    },
    {
        parent: container,
        cb: seachController  // вешаем обработчик события на форму поиска, при нажатии на Найти, вызовется seachController(form)
    }
);


createElement('input',
    {
        className: 'search__input', // <input type="search" name="search" placeholder="Найти"> - поле поиска
        type: 'search',
        name: 'search',
        placeholder: 'Найти'
    },
    {
        parent: form
    }
);


createElement('button',
    {
        className: 'search__btn',
        type: 'submit',             // <button type="submit">
        textContent: 'Найти'
    },
    {
        parent: form
    }
);
