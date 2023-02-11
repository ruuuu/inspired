// отрисовка пагинации:
import { createElement } from "../createElement";
import { router } from "../router";

//                                                  pages - общее кол-во стрнаиц  count- число отображаемых страниц(квадратиков)
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
    console.log('isNotStart ', isNotStart);

    // 5 6 7 8
    const isEnd = (page + Math.floor(count / 2)) > pages;         // если в конце списка страниц
    console.log('isEnd ', isEnd);

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
                        href: `${router.getCurrentLocation().url}?page=${n}`,
                        className: `pagination__link ${page === n ? 'pagination__link--active' : ''}`
                    })
            }
        );
    }



    if (pages > count) {
        // стрелка влево:
        createElement('a',
            {
                className: `pagination__arrow pagination__arrow--start ${!isNotStart ? 'pagination__arrow--disabled' : ''}`,
                href: `${router.getCurrentLocation().url}?page=${1}`,         // router.getCurrentLocation().url выдает урл текущ станицы
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
                href: `${router.getCurrentLocation().url}?page=${pages}`,
                textContent: 'end',
                ariaLabel: 'В конец'                                        // атрибут aria-label
            },
            {
                parent: wrapperPagination
            }
        );

    }




};
