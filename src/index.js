import './index.html';
import './index.scss';
import { router } from './modules/utils/router';
import { renderHeader } from './modules/render/renderHeader';
import { renderFooter } from './modules/render/renderFooter';
import { mainPageController } from './modules/controllers/mainPageController';
import { getData } from './modules/getData';
import { API_URL, DATA } from './modules/const';
import { createCssColors } from './modules/createCssColors';
import { createElement } from './modules/utils/createElement';
import { categoryPageController } from './modules/controllers/categoryPageController';
import { searchPageController } from './modules/controllers/seachController';
import { favoriteController } from './modules/controllers/favoriteController';
import { cardController } from './modules/controllers/cardController';
import { cartController } from './modules/controllers/cartController';



const init = async () => {

    try {
        DATA.navigation = await getData(`${API_URL}/api/categories`);            // добавили объекту  свойство navigation
        DATA.colors = await getData(`${API_URL}/api/colors`);                    // добавили объекту  свойство  colors,  полчаем массив цветов [ {id,title,code}, {id,title,code}, {}, {} ]
        //console.log('DATA.navigation ', DATA.navigation);                      // DATA.navigation = { women: {title: , list: },    men: {title: , list: } }
        console.log('DATA.colors ', DATA.colors);                                // [ {id: 1, title: 'black', code: '#000000'},  { id: 2, title: 'white', code: '#ffffff' },  {id: 3, title: 'red', code: '#dd0808'} ]


        createCssColors(DATA.colors);

        // роутинг: 
        router.on('*', () => {   // навешиваем событие: если находимся на любой стрнаице, вызовется переданная  функция 
            renderHeader();
            renderFooter();
        });



        router.on('/', () => {          // если находимся на главной станице , то вызовется переданная фукнция
            mainPageController();
        });



        router.on('women', () => {          // если находимся на  станице http://localhost:3000/#/women (если стоит #, то не будет перезагрукзки станицы)
            mainPageController('women');
        });



        router.on('men', () => {             // если находимся на  станице http://localhost:3000/#/men
            mainPageController('men');
        });


        // фильтрация по категориям:
        router.on('/:gender/:category', categoryPageController);              // у gender и category ставим двоеточие, чобы получать их значения.  Когда  находимся на станице /:gender/:category, то вызывается categoryPage. Скобки у фукнции не ставим, иначе вызовется сразу, а не когда наступит событие


        // переход на страницу товара:
        router.on('/product/:id', cardController);                             // у id  стаивм двоеточие, чтобы вставлять его значение


        //при нажатии на иконку корзины в левом верхнем меню:
        router.on('cart', cartController);   // когда наъодимся на станице cart вызоветс фукнция cartController

        // поиск:
        router.on('search', searchPageController);   // когда наъодимся на станице search, вызоветс фукнция searchPageController(routerData)


        // страница Избранное:
        router.on('favorite', favoriteController);   // когда наъодимся на станице favorite, вызоветс фукнция favoriteController()



        // setTimeout(() => {
        //       router.navigate('men');        // переходим на страницу http://localhost:3000/#/men через 3000ms(3с). Переданная фукнция выполнится через 3с
        // }, 3000);


        // setTimeout(() => {
        //       router.navigate('women');       // переходим на страницу http://localhost:3000/#/women  через 6 с
        // }, 6000);

    }
    catch (e) {
        createElement('h2', { textContent: 'Что-то пошло не так' },
            {
                parent: document.querySelector('main'),
                cb(h2) {
                    h2.style.textAlign = 'center';              // присвоили свойство text-align
                }
            });

        console.log(e);
    }
    finally {
        router.resolve();                         //  активируем роутинг
    }

}




init();             //  НАЧАЛО отсюда



// роутинг - переход по страницам без перезагрузки страницы  и  без лишней подгрузки html и css. Для роутинга используем библиотеку navigo https://www.npmjs.com/package/navigo
// в  package.json в dependencies записаны библииотеки для проекта,  а в devDependecies используются биииотеки только для разработки















// import code from './img/code.png'
// import { mult, sum } from './modules/calc';

// const imgWrap = document.querySelector('.img');
// const img = new Image();
// img.src = code;
// img.width = 700;
// imgWrap.append(img);

// console.log(mult(3, 4));
// console.log(sum(3, 4));
