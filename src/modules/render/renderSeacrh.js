// отрисовка поля поиска в header:
import { createElement } from "../createElement";



export const search = createElement('div', {
    className: 'search'
});


export const searchToggle = () => {             //  отображаем и скрываем поле поиска
    search.classList.toggle('search--show');
};

