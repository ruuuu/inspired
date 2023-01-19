// отрисовка поля поиска в header:
import { createElement } from "../createElement";
import { seachController } from "../controllers/seachController";



export const search = createElement('div', {
    className: 'search'
});


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

const form = createElement('form',
    {
        className: 'search__form'
    },
    {
        parent: container,
        cb: seachController
    }
);

createElement('input',
    {
        className: 'search__input',
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
        type: 'submit',
        textContent: 'Найти'

    },
    {
        parent: form
    }
);
