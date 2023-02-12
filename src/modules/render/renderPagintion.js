// отрисовка пагинации:

import { createElement } from "../utils/createElement";
import { router } from "../utils/router";
import { getUrl } from "../utils/getUrl";


//                                                  pages - общее кол-во стрнаиц  count- число отображаемых товаров
export const renderPagination = (wrapperPagination, page, pages, count) => {              //    data = { goods: [{},{},{}],  pages: ,  page: ,  totalCount: }



    wrapperPagination.innerHTML = '';             // тк пагинация при перезагрузке страницы обноаляется

    const paginationList = createElement('ul',
        {
            className: 'pagination__list'
        },
        {
            parent: wrapperPagination
        }
    );


    // 1 2 3 4 5 (count=5),  page = 2(номер текущей страницы), pages=8 
    const isNotStart = (page - Math.floor(count / 2)) > 1;        //   если мы  не вначале страницы.  Math.floor округляет


    // 5 6 7 8
    const isEnd = (page + Math.floor(count / 2)) > pages;         // если в конце списка страниц


    if (count > pages) {
        count = pages;
    }

    for (let i = 0; i < count; i++) {
        let n = i + 1;              // номер страницы

        if (isNotStart) {
            if (isEnd) {            // если в конце находимся
                n = pages - count + i + 1;
            }
            else {
                n = page - Math.floor(count / 2) + i;
            }
        }


        createElement('li',
            {
                className: 'pagination__item'
            },
            {
                parent: paginationList,                             // router.getCurrentLocation().url выдает урл текущ станицы
                append: createElement('a',
                    {
                        textContent: n,
                        href: getUrl({ page: n }),                  // страница /#/women/pajams?page=n 
                        className: `pagination__link ${page === n ? 'pagination__link--active' : ''}`
                    })
            }
        );
    } // for



    if (pages > count) {
        // стрелка влево:
        createElement('a',
            {
                className: `pagination__arrow pagination__arrow--start ${!isNotStart ? 'pagination__arrow--disabled' : ''}`,
                href: getUrl({ page: 1 }),         // router.getCurrentLocation().url выдает урл текущ станицы
                textContent: 'start',
                ariaLabel: 'В начало'                                         // атрибут aria-label
            },
            {
                parent: wrapperPagination
            }
        );


        // стрелка вправо:
        createElement('a',
            {
                className: `pagination__arrow pagination__arrow--end ${isEnd ? 'pagination__arrow--disabled' : ''}`,
                href: getUrl({ page: pages }),
                textContent: 'end',
                ariaLabel: 'В конец'                                        // атрибут aria-label
            },
            {
                parent: wrapperPagination
            }
        );

    }




};
