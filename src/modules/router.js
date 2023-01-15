import Navigo from "navigo";              // загрузили бибилиотеку, для роутинга

export const router = new Navigo('/', { hash: true });            // чтобы на каждую сслку/кнопку не вешать дата атрибут data-navigo сделаем hash: true(включить поддержку хэша-симовл решетки). Пример  при нажатии в меню на Мужчины, перейдем на станицу http://localhost:3000/#man , а при нажатии на Женщина перейдем на  http://localhost:3000/#woman
