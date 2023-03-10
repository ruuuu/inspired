// отрисовка меню в шапке:
import { createElement } from "../utils/createElement";
import { dataNavigation } from "../dataNavigation";       // импортируем объект dataNavigation
import { DATA, navigation } from "../const";

let flag = false;                               // управляет перерисовкой меню
let oldGender = 'women';                        // нач значение
let oldCategory = '';


export const renderNavigation = ({ gender, category, render, rerender }) => {               // gender='men'/'women'


    if (!render) {                          // если нет render
        navigation.style.display = 'none';
        return;
    }
    else {
        navigation.style.display = '';           // значение по умолчаию(меню  отображаеся)
    }

    if (flag && oldGender === gender && oldCategory === category) {
        return;                                 // дальше прогамма не выполнится
    }


    if (rerender) {
        gender = oldGender;
    }



    oldGender = gender;  // при переключении gender происходит перерисовка  navigation
    oldCategory = category;
    flag = true;

    navigation.textContent = '';     // очищем сперва, потом заполняем

    // navigation__container
    const container = createElement('div',
        {
            className: 'navigation__container'
        },
        {
            parent: navigation  // в  navigation складываем container
        }
    );


    // ul Мужчина/Женщина
    const genderList = createElement('ul',
        {
            className: 'navigation__gender gender'
        },
        {
            parent: container
        }
    );




    for (const genderName in DATA.navigation) {      // genderName = women/men, DATA.navigation = { women: {title: , list: },  men: {title: , list: }   }
        //console.log('DATA.navigation in for ', DATA.navigation);
        createElement('a',
            {
                className: `gender__link ${gender === genderName ? 'gender__link--active' : ''}`,
                href: `#/${genderName}`,
                textContent: DATA.navigation[genderName].title
            },
            {
                parent: createElement('li', { className: 'gender__item' }, { parent: genderList })
            }
        );
    };




    const categoryElems = DATA.navigation[gender].list.map((item) => {       //   dataNavigation[gender].list = [ { title: , slug: }, {}, {} ],    map перебирает массив и возвращает новый массив categoryElems
        //console.log('item ', item);
        const li = createElement('li',
            {
                className: 'category__item',
            },
            {
                append: createElement('a',
                    {
                        className: `category__link ${category === item.slug ? 'category__link--active' : ''}`,
                        textContent: item.title,
                        href: `#/${gender}/${item.slug}`
                    },
                    {
                        cb(elem) {  // коллбэк, при нажатии на элемент меню, вызовется эта фукнция 
                            elem.addEventListener('click', () => {
                                document.querySelector('.category__link--active')?.classList.remove('category__link--active');
                                elem.classList.add('category__link--active');
                            });
                        }
                    })
            }
        );

        return li; // взаращает элемент и кладет его в массив categoryElems
    });



    //ul
    createElement('ul',
        {
            className: 'navigation__category category'
        },
        {
            parent: container,
            appends: categoryElems     // [li.a, li.a, li.a ]
        }
    );






    // navigation.innerHTML = `
    //    <div class="container navigation__container">
    //          <ul class="navigation__gender gender">
    //                <li class="gender__item">
    //                      <a class="gender__link gender__link--active" href="#">Женщины</a>
    //                </li>

    //                <li class="gender__item">
    //                      <a class="gender__link" href="#">Мужчины</a>
    //                </li>
    //          </ul>

    //          <ul class="navigation__category category">
    //                <li class="category__item">
    //                      <a class="category__link category__link--active" href="#">Бюстгальтеры</a>
    //                </li>
    //                <li class="category__item">
    //                      <a class="category__link" href="#">Трусы</a>
    //                </li>
    //                <li class="category__item">
    //                      <a class="category__link" href="#">Носки</a>
    //                </li>
    //                <li class="category__item">
    //                      <a class="category__link" href="#">Халаты</a>
    //                </li>
    //                <li class="category__item">
    //                      <a class="category__link" href="#">Термобелье</a>
    //                </li>
    //                <li class="category__item">
    //                      <a class="category__link" href="#">Пижамы</a>
    //                </li>
    //          </ul>

    //    <!-- если нажали на Мужчины: -->
    //    <!-- <ul class="navigation__category category">
    //      <li class="category__item">
    //        <a class="category__link" href="#">Трусы</a>
    //      </li>
    //      <li class="category__item">
    //        <a class="category__link" href="#">Носки</a>
    //      </li>
    //      <li class="category__item">
    //        <a class="category__link" href="#">Халаты</a>
    //      </li>
    //      <li class="category__item">
    //        <a class="category__link" href="#">Термобелье</a>
    //      </li>
    //    </ul> -->
    //  </div>
    //    `;
}
