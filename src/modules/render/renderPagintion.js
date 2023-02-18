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
            parent: wrapperPagination               // <div class = goods__pagination pagination></div>
        }
    );


    // 1 2 3 4 5 (count=5),  page = 2(номер текущей страницы), pages=8 
    const isNotStart = (page - Math.floor(count / 2)) > 1;        //   если мы  не вначале страницы.  Math.floor округляет


    // 5 6 7 8
    const isEnd = (page + Math.floor(count / 2)) >= pages;         // если в конце списка страниц


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
                        href: getUrl({ page: n }),                  // страница /#/:gender/:category?page=n 
                        className: `pagination__link ${page === n ? 'pagination__link--active' : ''}`
                    })
            });
    } // for


    console.log('pages in renderPagination ', pages);
    console.log('count in renderPagination ', count);

    if (pages >= count) {
        // стрелка влево:
        createElement('a',
            {
                className: `pagination__arrow pagination__arrow--start ${!isNotStart ? 'pagination__arrow--disabled' : ''}`,
                href: getUrl({ page: 1 }),                          // router.getCurrentLocation().url выдает урл текущ станицы
                tabIndex: `${!isNotStart ? '-1' : ''}`,             // чтобы при переклбчнеии табами не могли нажать на задизебленную стрелку
                innerHTML: `<svg width = "5" height = "8" viewBox = "0 0 5 8" fill = "none" xmlns = "http://www.w3.org/2000/svg" >
                        <path d="M5 7.06L1.90958 4L5 0.94L4.04858 0L-1.19209e-07 4L4.04858 8L5 7.06Z" fill="currentColor" />
                    </svg>`,                                                        // innerIHML(``)
                ariaLabel: 'В начало'                                         // атрибут aria-label
            },
            {
                cb(linkArrow) {
                    wrapperPagination.prepend(linkArrow);  // добавляем linkArrow в начало  
                }
            }
        );


        // стрелка вправо:
        createElement('a',
            {
                className: `pagination__arrow pagination__arrow--end ${isEnd ? 'pagination__arrow--disabled' : ''} `,
                href: getUrl({ page: pages }),
                tabIndex: `${isEnd ? '-1' : ''}`,
                innerHTML: `<svg width = "5" height = "8" viewBox = "0 0 5 8" fill = "none" xmlns = "http://www.w3.org/2000/svg" >
                        <path d="M0 7.06L3.09042 4L0 0.94L0.951417 0L5 4L0.951417 8L0 7.06Z" fill="currentColor" />
                    </svg>`,                                                    // innerIHML(``)
                ariaLabel: 'В конец'                                        // атрибут aria-label
            },
            {
                parent: wrapperPagination
            }
        );

    }



};
