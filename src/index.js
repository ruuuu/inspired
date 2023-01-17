import './index.html';
import './index.scss';
import { router } from './modules/router';
import { renderHeader } from './modules/render/renderHeader';
import { renderFooter } from './modules/render/renderFooter';
import { mainPage } from './modules/mainPage/mainPage';
import { womenMainPage } from './modules/mainPage/womenMainPage';
import { menMainPage } from './modules/mainPage/menMainPage';
import { getData } from './modules/getData';
import { API_URL, DATA } from './modules/const';



const init = async () => {
    // DATA.navigation = await getData(`${API_URL}/api/categories`);
    // console.log('DATA.navigation in init', DATA.navigation);

    router.on('*', () => {   // навешиваем событие: если находимся на любой стрнаице, вызовется переданная  функция 
        renderHeader();
        renderFooter();
    });


    router.on('/', () => {   // если находимся на главной станице 
        mainPage();
    });


    router.on('women', () => {          // если находимся на  станице http://localhost:3000/#/women (если стоит #, то не будет перезагрукзки станицы)
        womenMainPage();
    });


    router.on('men', () => {             // если находимся на  станице http://localhost:3000/#/men
        menMainPage();
    });


    // setTimeout(() => {
    //       router.navigate('men');        // переходим на страницу http://localhost:3000/#/men через 3000ms(3с). Переданная фукнция выполнится через 3с
    // }, 3000);


    // setTimeout(() => {
    //       router.navigate('women');       // переходим на страницу http://localhost:3000/#/women  через 6 с
    // }, 6000);


    router.resolve();                         //  активируем роутинг


}


init();             //  начало



// роутинг - переход по страницам без перезагрузки страницы  и  без лишней подгрузки html css. Для роутинга используем библиотеку navigo https://www.npmjs.com/package/navigo
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
